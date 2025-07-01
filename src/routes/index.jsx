import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import HomePage from "@pages/HomePage";
import MassesPage from "@pages/MassesPage";
import EventsPage from "@pages/EventsPage";
import NewsPage from "@pages/NewsPage";
import PrayersPage from "@pages/PrayersPage";
import MediaPage from "@pages/MediaPage";
import ContactPage from "@pages/ContactPage";
import LoginPage from "@pages/LoginPage";
import { adminRoutes } from "./adminRoutes";
import AdminLayout from "@layouts/AdminLayout";

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "masses",
          element: <MassesPage />,
        },
        {
          path: "events",
          element: <EventsPage />,
        },
        {
          path: "news",
          element: <NewsPage />,
        },
        {
          path: "prayers",
          element: <PrayersPage />,
        },
        {
          path: "media",
          element: <MediaPage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: adminRoutes.children,
    },
  ],
  {
    basename: "/bacthinh",
  }
);
