import React from "react";
import { Navigate } from "react-router-dom";
import DashboardEcommerce from "../pages/DashboardEcommerce";
import Patient from "../pages/Patient";
import MyMeetingUI from "../pages/Meeting/MeetingPage.jsx";
import Intern from "../pages/Intern/index.js";
const Login = React.lazy(() => import("../pages/Authentication/Login"));
const ForgetPasswordPage = React.lazy(
  () => import("../pages/Authentication/ForgetPassword"),
);
const Logout = React.lazy(() => import("../pages/Authentication/Logout"));
const Register = React.lazy(() => import("../pages/User"));
const Setting = React.lazy(() => import("../pages/Setting"));
const Notification = React.lazy(() => import("../pages/Notification"));
const Recyclebin = React.lazy(() => import("../pages/Recyclebin"));
const UserProfile = React.lazy(
  () => import("../pages/Authentication/user-profile"),
);
const Center = React.lazy(() => import("../pages/Center"));
const Nurse = React.lazy(() => import("../pages/Nurse"));
const EmergencyDashboad = React.lazy(
  () => import("../pages/DashboardEmergency"),
);
const CashManagement = React.lazy(() => import("../pages/CashManagement"));
const CentralPayment = React.lazy(() => import("../pages/CentralPayment"));
const Booking = React.lazy(() => import("../pages/Booking"));
const Medicine = React.lazy(() => import("../pages/Medicine"));
const Lead = React.lazy(() => import("../pages/Lead"));
const WebCamStats = React.lazy(() => import("../pages/WebCamStats"));
const Report = React.lazy(() => import("../pages/Report"));
const Pharmacy = React.lazy(() => import("../pages/Inventory"));
const Guidelines = React.lazy(() => import("../pages/Guidelines"));
const IncidentReporting = React.lazy(
  () => import("../pages/IncidentReporting"),
);
const RoundNotes = React.lazy(() => import("../pages/RoundNotes"));
const HR = React.lazy(() => import("../pages/HR"));
const MiReporting = React.lazy(() => import("../pages/MIReporting/index.js"));
const HRMS = React.lazy(() => import("../pages/HRMS"));
const Referral = React.lazy(() => import("../pages/Referral"));
const Tally = React.lazy(() => import("../pages/Tally"));

const allElements = [
  { element: Register, label: "User" },
  { element: Center, label: "Center" },
  { element: Intern, label: "Intern" },
  { element: Patient, label: "Patient" },
  { element: Intern, label: "Intern" },
  { element: Booking, label: "Booking" },
  { element: Setting, label: "Setting" },
  { element: Recyclebin, label: "Recycle bin" },
  { element: Lead, label: "Lead" },
  { element: Report, label: "Report" },
  { element: Nurse, label: "Nurse" },
  { element: EmergencyDashboad, label: "Emergency" },
  { element: CentralPayment, label: "Central Payment" },
  { element: CashManagement, label: "Cash" },
  { element: Pharmacy, label: "Pharmacy" },
  { element: Guidelines, label: "Guidelines" },
  { element: IncidentReporting, label: "Incident Reporting" },
  { element: MiReporting, label: "Hubspot Reporting" },
  { element: HR, label: "HR" },
  { element: HRMS, label: "HRMS" },
  { element: WebCamStats, label: "Web Cam Stats" },
  { element: Referral, label: "Referral" },
  { element: Tally, label: "Tally" },
];

const authProtectedRoutes = [
  { path: "/dashboard", component: DashboardEcommerce },
  { path: "/index", component: DashboardEcommerce },
  { path: "/profile", component: UserProfile },
  { path: "/user/*", component: Register },
  { path: "/patient/*", component: Patient },
  { path: "/setting/*", component: Setting },
  { path: "/recyclebin/*", component: Recyclebin },
  { path: "/medicine", component: Medicine },
  { path: "/notification", component: Notification },
  { path: "/intern/*", component: Intern },
  { path: "/centers", component: Center },
  { path: "/nurse/*", component: Nurse },
  { path: "/emergency/*", component: EmergencyDashboad },
  { path: "/cash", component: CashManagement },
  { path: "/pharmacy/*", component: Pharmacy },
  { path: "/centralpayment/*", component: CentralPayment },
  { path: "/guidelines/*", component: Guidelines },
  { path: "/incident-reporting/*", component: IncidentReporting },
  { path: "/round-notes", component: RoundNotes },
  { path: "/hr/*", component: HR },
  { path: "/mi-reporting", component: MiReporting },
  { path: "/mi-reporting/*", component: MiReporting },
  { path: "/hrms/*", component: HRMS },
  { path: "/webcamstats/*", component: WebCamStats },
  { path: "/referral", component: Referral },
  { path: "/tally", component: Tally },
  {
    path: "/",
    exact: true,
    component: () => <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPasswordPage },
  { path: "/meeting", component: MyMeetingUI },
];

export { authProtectedRoutes, publicRoutes, allElements };
