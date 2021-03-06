﻿using AutoMapper;
using DentistAppointment.Data.Models;
using DentistAppointment.Models.CommentsViewModel;
using DentistAppointment.Models.DentistViewModels;
using DentistAppointment.Models.PatientViewModel;
using DentistAppointment.Models.PatientViewModels;
using DentistAppointment.Services;
using DentistAppointment.Services.Abstraction;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DentistAppointment.Controllers
{
    public class DentistController : Controller
    {
        private readonly IHttpContextAccessor httpaccessor;
        private readonly IUsersService usersService;
        private readonly IDentistsService dentistsService;
        private readonly IReservationsService reservationsService;
        private readonly IReviewsService reviewsService;
        private readonly IEventsService eventsService;
        private readonly UserManager<User> userManager;
        private readonly IMapper mapper;

        public DentistController(
            IUsersService usersService,
            IDentistsService dentistsService,
            IReservationsService reservationsService,
            IReviewsService reviewsService,
            IEventsService eventsService,
            IHttpContextAccessor httpContextAccessor,
            IMapper mapper,
            UserManager<User> userManager)
        {
            this.usersService = usersService;
            this.dentistsService = dentistsService;
            this.httpaccessor = httpContextAccessor;
            this.reservationsService = reservationsService;
            this.reviewsService = reviewsService;
            this.eventsService = eventsService;
            this.mapper = mapper;
            this.userManager = userManager;
        }

        public IActionResult index()
        {
            return View();
        }

        private string GetCurrentUserId() => this.userManager.GetUserId(HttpContext.User);

        private int GetCurrentDentistId()
        {
            return usersService.GetUserById(GetCurrentUserId()).DentistId.Value;
        }

        public IActionResult dentistHomePage()
        {

            string userId = GetCurrentUserId();
            var dentist = this.dentistsService
                .GetAllDentists().FirstOrDefault(user => user.User.Id == userId);
            var reviews = reviewsService.GetAllByDentist(dentist.Id).ToList();
            float rating = 0;

            foreach (Review r in reviews)
            {
                rating += r.Rating / reviews.Count;
            }

            var workDays = this.reservationsService.GetDentistWorkDays(dentist);


            var viewModel = new DentistHomePageViewModel()
            {
                User = this.usersService.GetAllUsers().FirstOrDefault(x => x.Dentist == dentist),
                Address = dentist.Address,
                Type = dentist.Type,
                Rating = rating,
                Reviews = reviews,
                WorkDays = workDays
            };

            Console.WriteLine(reviews);

            return View(viewModel);
        }

        [HttpGet]
        public IActionResult dentistEditInfo(string returnUrl = null)
        {
            var user = this.usersService.GetAllUsers().FirstOrDefault(x => x.Id == GetCurrentUserId());
            var viewModel = new DentistEditInfoViewModel()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                EGN = user.EGN.ToString(),
                Email = user.Email,
                Gender = user.Gender,
                SelectedWorkDays = new[] { 2, 4 }
        };

            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult dentistEditInfo(DentistEditInfoViewModel model)
        {
            var user = this.usersService.GetAllUsers().FirstOrDefault(x => x.Id == GetCurrentUserId());
            var dentist = this.dentistsService
               .GetAllDentists().FirstOrDefault(u => u.User.Id == user.Id);

            var selectedWorkDaysSum = 0;
            foreach(var selectedWorkDay in model.SelectedWorkDays)
            {
                selectedWorkDaysSum += selectedWorkDay;
            }
            if (this.ModelState.IsValid)
            {
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Email = model.Email;
                user.EGN = Int64.Parse(model.EGN);
                user.Gender = model.Gender;
                dentist.WorkDays = selectedWorkDaysSum;
                this.dentistsService.Edit(user);
                this.dentistsService.Edit(dentist);
            }

            return this.RedirectToAction("dentistHomePage", "Dentist");
        }

        [HttpGet]
        public IActionResult dentistFindAPatient(DentistFindAPatientViewModel model)
        {
            // Save input data into the model
            DentistFindAPatientViewModel inputModel = new DentistFindAPatientViewModel()
            {
                LastName = model.LastName,
                EGN = model.EGN,
                Email = model.Email
            };

            var patients = new List<User>();
            if (model != null)
            {
                if(!String.IsNullOrEmpty(inputModel.LastName) &&
                    !String.IsNullOrEmpty(inputModel.Email) &&
                    inputModel.EGN != 0)
                {
                    patients = usersService
                        .GetAllUsersWithReservations()
                        .Where(u => u.LastName == inputModel.LastName &&
                        u.LastName == inputModel.LastName &&
                        u.EGN == inputModel.EGN)
                        .ToList();
                    if(patients == null)
                    {
                        ViewData["message"] = "No such patient!";
                    }
                }
                // Make all variations otherwise
                if (!String.IsNullOrEmpty(inputModel.LastName)
                    && String.IsNullOrEmpty(inputModel.Email) &&
                    inputModel.EGN == 0)
                {
                    patients = usersService.GetAllUsersWithReservations()
                        .Where(u => u.LastName == inputModel.LastName).ToList();
                    if (patients == null)
                    {
                        ViewData["message"] = "No such Last Name for Patient!";
                    }

                }
                else if (!String.IsNullOrEmpty(inputModel.Email)
                    && String.IsNullOrEmpty(inputModel.LastName)
                    && inputModel.EGN == 0)
                {
                    patients = usersService.GetAllUsersWithReservations()
                        .Where(u => u.Email == inputModel.Email).ToList();
                    if (patients == null)
                    {
                        ViewData["message"] = "No such Email of Patient!";
                    }
                }
                else if (inputModel.EGN != 0
                        && String.IsNullOrEmpty(inputModel.LastName)
                        && String.IsNullOrEmpty(inputModel.Email))
                {
                    patients = usersService.GetAllUsersWithReservations()
                        .Where(u => u.EGN == inputModel.EGN).ToList();
                    if (patients == null)
                    {
                        ViewData["message"] = "No such EGN of Patient!";
                    }
                }
                else if (!String.IsNullOrEmpty(inputModel.LastName) && !String.IsNullOrEmpty(inputModel.Email))
                {
                    patients = usersService.GetAllUsersWithReservations()
                        .Where(u => u.LastName == inputModel.LastName && u.Email == inputModel.Email).ToList();
                    if (patients == null)
                    {
                        ViewData["message"] = "No such Last Name and Email of Patient!";
                    }
                }
                else if (!String.IsNullOrEmpty(inputModel.LastName) && inputModel.EGN != 0)
                {
                    patients = usersService.GetAllUsersWithReservations()
                        .Where(u => u.LastName == inputModel.LastName && u.EGN == inputModel.EGN).ToList();
                    if (patients == null)
                    {
                        ViewData["message"] = "No such Last Name and EGN of Patient!";
                    }
                }
                else if (inputModel.EGN != 0 && !String.IsNullOrEmpty(inputModel.Email))
                {
                    patients = usersService.GetAllUsersWithReservations()
                        .Where(u => u.EGN == inputModel.EGN && u.Email == inputModel.Email).ToList();
                    if (patients == null)
                    {
                        ViewData["message"] = "No such EGN and Email of Patient!";
                    }
                }
                else if (String.IsNullOrEmpty(inputModel.LastName) || String.IsNullOrEmpty(inputModel.Email))
                {
                    patients = usersService.GetAllUsersWithReservations()
                    .Where(u => u.EGN == inputModel.EGN).ToList();
                    if (patients == null)
                    {
                        ViewData["message"] = "No such EGN for Patient!";
                    }
                }
                else if (String.IsNullOrEmpty(inputModel.LastName) || inputModel.EGN == 0)
                {
                    patients = usersService.GetAllUsersWithReservations()
                    .Where(u => u.Email == inputModel.Email).ToList();
                    if (patients == null)
                    {
                        ViewData["message"] = "No such Email for Patient!";
                    }
                }
                else if (inputModel.EGN == 0 || String.IsNullOrEmpty(inputModel.Email))
                {
                    patients = usersService.GetAllUsersWithReservations()
                        .Where(u => u.LastName == inputModel.LastName).ToList();
                    if (patients == null)
                    {
                        ViewData["message"] = "No such Last Name for Patient!";
                    }
                }
            }

            // If there is no input the list is empty (No patients are found)
            if (patients == null)
            {
                return View(inputModel);
            }
            else
            {
                return View(new DentistFindAPatientViewModel()
                {
                    LastName = model.LastName,
                    EGN = model.EGN,
                    Email = model.Email,
                    Patients = patients
                });
            }
        }

        public IActionResult dentistMedicalManipulations()
        {
            string userId = GetCurrentUserId();
            var dentist = this.dentistsService
                .GetAllDentists().FirstOrDefault(user => user.User.Id == userId);
            var allReservations = this.reservationsService.GetAllReservationsOfDentist(dentist.Id);

            var model = new DentistMedicalManipulationsViewModel()
            {
                Reservations = allReservations.ToList()
            };

            return View(model);
        }

        public IActionResult dentistCheckDocument(int id)
        {
            if (id == 0)
            {
                return RedirectToAction("dentistMedicalManipulations", "Dentist");
            }

            var getReservation = this.reservationsService.GetReservationById(id);
            var result = new DentistCheckDocumentModelView
            {
                Reservation = getReservation
            };

            return View(result);
        }

        [HttpGet]
        public IActionResult dentistDocumentManipulation(int id)
        {
            if (id == 0)
            {
                return RedirectToAction("dentistMedicalManipulations", "Dentist");
            }

            var getReservation = this.reservationsService.GetReservationById(id);
            return View(
                new DentistDocumentManipulationViewModel()
                {
                    Reservation = getReservation
                }
                );
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult dentistDocumentManipulation(DentistDocumentManipulationViewModel model, int id, string returnUrl = null)
        {
            this.ViewData["ReturnUrl"] = returnUrl;
            if (id == 0)
            {
                return RedirectToAction("dentistMedicalManipulations", "Dentist");
            }
            model.Reservation = this.reservationsService.editReservationManimulation(id, model);
            //var user = this.usersService.GetAllUsers().FirstOrDefault(x => x.Id == GetCurrentUserId());

            if (this.ModelState.IsValid)
            {
                this.dentistsService.editDocumentManipulation(model, id);
            }
            return RedirectToAction("dentistCheckDocument", "Dentist", id);
        }

        public IActionResult dentistAppointments()
        {
            var allReservations = reservationsService.GetAllReservationsOfDentist(GetCurrentDentistId());

            var model = new DentistAppointmentsViewModel()
            {
                IncomingReservations = allReservations.Where(r => r.Date >= DateTime.Now).ToList()
            };
            model.PastReservations = allReservations.Except(model.IncomingReservations).ToList();

            return View(model);
        }

        [HttpPost]
        public IActionResult dentistCancelAppointment(DentistBookingViewModel model)
        {
            if (ModelState.IsValid)
            {
                reservationsService.CancelReservation(model.CancelId);
            }
            return RedirectToAction("dentistAppointments", "Dentist");
        }

        public IActionResult dentistForgottenPass()
        {
            return View();
        }

        public IActionResult dentistOnFirstLogIn()
        {
            return View();
        }

        public IActionResult dentistPatientHomePage()
        {
            return View();
        }

        public IActionResult loggedOut()
        {
            return View();
        }

        public IActionResult dentistEvents()
        {
            var model = new DentistBookingViewModel()
            {
                WorkHours = reservationsService.GetDentistWorkHoursForDay(GetCurrentDentistId(), DateTime.Now),
                Events = eventsService.GetDentistAllEvents(GetCurrentDentistId()).Where(e => e.StartDate > DateTime.Now).ToList()
            };
            return View(model);
        }

        [HttpPost]
        public IActionResult dentistAppointmentsList(int year, int month, int day)
        {
            var model = new DentistBookingViewModel();

            if (year > 0 && month > 0 && day > 0)
            {
                model.WorkHours = reservationsService.GetDentistWorkHoursForDay(GetCurrentDentistId(), new DateTime(year, month, day));
            }
            return PartialView(model);
        }

        public IActionResult dentistAddEvent()
        {
            return View();
        }

        [HttpPost]
        public IActionResult dentistAddEvent(DentistEventViewModel model)
        {
            if (ModelState.IsValid)
            {
                Event ev = new Event()
                {
                    Description = model.Description,
                    StartDate = DateTime.ParseExact(model.Start, "MM/dd/yyyy h:mm tt", CultureInfo.InvariantCulture),
                    DentistId = GetCurrentDentistId()
                };
                // One day
                ev.EndDate = new DateTime(ev.StartDate.Year, ev.StartDate.Month, ev.StartDate.Day,
                                          23, 59, 59);
               
                eventsService.AddEvent(ev);
            }
            return RedirectToAction("dentistEvents", "Dentist");
        }
    }
}
