﻿using DentistAppointment.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DentistAppointment.Models.CommentsViewModel
{
    public class ListCommentsForPatientViewModel
    {
        public Dentist Dentist { get; set; }
        public Event Event { get; set; }
        public string Content { get; set; }
    }
}
