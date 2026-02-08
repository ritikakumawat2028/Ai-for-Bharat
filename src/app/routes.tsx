import { createBrowserRouter } from "react-router";
import { Root } from "@/app/components/Root";
import { LandingPage } from "@/app/pages/LandingPage";
import { LanguageSelection } from "@/app/pages/LanguageSelection";
import { LoginPage } from "@/app/pages/LoginPage";
import { SignupPage } from "@/app/pages/SignupPage";
import { Dashboard } from "@/app/pages/Dashboard";
import { AIChat } from "@/app/pages/AIChat";
import { StudentSupport } from "@/app/pages/StudentSupport";
import { GovernmentSchemes } from "@/app/pages/GovernmentSchemes";
import { CareerGuidance } from "@/app/pages/CareerGuidance";
import { ProfilePage } from "@/app/pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "language", Component: LanguageSelection },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "dashboard", Component: Dashboard },
      { path: "chat", Component: AIChat },
      { path: "student-support", Component: StudentSupport },
      { path: "government-schemes", Component: GovernmentSchemes },
      { path: "career-guidance", Component: CareerGuidance },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
