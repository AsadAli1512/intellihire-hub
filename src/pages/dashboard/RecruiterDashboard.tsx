import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Video, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  Plus,
  Clock,
  CheckCircle2,
  Eye,
  Calendar,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const RecruiterDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/recruiter" },
    { icon: FileText, label: "Job Postings", href: "/recruiter/jobs" },
    { icon: Users, label: "Candidates", href: "/recruiter/candidates" },
    { icon: Video, label: "Interviews", href: "/recruiter/interviews" },
    { icon: BarChart3, label: "Reports", href: "/recruiter/reports" },
    { icon: Settings, label: "Settings", href: "/recruiter/settings" },
  ];

  const stats = [
    { label: "Active Jobs", value: "8", icon: FileText, color: "text-info", bgColor: "bg-info/10", trend: "+2 this week" },
    { label: "Total Applicants", value: "142", icon: Users, color: "text-accent", bgColor: "bg-accent/10", trend: "+23 this week" },
    { label: "Interviews Today", value: "5", icon: Video, color: "text-warning", bgColor: "bg-warning/10", trend: "2 completed" },
    { label: "Hires This Month", value: "3", icon: CheckCircle2, color: "text-success", bgColor: "bg-success/10", trend: "75% success" },
  ];

  const recentApplicants = [
    { id: 1, name: "John Doe", job: "Senior Frontend Developer", score: 92, status: "Interview Completed" },
    { id: 2, name: "Jane Smith", job: "Product Manager", score: 88, status: "Pending Interview" },
    { id: 3, name: "Mike Johnson", job: "UX Designer", score: 85, status: "Under Review" },
    { id: 4, name: "Sarah Williams", job: "Data Scientist", score: 90, status: "Interview Scheduled" },
  ];

  const todayInterviews = [
    { id: 1, candidate: "John Doe", job: "Senior Frontend Developer", time: "10:00 AM", status: "Completed" },
    { id: 2, candidate: "Emily Chen", job: "Product Manager", time: "2:00 PM", status: "Upcoming" },
    { id: 3, candidate: "Alex Thompson", job: "DevOps Engineer", time: "4:00 PM", status: "Upcoming" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-display font-bold text-sidebar-foreground">
            Job<span className="text-sidebar-primary">Shob</span>
          </span>
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Subscription Badge */}
        <div className="absolute bottom-20 left-4 right-4">
          <div className="p-4 rounded-xl bg-sidebar-accent border border-sidebar-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-sidebar-primary">PRO PLAN</span>
              <TrendingUp className="w-4 h-4 text-sidebar-primary" />
            </div>
            <p className="text-xs text-sidebar-foreground/70">15/25 AI interviews used</p>
            <div className="mt-2 h-1.5 bg-sidebar-border rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-sidebar-primary rounded-full" />
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-display font-semibold text-foreground">Recruiter Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/recruiter/jobs/new">
              <Button variant="accent" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Post Job
              </Button>
            </Link>
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
              TF
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Welcome back, TechFlow! 👋
            </h2>
            <p className="text-muted-foreground">
              Here's your hiring overview for today.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor)}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <span className="text-3xl font-display font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-xs text-accent mt-1">{stat.trend}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Interviews */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground">Today's Interviews</h3>
                <Link to="/recruiter/interviews" className="text-sm text-accent hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {todayInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-accent">
                        {interview.candidate.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{interview.candidate}</p>
                      <p className="text-sm text-muted-foreground">{interview.job}</p>
                    </div>
                    <div className="text-right">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {interview.time}
                      </span>
                      <span className={cn(
                        "inline-block px-2 py-0.5 rounded-full text-xs font-medium mt-1",
                        interview.status === "Completed" && "bg-success/10 text-success",
                        interview.status === "Upcoming" && "bg-warning/10 text-warning"
                      )}>
                        {interview.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Candidates */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground">Top Candidates</h3>
                <Link to="/recruiter/candidates" className="text-sm text-accent hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentApplicants.map((applicant, index) => (
                  <div key={applicant.id} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-accent">
                        {applicant.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{applicant.name}</p>
                      <p className="text-sm text-muted-foreground">{applicant.job}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-display font-bold text-accent">{applicant.score}</span>
                        <span className="text-xs text-muted-foreground">/ 100</span>
                      </div>
                      <span className={cn(
                        "inline-block px-2 py-0.5 rounded-full text-xs font-medium",
                        applicant.status === "Interview Completed" && "bg-success/10 text-success",
                        applicant.status === "Interview Scheduled" && "bg-accent/10 text-accent",
                        applicant.status === "Pending Interview" && "bg-warning/10 text-warning",
                        applicant.status === "Under Review" && "bg-info/10 text-info"
                      )}>
                        {applicant.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/recruiter/jobs/new"
              className="flex items-center gap-4 p-6 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent-foreground/20 flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display font-semibold">Post New Job</p>
                <p className="text-sm opacity-80">Create a job listing</p>
              </div>
            </Link>
            <Link
              to="/recruiter/candidates"
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">View Candidates</p>
                <p className="text-sm text-muted-foreground">142 total applicants</p>
              </div>
            </Link>
            <Link
              to="/recruiter/reports"
              className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="font-display font-semibold text-foreground">Download Reports</p>
                <p className="text-sm text-muted-foreground">Export merit lists</p>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
