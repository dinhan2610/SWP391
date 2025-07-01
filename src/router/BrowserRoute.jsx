import { createBrowserRouter } from "react-router-dom";
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
      { path: "/admin/stis", element: <AdminSTIs /> },
      {
        path: "/history",
        element: <HistorySTIs />,
      },
      { path: "/admin/blog", element: <BlogAdmin /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
