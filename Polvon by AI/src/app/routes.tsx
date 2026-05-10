import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PostJobPage } from "./pages/PostJobPage";
import { SearchJobsPage } from "./pages/SearchJobsPage";
import { RecentJobsPage } from "./pages/RecentJobsPage";
import { JobDetailPage } from "./pages/JobDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { ChatPage } from "./pages/ChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "notifications", Component: NotificationsPage },
      { path: "chat", Component: ChatPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignUpPage },
      { path: "profile", Component: ProfilePage },
      { path: "post-job", Component: PostJobPage },
      { path: "search", Component: SearchJobsPage },
      { path: "recent", Component: RecentJobsPage },
      { path: "job/:id", Component: JobDetailPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
