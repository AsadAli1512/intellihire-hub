import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
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
import DashboardJobs from "./pages/dashboard/DashboardJobs";
import DashboardApplications from "./pages/dashboard/DashboardApplications";
import DashboardInterviews from "./pages/dashboard/DashboardInterviews";
import DashboardPerformance from "./pages/dashboard/DashboardPerformance";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVerification from "./pages/admin/AdminVerification";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminRecruiters from "./pages/admin/AdminRecruiters";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
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
            {/* Candidate Dashboard Routes */}
            <Route path="/dashboard" element={<CandidateDashboard />} />
            <Route path="/dashboard/jobs" element={<DashboardJobs />} />
            <Route path="/dashboard/applications" element={<DashboardApplications />} />
            <Route path="/dashboard/interviews" element={<DashboardInterviews />} />
            <Route path="/dashboard/performance" element={<DashboardPerformance />} />
            <Route path="/dashboard/settings" element={<DashboardSettings />} />
            <Route path="/dashboard/profile" element={<DashboardProfile />} />
            {/* Recruiter Dashboard Routes */}
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/recruiter/jobs" element={<RecruiterDashboard />} />
            <Route path="/recruiter/jobs/new" element={<PostJob />} />
            <Route path="/recruiter/candidates" element={<Candidates />} />
            <Route path="/recruiter/interviews" element={<DashboardInterviews />} />
            <Route path="/recruiter/reports" element={<Reports />} />
            <Route path="/recruiter/settings" element={<Settings />} />
            {/* Admin Dashboard Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/recruiters" element={<AdminRecruiters />} />
            <Route path="/admin/verification" element={<AdminVerification />} />
            <Route path="/admin/logs" element={<AdminLogs />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
