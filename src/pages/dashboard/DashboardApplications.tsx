import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  LayoutDashboard, 
  Search, 
  FileText, 
  Video, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  Calendar,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardApplications = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Search, label: "Find Jobs", href: "/dashboard/jobs" },
    { icon: FileText, label: "Applications", href: "/dashboard/applications" },
    { icon: Video, label: "Interviews", href: "/dashboard/interviews" },
    { icon: BarChart3, label: "Performance", href: "/dashboard/performance" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const applications = [
    {
      id: 1,
      job: "Senior Frontend Developer",
      company: "TechFlow Inc.",
      appliedDate: "Dec 15, 2024",
      status: "interview_scheduled",
      statusLabel: "Interview Scheduled",
      interviewDate: "Dec 18, 2024 at 2:00 PM"
    },
    {
      id: 2,
      job: "Product Manager",
      company: "StartupLabs",
      appliedDate: "Dec 12, 2024",
      status: "under_review",
      statusLabel: "Under Review"
    },
    {
      id: 3,
      job: "UX Designer",
      company: "DesignCo",
      appliedDate: "Dec 10, 2024",
      status: "applied",
      statusLabel: "Applied"
    },
    {
      id: 4,
      job: "Data Scientist",
      company: "DataDriven Corp",
      appliedDate: "Dec 8, 2024",
      status: "shortlisted",
      statusLabel: "Shortlisted"
    },
    {
      id: 5,
      job: "Backend Developer",
      company: "CloudScale",
      appliedDate: "Dec 5, 2024",
      status: "rejected",
      statusLabel: "Not Selected"
    },
    {
      id: 6,
      job: "DevOps Engineer",
      company: "TechStartup Inc.",
      appliedDate: "Dec 1, 2024",
      status: "offer",
      statusLabel: "Offer Received"
    }
  ];

  const statusFilters = [
    { value: "all", label: "All", count: applications.length },
    { value: "applied", label: "Applied", count: applications.filter(a => a.status === "applied").length },
    { value: "under_review", label: "Under Review", count: applications.filter(a => a.status === "under_review").length },
    { value: "shortlisted", label: "Shortlisted", count: applications.filter(a => a.status === "shortlisted").length },
    { value: "interview_scheduled", label: "Interview", count: applications.filter(a => a.status === "interview_scheduled").length },
    { value: "offer", label: "Offers", count: applications.filter(a => a.status === "offer").length },
    { value: "rejected", label: "Rejected", count: applications.filter(a => a.status === "rejected").length }
  ];

  const filteredApplications = filter === "all" 
    ? applications 
    : applications.filter(a => a.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied": return Clock;
      case "under_review": return Eye;
      case "shortlisted": return CheckCircle2;
      case "interview_scheduled": return Calendar;
      case "offer": return CheckCircle2;
      case "rejected": return XCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied": return "bg-info/10 text-info";
      case "under_review": return "bg-warning/10 text-warning";
      case "shortlisted": return "bg-accent/10 text-accent";
      case "interview_scheduled": return "bg-accent/10 text-accent";
      case "offer": return "bg-success/10 text-success";
      case "rejected": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center gap-2 px-6 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-display font-bold text-sidebar-foreground">
            Job<span className="text-sidebar-primary">Shob</span>
          </span>
        </div>

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

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:ml-64">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-secondary rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-display font-semibold text-foreground">My Applications</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
              JD
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  filter === f.value
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {f.label}
                <span className="ml-2 px-2 py-0.5 rounded-full bg-background/50 text-xs">
                  {f.count}
                </span>
              </button>
            ))}
          </div>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((app) => {
              const StatusIcon = getStatusIcon(app.status);
              return (
                <div
                  key={app.id}
                  className="bg-card rounded-2xl border border-border p-6 hover:border-accent/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <Building2 className="w-7 h-7 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display font-semibold text-lg text-foreground">
                            {app.job}
                          </h3>
                          <p className="text-muted-foreground">{app.company}</p>
                        </div>
                        <span className={cn(
                          "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium shrink-0",
                          getStatusColor(app.status)
                        )}>
                          <StatusIcon className="w-4 h-4" />
                          {app.statusLabel}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Applied: {app.appliedDate}
                        </span>
                        {app.interviewDate && (
                          <span className="flex items-center gap-1 text-accent">
                            <Calendar className="w-4 h-4" />
                            Interview: {app.interviewDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                    <Link to={`/jobs/${app.id}`}>
                      <Button variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View Job
                      </Button>
                    </Link>
                    {app.status === "interview_scheduled" && (
                      <Link to={`/interview/${app.id}`}>
                        <Button variant="accent" className="gap-2">
                          <Video className="w-4 h-4" />
                          Join Interview
                        </Button>
                      </Link>
                    )}
                    {app.status === "offer" && (
                      <Button variant="success" className="gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        View Offer
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">No applications found</h3>
              <p className="text-muted-foreground mb-4">
                {filter === "all" 
                  ? "You haven't applied to any jobs yet."
                  : `No applications with status "${filter}".`
                }
              </p>
              <Link to="/jobs">
                <Button variant="accent">Browse Jobs</Button>
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardApplications;