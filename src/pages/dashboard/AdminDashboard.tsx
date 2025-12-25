import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  LayoutDashboard, 
  Users, 
  Building2, 
  Shield, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Activity,
  CreditCard
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Building2, label: "Recruiters", href: "/admin/recruiters" },
    { icon: Shield, label: "Verification", href: "/admin/verification" },
    { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
    { icon: Activity, label: "Activity Logs", href: "/admin/logs" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const stats = [
    { label: "Total Users", value: "12,459", icon: Users, color: "text-info", bgColor: "bg-info/10", trend: "+12%", trendUp: true },
    { label: "Active Recruiters", value: "856", icon: Building2, color: "text-accent", bgColor: "bg-accent/10", trend: "+8%", trendUp: true },
    { label: "Pending Verifications", value: "23", icon: Shield, color: "text-warning", bgColor: "bg-warning/10", trend: "-5%", trendUp: false },
    { label: "Total Interviews", value: "45,231", icon: FileText, color: "text-success", bgColor: "bg-success/10", trend: "+24%", trendUp: true },
  ];

  const pendingVerifications = [
    { id: 1, company: "TechStartup Inc.", email: "hr@techstartup.com", submitted: "2 hours ago", documents: 3 },
    { id: 2, company: "GlobalRecruiters", email: "admin@globalrecruiters.com", submitted: "5 hours ago", documents: 2 },
    { id: 3, company: "HireFast LLC", email: "contact@hirefast.com", submitted: "1 day ago", documents: 4 },
  ];

  const recentActivity = [
    { id: 1, action: "New recruiter registered", user: "TechStartup Inc.", time: "2 min ago", type: "info" },
    { id: 2, action: "Verification approved", user: "DataDriven Corp", time: "15 min ago", type: "success" },
    { id: 3, action: "Subscription upgraded", user: "HireRight Solutions", time: "1 hour ago", type: "success" },
    { id: 4, action: "Document rejected", user: "QuickHire Co", time: "2 hours ago", type: "warning" },
    { id: 5, action: "Account suspended", user: "SpamRecruiter", time: "3 hours ago", type: "error" },
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
          <span className="ml-auto px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs font-medium">
            Admin
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
              {link.label === "Verification" && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-warning text-warning-foreground text-xs">
                  23
                </span>
              )}
            </Link>
          ))}
        </nav>

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
            <h1 className="text-xl font-display font-semibold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground font-medium">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bgColor)}>
                    <stat.icon className={cn("w-6 h-6", stat.color)} />
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    stat.trendUp ? "text-success" : "text-destructive"
                  )}>
                    {stat.trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.trend}
                  </div>
                </div>
                <span className="text-3xl font-display font-bold text-foreground">{stat.value}</span>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Verifications */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-semibold text-foreground">Pending Verifications</h3>
                  <span className="px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-medium">
                    {pendingVerifications.length} new
                  </span>
                </div>
                <Link to="/admin/verification" className="text-sm text-accent hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {pendingVerifications.map((verification) => (
                  <div key={verification.id} className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-warning" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{verification.company}</p>
                      <p className="text-sm text-muted-foreground">{verification.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{verification.submitted}</p>
                      <p className="text-xs text-muted-foreground">{verification.documents} docs</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="success" className="gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" className="gap-1">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-semibold text-foreground">Recent Activity</h3>
                <Link to="/admin/logs" className="text-sm text-accent hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className={cn(
                      "w-2 h-2 rounded-full mt-2 shrink-0",
                      activity.type === "info" && "bg-info",
                      activity.type === "success" && "bg-success",
                      activity.type === "warning" && "bg-warning",
                      activity.type === "error" && "bg-destructive"
                    )} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alert */}
          <div className="mt-8 p-4 rounded-2xl bg-warning/10 border border-warning/20 flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">23 recruiters pending verification</p>
              <p className="text-sm text-muted-foreground">
                Review and approve recruiter documents to allow them to post jobs.
              </p>
            </div>
            <Link to="/admin/verification" className="shrink-0">
              <Button variant="outline" size="sm">
                Review Now
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
