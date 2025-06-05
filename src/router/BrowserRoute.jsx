import { createBrowserRouter } from "react-router-dom";
import HomePages from "../pages/HomePages";
import HomeTemplate from "../modules/HomeTemplate";
import Ovulation from "../pages/Ovulation";
import DueDateCalculatorTemplate from "../modules/DueDateTemplate";
import DueDateCalculatorResultTemplate from "../modules/DueDateResultTemplate";
import BlogPage from "../pages/Blog"; // Import BlogPage

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
      { path: "/blog", element: <BlogPage /> }, // Thêm route cho trang blog
    ],
  },
];

export const router = createBrowserRouter(routes);
