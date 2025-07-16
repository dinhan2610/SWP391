import { createBrowserRouter, Navigate } from "react-router-dom";
// Simple role check (replace with real auth logic as needed)
function getUserRole() {
  const user = localStorage.getItem("USER_TOKEN");
  if (!user) return null;
  try {
    const parsed = JSON.parse(user);
    return parsed.role || null;
  } catch {
    return null;
  }
}

// Route guard for admin
function RequireAdmin({ children }) {
  return getUserRole() === "admin" ? children : <Navigate to="/" replace />;
}

// Route guard for user (login required)
function RequireUser({ children }) {
  return getUserRole() ? children : <Navigate to="/" replace />;
}
import HomePages from "../pages/HomePages";
import HomeTemplate from "../modules/HomeTemplate";
import Ovulation from "../pages/Ovulation";
import DueDateCalculatorTemplate from "../modules/DueDateTemplate";
import DueDateCalculatorResultTemplate from "../modules/DueDateResultTemplate";
import BlogPage from "../pages/Blog";
import QuizPage from "../modules/HomeTemplate/quiz";
import AboutHealthWise from "../pages/AboutHealthWise";
import ContactPage from "../pages/Contact";

import STIsTest from "../pages/STIsTest";
import BookingConsultation from "../pages/BookingConsulation";
import ChatWithAdvisor from "../pages/ChatWithAdvisor";
import PaymentPage from "../pages/PaymentPage";
import AdminSTIs from "../pages/AdminPages/STIs";
import HistorySTIs from "../pages/HistorySTIs";
import BlogAdmin from "../pages/AdminPages/BlogAdmin";
import Profile from "../modules/HomeTemplate/Profile";
import ManagerConsultant from "../pages/AdminPages/ManagerConsultant";
import AdminBookingConsultation from "../pages/AdminPages/advise";

const routes = [
  {
    element: <HomePages />,
    children: [
      { path: "/", element: <HomeTemplate /> },
      { path: "/ovulation", element: <Ovulation /> },
      { path: "/due-date", element: <DueDateCalculatorTemplate /> },
      {
        path: "/due-date/result",
        element: <DueDateCalculatorResultTemplate />,
      },
      { path: "/blog", element: <BlogPage /> },
      { path: "/about", element: <AboutHealthWise /> },
      { path: "/quiz", element: <QuizPage /> },
      { path: "/contact", element: <ContactPage /> },

      { path: "/stis-test", element: <STIsTest /> },
      { path: "/booking-consultation", element: <BookingConsultation /> },
      { path: "/chat", element: <ChatWithAdvisor /> },
      { path: "/payment", element: <PaymentPage /> },
      { path: "/admin/blog", element: <BlogAdmin /> },
      {
        path: "/admin/stis",
        element: (
          <RequireAdmin>
            <AdminSTIs />
          </RequireAdmin>
        ),
      },
      {
        path: "/history",
        element: (
          <RequireUser>
            <HistorySTIs />
          </RequireUser>
        ),
      },
      // {
      //   path: "/admin/blog",
      //   element: (
      //     <RequireAdmin>
      //       <BlogAdmin />
      //     </RequireAdmin>
      //   ),
      // },

      {
        path: "/profile",
        element: (
          <RequireUser>
            <Profile />
          </RequireUser>
        ),
      },
      {
        path: "/admin/manager-consultant",
        element: (
          <RequireAdmin>
            <ManagerConsultant />
          </RequireAdmin>
        ),
      },
      {
        path: "/admin/booking-consultation",
        element: (
          <RequireAdmin>
            <AdminBookingConsultation />
          </RequireAdmin>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
