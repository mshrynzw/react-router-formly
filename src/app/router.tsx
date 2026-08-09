import { createBrowserRouter } from "react-router";

import { AppShell } from "@/components/layout/app-shell";
import BuilderRoute from "@/routes/builder";
import CodeRoute from "@/routes/code";
import HomeRoute from "@/routes/home";
import NotFoundRoute from "@/routes/not-found";
import PreviewRoute from "@/routes/preview";
import SettingsRoute from "@/routes/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomeRoute />,
      },
      {
        path: "builder",
        element: <BuilderRoute />,
      },
      {
        path: "preview",
        element: <PreviewRoute />,
      },
      {
        path: "code",
        element: <CodeRoute />,
      },
      {
        path: "settings",
        element: <SettingsRoute />,
      },
      {
        path: "*",
        element: <NotFoundRoute />,
      },
    ],
  },
]);
