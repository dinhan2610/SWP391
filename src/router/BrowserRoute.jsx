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
import TestServiceForm from "../pages/AdminPages/TestService";
import TestServicesList from "../pages/ServiceList";
import BookingConsultation from "../pages/BookingConsulation";

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
      { path: "/admin/test-services", element: <TestServiceForm /> },
      { path: "/test-services", element: <TestServicesList /> },
      { path: "/booking-consultation", element: <BookingConsultation /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
