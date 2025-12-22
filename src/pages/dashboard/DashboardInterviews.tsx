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
  Calendar,
  Building2,
  Play,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardInterviews = () => {
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

  const interviews = [
    {
      id: 1,
      job: "Senior Frontend Developer",
      company: "TechFlow Inc.",
      date: "Dec 18, 2024",
      time: "2:00 PM PST",
      duration: "30 mins",
      status: "upcoming",
      type: "AI Interview"
    },
    {
      id: 2,
      job: "Product Manager",
      company: "StartupLabs",
      date: "Dec 20, 2024",
      time: "10:00 AM PST",
      duration: "45 mins",
      status: "upcoming",
      type: "AI Interview"
    },
    {
      id: 3,
      job: "Data Scientist",
      company: "DataDriven Corp",
      date: "Dec 10, 2024",
      time: "3:00 PM PST",
      duration: "30 mins",
      status: "completed",
      type: "AI Interview",
      score: 88
    },
    {
      id: 4,
      job: "DevOps Engineer",
      company: "CloudScale",
      date: "Dec 5, 2024",
      time: "11:00 AM PST",
      duration: "30 mins",
      status: "completed",
      type: "AI Interview",
      score: 92
    }
  ];

  const statusFilters = [
    { value: "all", label: "All Interviews", count: interviews.length },
    { value: "upcoming", label: "Upcoming", count: interviews.filter(i => i.status === "upcoming").length },
    { value: "completed", label: "Completed", count: interviews.filter(i => i.status === "completed").length }
  ];

  const filteredInterviews = filter === "all" 
    ? interviews 
    : interviews.filter(i => i.status === filter);

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
            <h1 className="text-xl font-display font-semibold text-foreground">My Interviews</h1>
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
          {/* Info Banner */}
          <div className="mb-8 p-4 rounded-2xl bg-accent/10 border border-accent/20">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Video className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">AI-Powered Interviews</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI interviewer will conduct your interview. Make sure you have a stable internet connection, 
                  working camera and microphone. Join 5 minutes before your scheduled time.
                </p>
              </div>
            </div>
          </div>

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

          {/* Interviews List */}
          <div className="space-y-4">
            {filteredInterviews.map((interview) => (
              <div
                key={interview.id}
                className={cn(
                  "bg-card rounded-2xl border p-6 transition-colors",
                  interview.status === "upcoming" 
                    ? "border-accent/50 hover:border-accent" 
                    : "border-border hover:border-accent/50"
                )}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
                    interview.status === "upcoming" ? "bg-accent" : "bg-success/10"
                  )}>
                    {interview.status === "upcoming" ? (
                      <Video className="w-7 h-7 text-accent-foreground" />
                    ) : (
                      <CheckCircle2 className="w-7 h-7 text-success" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground">
                          {interview.job}
                        </h3>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          {interview.company}
                        </p>
                      </div>
                      <span className={cn(
                        "px-3 py-1.5 rounded-full text-sm font-medium shrink-0",
                        interview.status === "upcoming" 
                          ? "bg-accent/10 text-accent" 
                          : "bg-success/10 text-success"
                      )}>
                        {interview.status === "upcoming" ? "Upcoming" : "Completed"}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {interview.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {interview.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        {interview.duration}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-info/10 text-info text-xs font-medium">
                        {interview.type}
                      </span>
                    </div>

                    {interview.score !== undefined && (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Score:</span>
                        <span className="text-2xl font-display font-bold text-accent">{interview.score}</span>
                        <span className="text-sm text-muted-foreground">/ 100</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                  {interview.status === "upcoming" ? (
                    <>
                      <Link to={`/interview/${interview.id}`} className="flex-1">
                        <Button variant="accent" className="w-full gap-2">
                          <Play className="w-4 h-4" />
                          Join Interview
                        </Button>
                      </Link>
                      <Button variant="outline" className="gap-2">
                        <RotateCcw className="w-4 h-4" />
                        Reschedule
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to={`/reports/${interview.id}`} className="flex-1">
                        <Button variant="outline" className="w-full gap-2">
                          <BarChart3 className="w-4 h-4" />
                          View Report
                        </Button>
                      </Link>
                      <Link to={`/jobs/${interview.id}`}>
                        <Button variant="ghost" className="gap-2">
                          View Job
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredInterviews.length === 0 && (
            <div className="text-center py-12">
              <Video className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">No interviews found</h3>
              <p className="text-muted-foreground mb-4">
                {filter === "all" 
                  ? "You don't have any interviews scheduled."
                  : `No ${filter} interviews.`
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

export default DashboardInterviews;