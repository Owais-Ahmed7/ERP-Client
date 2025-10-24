import React from "react";
import { Navigate } from "react-router-dom";
import DashboardEcommerce from "../pages/DashboardEcommerce";
import Patient from "../pages/Patient";
import MyMeetingUI from "../pages/Meeting/MeetingPage.jsx";
import Intern from "../pages/Intern/index.js";
const Login = React.lazy(() => import("../pages/Authentication/Login"));
const ForgetPasswordPage = React.lazy(() =>
  import("../pages/Authentication/ForgetPassword")
);
const Logout = React.lazy(() => import("../pages/Authentication/Logout"));
const Register = React.lazy(() => import("../pages/User"));
const Setting = React.lazy(() => import("../pages/Setting"));
const Notification = React.lazy(() => import("../pages/Notification"));
const Recyclebin = React.lazy(() => import("../pages/Recyclebin"));
const UserProfile = React.lazy(() =>
  import("../pages/Authentication/user-profile")
);
const Center = React.lazy(() => import("../pages/Center"));
const Nurse = React.lazy(() => import("../pages/Nurse"));
const EmergencyDashboad = React.lazy(() =>
  import("../pages/DashboardEmergency")
);
const CashManagement = React.lazy(() => import("../pages/CashManagement"));
const Booking = React.lazy(() => import("../pages/Booking"));
const Medicine = React.lazy(() => import("../pages/Medicine"));
const Lead = React.lazy(() => import("../pages/Lead"));
const Report = React.lazy(() => import("../pages/Report"));
const Pharmacy = React.lazy(() => import("../pages/Inventory"));
const Guidelines = React.lazy(() => import("../pages/Guidelines"));

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
  { element: CashManagement, label: "Cash" },
  { element: Pharmacy, label: "Pharmacy" },
  { element: Guidelines, label: "Guidelines" },
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
  { path: "/guidelines/*", component: Guidelines },
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
