﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DentistAppointment.Common
{
    public class GlobalConstants
    {
        public const string AdminRole = "Admin";
        public const string UserRole = "User";
        public const string DentistRole = "Dentist";
        public static readonly TimeSpan DentistAppointmentLength = new TimeSpan(0, 30, 0);
    }
}
