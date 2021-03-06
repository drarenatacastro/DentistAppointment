﻿using DentistAppointment.Data;
using DentistAppointment.Data.Models;
using DentistAppointment.DTOs;
using DentistAppointment.Services.Abstraction;
using DentistAppointment.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using DentistAppointment.Models.DentistViewModels;

namespace DentistAppointment.Services
{
    public class ReservationsService : IReservationsService
    {
        private readonly IRepository<Reservation, int> reservationsRepo;
        private readonly IRepository<Review, int> reviewsRepo;
        private readonly IRepository<Dentist, int> dentistRepo;
        private readonly IRepository<User, string> usersRepo;

        public ReservationsService(
            IRepository<Reservation, int> reservationsRepo,
            IRepository<Review, int> reviewsRepo,
            IRepository<Dentist, int> dentistRepo,
            IRepository<User, string> usersRepo)
        {
            this.reservationsRepo = reservationsRepo;
            this.reviewsRepo = reviewsRepo;
            this.dentistRepo = dentistRepo;
            this.usersRepo = usersRepo;
        }

        public List<DentistWorkHourDTO> GetDentistWorkHoursForDay(int dentistId, DateTime date)
        {
            Dentist dentist = dentistRepo.GetById(dentistId);
            List<DayOfWeek> workDays = GetDentistWorkDays(dentist);

            List<DentistWorkHourDTO> workHours = new List<DentistWorkHourDTO>();
            List<Reservation> reservations;
            User patient = null;
            int reservationId = 0;

            if (workDays.Contains(date.DayOfWeek))
            {
                DateTime currDateTime;
                bool available;
                for (TimeSpan start = dentist.WorkTimeStart; start < dentist.WorkTimeEnd; start += GlobalConstants.DentistAppointmentLength)
                {
                    currDateTime = new DateTime(date.Year, date.Month, date.Day, start.Hours, start.Minutes, start.Seconds);
                    reservations = reservationsRepo.GetAll().Where(r => r.Date == currDateTime && r.DentistId == dentistId).ToList();
                    // If reservations count for current datetime is 0, hour is available
                    available = reservations.Count() == 0;
                    // If hour is reserved get the patient
                    if (!available)
                    {
                        patient = usersRepo.GetById(reservations[0].UserId);
                        reservationId = reservations[0].Id;
                    }
                    workHours.Add(new DentistWorkHourDTO(start, start + GlobalConstants.DentistAppointmentLength, date, available, patient, reservationId));
                }
            }
            return workHours;
        }

        public List<DayOfWeek> GetDentistWorkDays(Dentist dentist)
        {
            List<DayOfWeek> workDays = new List<DayOfWeek>();

            string bitmask = new string(Convert.ToString(dentist.WorkDays, 2).Reverse().ToArray());
            for (int i = 0, s = bitmask.Length; i < s; i++)
            {
                if (bitmask[i].Equals('1'))
                {
                    switch (i)
                    {
                        case 0: workDays.Add(DayOfWeek.Sunday); break;
                        case 1: workDays.Add(DayOfWeek.Monday); break;
                        case 2: workDays.Add(DayOfWeek.Tuesday); break;
                        case 3: workDays.Add(DayOfWeek.Wednesday); break;
                        case 4: workDays.Add(DayOfWeek.Thursday); break;
                        case 5: workDays.Add(DayOfWeek.Friday); break;
                        case 6: workDays.Add(DayOfWeek.Saturday); break;
                    }
                }
            }
            return workDays;
        }

        public void MakeReservation(string userId, int dentistId, DateTime date)
        {
            Reservation reservation = new Reservation()
            {
                UserId = userId,
                DentistId = dentistId,
                Date = date
            };
            reservationsRepo.Add(reservation);
            reservationsRepo.Save();
        }

        // For Madical Manipulations, Viki
        public IEnumerable<Reservation> GetAllReservationsOfDentist(int dentistId)
        {
            var reservations = this.reservationsRepo.GetAll()
                .Where(r => r.DentistId == dentistId).ToList();
            foreach (var reservation in reservations)
            {
                reservation.User = usersRepo.GetById(reservation.UserId);
            }

            return reservations;
        }

        public Reservation GetReservationById(int reservationId)
        {
            var reservation = this.reservationsRepo.GetById(reservationId);
            reservation.User = usersRepo.GetById(reservation.UserId);
            reservation.Dentist = dentistRepo.GetById(reservation.DentistId);
            reservation.Dentist.User = usersRepo.GetAll().First(u => u.DentistId == reservation.DentistId);
            return reservation;
        }

        public IEnumerable<Reservation> GetAllReservationsOfUser(string userId)
        {
            var reservations = this.reservationsRepo.GetAll()
                .Where(r => r.UserId == userId).ToList();
            foreach (var reservation in reservations)
            {
                reservation.Dentist = dentistRepo.GetById(reservation.DentistId);
                reservation.Dentist.User = usersRepo.GetAll().First(u => u.DentistId == reservation.DentistId);
            }

            return reservations;
        }

        public IEnumerable<Reservation> GetAllPastReservationsOfUser(string userId)
        {
            return GetAllReservationsOfUser(userId).Where(r => r.Date < DateTime.Now);
        }

        public IEnumerable<Reservation> GetAllReservationWaitingForReview(string userId)
        {
            var reviews = reviewsRepo.GetAll();
            return GetAllPastReservationsOfUser(userId).Where(res => reviews.Where(rev => rev.ReservationId == res.Id).Count() == 0);
        }

        public Reservation editReservationManimulation(int reservationId, DentistDocumentManipulationViewModel model)
        {
            var reservation = this.reservationsRepo.GetById(reservationId);
            reservation.User = usersRepo.GetById(reservation.UserId);
            reservation.User.Rating = model.Rating;
            reservation.Dentist = dentistRepo.GetById(reservation.DentistId);
            reservation.Manipulation = model.Reservation.Manipulation;
            return reservation;
        }

        public void CancelReservation(int reservationId)
        {
            reservationsRepo.Delete(reservationsRepo.GetById(reservationId));
            reservationsRepo.Save();
        }
    }
}
