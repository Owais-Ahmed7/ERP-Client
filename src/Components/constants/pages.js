const pages = [
  {
    id: "recyclebin",
    label: "Recycle bin",
    name: "Recycle bin",
    link: "/recyclebin",
    icon: "ri-delete-bin-6-line",
  },
  {
    id: "nurse",
    label: "Nurse",
    name: "Nurse",
    link: "/nurse",
    icon: "bx bx-user",
  },
  {
    id: "emergency",
    label: "Emergency",
    name: "Emergency",
    link: "/emergency",
    icon: "bx bxs-error",
  },
  {
    id: "centralpayment",
    label: "Central Payment",
    name: "Central Payment",
    link: "/centralpayment",
    icon: "bx bx-wallet-alt",
  },
  {
    id: "incidentreporting",
    label: "Incident Reporting",
    name: "Incident Reporting",
    link: "/incident-reporting",
    icon: "bx bx-error",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
  },
  {
    id: "cash",
    label: "Cash",
    name: "Cash",
    link: "/cash",
    icon: "bx bx-rupee",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
    // children: [
    //   {
    //     name: "Reports",
    //     permissions: {
    //       create: true,
    //       edit: true,
    //       delete: true,
    //     },
    //   },
    //   {
    //     name: "Balance",
    //     permissions: {
    //       create: true,
    //       edit: true,
    //       delete: true,
    //     },
    //   },
    //   {
    //     name: "Deposits",
    //     permissions: {
    //       create: true,
    //       edit: true,
    //       delete: true,
    //     },
    //   },
    //   {
    //     name: "Spending",
    //     permissions: {
    //       create: true,
    //       edit: true,
    //       delete: true,
    //     },
    //   },
    // ],
  },
  {
    id: "users",
    label: "User",
    name: "User",
    link: "/user",
    icon: "bx bx-user",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
  },
  {
    id: "intern",
    label: "Intern",
    name: "Intern",
    link: "/intern/*",
    icon: "bx bx-user",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
    children: [
      {
        name: "Timeline",
        permissions: {
          create: true,
          edit: true,
          delete: true,
        },
      },
      {
        name: "Billing",
        permissions: {
          create: true,
          edit: true,
          delete: true,
        },
      },
      {
        name: "Forms",
        permissions: {
          create: true,
          edit: true,
          delete: true,
        },
      },
      {
        name: "Certificate",
        permissions: {
          create: true,
          edit: true,
          delete: true,
        },
      },
    ],
  },
  {
    id: "lead",
    label: "Lead",
    name: "Lead",
    link: "/lead",
    icon: "bx bx-user",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
  },
  {
    id: "patient",
    label: "Patient",
    name: "Patient",
    link: "/patient/*",
    icon: "bx bx-user-plus",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
    children: [
      {
        name: "Charting",
        permissions: {
          create: true,
          edit: true,
          delete: true,
        },
      },
      {
        name: "Billing",
        permissions: {
          create: true,
          edit: true,
          delete: true,
        },
      },
      {
        name: "Forms",
        permissions: {
          create: true,
          edit: true,
          delete: true,
        },
      },
      {
        name: "OPD",
        permissions: {
          create: true,
          edit: true,
          delete: true,
        },
      },
      {
        name: "Timeline",
      },
    ],
  },
  {
    id: "referral",
    label: "Referral",
    name: "Referral",
    link: "/referral",
    icon: "bx bx-share-alt",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
  },
  {
    id: "roundnotes",
    label: "Round Notes",
    name: "Round Notes",
    link: "/round-notes",
    icon: "ri-sticky-note-line",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
  },
  {
    id: "mireporting",
    label: "Mi Reporting",
    name: "Mi Reporting",
    link: "/mi-reporting",
    icon: "ri-sticky-note-line",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
  },
  {
    id: "booking",
    label: "Booking",
    name: "Booking",
    link: "/booking",
    icon: "bx bx-calendar",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
  },
  {
    id: "setting",
    label: "Setting",
    name: "Setting",
    link: "/setting",
    icon: "bx bxs-cog",
    permissions: {
      create: true,
      edit: true,
      delete: true,
    },
  },
  {
    id: "report",
    label: "Report",
    name: "Report",
    link: "/report",
    icon: "bx bxs-report",
  },
  {
    id: "pharmacy",
    label: "Pharmacy",
    name: "Pharmacy",
    link: "/pharmacy",
    icon: "bx bx-book",
  },
  {
    id: "guidelines",
    label: "Guidelines",
    name: "Guidelines",
    link: "/guidelines",
    icon: "bx bx-book-open",
  },
  {
    id: "hr",
    label: "HR",
    name: "HR",
    link: "/hr",
    icon: "bx bx-body",
  },
  {
    id: "hrms",
    label: "HRMS",
    name: "HRMS",
    link: "/hrms",
    icon: "bx bx-group",
  },
  {
    id: "webcamstats",
    label: "Web Cam Stats",
    name: "Web Cam Stats",
    link: "/webcamstats",
    icon: "bx bx-group",
  },
  {
    id: "tally",
    label: "Tally",
    name: "Tally",
    link: "/tally",
    icon: "bx bx-transfer",
  },
];

export const WebcamStats = [
  {
    id: "webcamstats-dashboard",
    label: "Dashboard",
    link: "/webcamstats/dashboard",
    icon: "bx bx-home",
  },
  {
    id: "webcamstats-stats",
    label: "Stats",
    link: "/webcamstats/stats",
    icon: "bx bx-home",
  },
  {
    id: "webcamstats-apikeys",
    label: "API Keys",
    link: "/webcamstats/apikeys",
    icon: "bx bx-home",
  },
];

export const Pharmacy = [
  {
    id: "pharmacy-dashboard",
    label: "Dashboard",
    link: "/pharmacy/dashboard",
    icon: "bx bx-home",
  },
  {
    id: "pharmacymanagement",
    label: "Inventory",
    link: "/pharmacy/management",
    icon: "bx bx-building-house",
  },
  {
    id: "givenmedicines",
    label: "Medicine Given",
    link: "/pharmacy/given-med",
    icon: "bx bx-building-house",
  },
  {
    id: "medicineaApproval",
    label: "Medicine Approval",
    link: "/pharmacy/approval",
    icon: "bx bx-checkbox-checked",
  },
  {
    id: "audit",
    label: "Audit",
    link: "/pharmacy/audit",
    icon: "bx bx-fingerprint",
  },
];

export const MIReporting = [
  {
    id: "center-leads-mom",
    label: "Center Leads (MoM)",
    link: "/mi-reporting/center-leads-mom",
    icon: "bx bx-bar-chart-alt-2",
  },
  {
    id: "center-leads-mtd",
    label: "Center Leads (MTD)",
    link: "/mi-reporting/center-leads-mtd",
    icon: "bx bx-line-chart",
  },
  {
    id: "owner-leads-mom",
    label: "Owner Leads (MoM)",
    link: "/mi-reporting/owner-leads-mom",
    icon: "bx bx-bar-chart-square",
  },
  {
    id: "owner-leads-mtd",
    label: "Owner Leads (MTD)",
    link: "/mi-reporting/owner-leads-mtd",
    icon: "bx bx-trending-up",
  },
  {
    id: "city-quality",
    label: "City Quality Breakdown",
    link: "/mi-reporting/city-quality",
    icon: "bx bx-map",
  },
  {
    id: "owner-quality",
    label: "Owner Quality Breakdown",
    link: "/mi-reporting/owner-quality",
    icon: "bx bx-user-check",
  },
  {
    id: "city-visit-date",
    label: "City Visit Date",
    link: "/mi-reporting/city-visit-date",
    icon: "bx bx-calendar",
  },
  {
    id: "owner-visit-date",
    label: "Owner Visit Date",
    link: "/mi-reporting/owner-visit-date",
    icon: "bx bx-calendar-check",
  },
  {
    id: "city-visited-date",
    label: "City Visited Date",
    link: "/mi-reporting/city-visited-date",
    icon: "bx bx-calendar-event",
  },
  {
    id: "owner-visited-date",
    label: "Owner Visited Date",
    link: "/mi-reporting/owner-visited-date",
    icon: "bx bx-calendar-star",
  },
];

export const setting = [
  {
    id: "medicine",
    label: "Medicine",
    link: "/setting/medicine",
    icon: "bx bx-capsule",
  },
  {
    id: "billing",
    label: "Billing",
    link: "/setting/billing",
    icon: "bx bx-receipt",
  },
  {
    id: "calender",
    label: "Calender",
    link: "/setting/calender",
    icon: "bx bxs-calendar",
  },
  {
    id: "offer",
    label: "Offer Code",
    link: "/setting/offercode",
    icon: "bx bxs-offer",
  },
  {
    id: "taxmanagement",
    label: "Tax Management",
    link: "/setting/taxmanagement",
    icon: "bx bx-stats",
  },
  {
    id: "roles",
    label: "Roles & Permissions",
    link: "/setting/rolesmanagment",
    icon: "bx bx-fingerprint",
  },
  {
    id: "therapies",
    label: "Therapies",
    link: "/setting/therapies",
    icon: "bx bx-heart",
  },
  {
    id: "conditions",
    label: "Conditions",
    link: "/setting/conditions",
    icon: "bx bx-health",
  },
  {
    id: "symptoms",
    label: "Symptoms",
    link: "/setting/symptoms",
    icon: "bx bx-health",
  },
];

export const recyclebin = [
  {
    id: "center",
    label: "Center",
    link: "/recyclebin/center",
    icon: "bx bx-buildings",
  },
  {
    id: "patient",
    label: "Patient",
    link: "/recyclebin/patient",
    icon: "bx bx-capsule",
  },
  {
    id: "chart",
    label: "Chart",
    link: "/recyclebin/chart",
    icon: "bx bx-capsule",
  },
  {
    id: "bill",
    label: "Bill",
    link: "/recyclebin/bill",
    icon: "bx bx-capsule",
  },
  {
    id: "lead",
    label: "Lead",
    link: "/recyclebin/lead",
    icon: "bx bx-capsule",
  },
  {
    id: "medicine",
    label: "Medicine",
    link: "/recyclebin/medicine",
    icon: "bx bx-capsule",
  },
  {
    id: "intern",
    label: "Intern",
    link: "/recyclebin/intern",
    icon: "bx bx-capsule",
  },
];

export const HR = [
  // {
  //   id: "hr-dashboard",
  //   label: "Dashboard",
  //   link: "/hr/dashboard",
  //   icon: "bx bx-home",
  // },
  {
    id: "master-employee",
    label: "Master Employee",
    link: "/hr/employee",
    icon: "bx bx-group",
  },
  {
    id: "new-joinings",
    label: "New Joinings",
    icon: "bx  bx-arrow-from-left",
    isAccordion: true,
    children: [
      {
        id: "add-new-joining",
        label: "Add Request",
        icon: "bx bx-plus",
        link: "/hr/new-joinings/add",
      },
      {
        id: "new-joining-approval",
        label: "Joining Approvals",
        icon: "bx bx-check-shield",
        link: "/hr/new-joinings/approval",
      },
      {
        id: "new-joining-it",
        label: "IT Approvals",
        icon: "bx bx-chip",
        link: "/hr/new-joinings/it",
      },
    ],
  },
  {
    id: "exit-employees",
    label: "Exit Employees",
    icon: "bx bx-arrow-to-left",
    link: "/hr/exit-employees",
    isAccordion: true,
    children: [
      {
        id: "add-exit-request",
        label: "Add Request",
        icon: "bx bx-plus",
        link: "/hr/exit-employees/add",
      },
      {
        id: "exit-approval",
        label: "Exit Approvals",
        icon: "bx bx-check-shield",
        link: "/hr/exit-employees/approval",
      },
      {
        id: "exit-fnf-approval",
        label: "FNF Approvals",
        icon: "bx bx-briefcase",
        link: "/hr/exit-employees/fnf",
      },
      {
        id: "exit-it-approval",
        label: "IT Approvals",
        icon: "bx bx-chip",
        link: "/hr/exit-employees/it",
      },
    ],
  },
  {
    id: "salary-advance",
    label: "Salary Advance",
    link: "/hr/salary-advance",
    icon: "bx bx-rupee",
    isAccordion: true,
    children: [
      {
        id: "add-salary-advance-request",
        label: "Add Request",
        icon: "bx bx-plus",
        link: "/hr/salary-advance/add",
      },
      {
        id: "salary-advance-approval",
        label: "Approvals",
        icon: "bx bx-check-shield",
        link: "/hr/salary-advance/approval",
      },
    ],
  },
  {
    id: "transfer-employees",
    label: "Transfer Employees",
    icon: "bx bx-slider-alt",
    link: "/hr/transfer-employees",
    isAccordion: true,
    children: [
      {
        id: "add-transfer-request",
        label: "Add Request",
        icon: "bx bx-plus",
        link: "/hr/transfer-employees/add",
      },
      {
        id: "transfer-approval",
        label: "All Approvals",
        icon: "bx bx-check-shield",
        link: "/hr/transfer-employees/approval",
      },
      {
        id: "transfer-current-location-approval",
        label: "Outgoing Approvals",
        icon: "bx bx-arrow-to-left",
        link: "/hr/transfer-employees/outgoing",
      },
      {
        id: "transfer-transferred-location-approval",
        label: "Incoming Approvals",
        icon: "bx bx-arrow-to-right",
        link: "/hr/transfer-employees/incoming",
      },
      {
        id: "transfer-it-approval",
        label: "IT Approvals",
        icon: "bx bx-chip",
        link: "/hr/transfer-employees/it",
      },
    ],
  },
  {
    id: "hiring",
    label: "Hiring",
    icon: "bx bx-badge",
    link: "/hr/hiring",
    isAccordion: true,
    children: [
      {
        id: "add-hiring-request",
        label: "Add Request",
        icon: "bx bx-plus",
        link: "/hr/hiring/add",
      },
      {
        id: "hiring-approval",
        label: "Approvals",
        icon: "bx bx-check-shield",
        link: "/hr/hiring/approval",
      },
    ],
  },
  {
    id: "third-party-manpower",
    label: "Third Party Manpower",
    icon: "bx bx-user-voice",
    link: "/hr/tpm",
    isAccordion: true,
    children: [
      {
        id: "add-tpm-request",
        label: "Add Request",
        icon: "bx bx-plus",
        link: "/hr/tpm/add",
      },
      {
        id: "tpm-approval",
        label: "Approvals",
        icon: "bx bx-check-shield",
        link: "/hr/tpm/approval",
      },
    ],
  },
  {
    id: "attendance",
    label: "Attendance",
    link: "/hr/attendance",
    icon: "bx bx-time-five",
    isAccordion: true,
    children: [
      {
        id: "attendance-log",
        label: "Attendance Log",
        link: "/hr/attendance/logs",
        icon: "bx bx-list-ul",
      },
      {
        id: "attendance-metrics",
        label: "Attendance Metrics",
        link: "/hr/attendance/metrics",
        icon: "bx bx-stats",
      },
      {
        id: "my-attendance",
        label: "My Attendance",
        link: "/hr/attendance/self",
        icon: "bx bx-calendar-check",
      },
    ],
  },
  {
    id: "employee-reporting",
    label: "Employee Reporting",
    link: "/hr/attendance",
    icon: "bx bx-git-branch",
    isAccordion: true,
    children: [
      {
        id: "assign-manager",
        label: "Assign Manager",
        link: "/hr/reporting/assign",
        icon: "bx bx-user-plus",
      },
      {
        id: "manage-employee-reporting",
        label: "Manage",
        link: "/hr/reporting/manage",
        icon: "bx bx-list-check",
      },
    ],
  },
  {
    id: "leaves",
    label: "Leaves",
    link: "/hr/leaves",
    icon: "bx bx-calendar",
    isAccordion: true,
    children: [
      {
        id: "apply-leave",
        label: "Apply Leave",
        link: "/hr/leaves/apply",
        icon: "bx bx-edit",
      },
      {
        id: "leave-history",
        label: "Leave History",
        link: "/hr/leaves/history",
        icon: "bx bx-history",
      },
      {
        id: "manage-leaves",
        label: "Manage Leaves",
        link: "/hr/leaves/manage",
        icon: "bx bx-slider",
      },
      {
        id: "my-leaves",
        label: "My Leaves",
        link: "/hr/leaves/my/leaves",
        icon: "bx bx-calendar",
      },
      {
        id: "my-balance-leaves",
        label: "Balance Leaves",
        link: "/hr/leaves/my/balance/leaves",
        icon: "bx bx-layer",
      },
    ],
  },
  {
    id: "policies",
    label: "Policies",
    link: "/hr/policies",
    icon: "bx bx-notepad",
    isAccordion: true,
    children: [
      {
        id: "policy",
        label: "Policies",
        link: "/hr/policies",
        icon: "bx bx-spreadsheet",
      },
    ],
  },
];

export const HRMS = [
  // {
  //   id: "attendance",
  //   label: "Attendance",
  //   link: "/hrms/attendance",
  //   icon: "bx bx-time-five",
  //   isAccordion: true,
  //   children: [
  //     {
  //       id: "attendance-log",
  //       label: "Attendance Log",
  //       link: "/hrms/attendance/logs",
  //       icon: "bx bx-list-ul",
  //     },
  //     {
  //       id: "attendance-metrics",
  //       label: "Attendance Metrics",
  //       link: "/hrms/attendance/metrics",
  //       icon: "bx bx-stats",
  //     },
  //     {
  //       id: "my-attendance",
  //       label: "My Attendance",
  //       link: "/hrms/attendance/self",
  //       icon: "bx bx-calendar-check",
  //     },
  //   ]
  // },
  // {
  //   id: "employee-reporting",
  //   label: "Employee Reporting",
  //   link: "/hrms/attendance",
  //   icon: "bx bx-git-branch",
  //   isAccordion: true,
  //   children: [
  //     {
  //       id: "assign-manager",
  //       label: "Assign Manager",
  //       link: "/hrms/reporting/assign",
  //       icon: "bx bx-user-plus",
  //     },
  //     {
  //       id: "manage-employee-reporting",
  //       label: "Manage",
  //       link: "/hrms/reporting/manage",
  //       icon: "bx bx-list-check",
  //     },
  //   ],
  // },
  // {
  //   id: "leaves",
  //   label: "Leaves",
  //   link: "/hrms/leaves",
  //   icon: "bx bx-calendar",
  //   isAccordion: true,
  //   children: [
  //     {
  //       id: "apply-leave",
  //       label: "Apply Leave",
  //       link: "/hrms/leaves/apply",
  //       icon: "bx bx-edit",
  //     },
  //     {
  //       id: "leave-history",
  //       label: "Leave History",
  //       link: "/hrms/leaves/history",
  //       icon: "bx bx-history",
  //     },
  //     {
  //       id: "manage-leaves",
  //       label: "Manage Leaves",
  //       link: "/hrms/leaves/manage",
  //       icon: "bx bx-history",
  //     },
  //     {
  //       id: "my-leaves",
  //       label: "My Leaves",
  //       link: "/hrms/leaves/my/leaves",
  //       icon: "bx bx-history",
  //     },
  //   ],
  // },
  // {
  //   id: "policies",
  //   label: "Policies",
  //   link: "/hrms/policies",
  //   icon: "bx bx-calendar",
  //   isAccordion: true,
  //   children: [
  //     {
  //       id: "policy",
  //       label: "Policies",
  //       link: "/hrms/policies",
  //       icon: "bx bx-history",
  //     },
  //   ],
  // },
];

export default pages;
