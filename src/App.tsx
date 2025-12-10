import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Applications from "./pages/Applications";
import Interview from "./pages/Interview";
import Reports from "./pages/Reports";
import ScheduleInterview from "./pages/ScheduleInterview";
import Subscriptions from "./pages/Subscriptions";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PostJob from "./pages/PostJob";
import Candidates from "./pages/Candidates";
import CandidateDashboard from "./pages/dashboard/CandidateDashboard";
import RecruiterDashboard from "./pages/dashboard/RecruiterDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/apply/:id" element={<ApplyJob />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/interview/:id" element={<Interview />} />
          <Route path="/reports/:id" element={<Reports />} />
          <Route path="/schedule/:id" element={<ScheduleInterview />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/dashboard" element={<CandidateDashboard />} />
          <Route path="/recruiter" element={<RecruiterDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
