import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Filter,
  Activity,
  Clock,
  UserPlus,
  FileText,
  CreditCard,
  Ban,
  CheckCircle2,
  XCircle,
  Video
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const AdminLogs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "All Users", href: "/admin/users" },
    { icon: Building2, label: "Recruiters", href: "/admin/recruiters" },
    { icon: Shield, label: "Verification", href: "/admin/verification" },
    { icon: Activity, label: "Activity Logs", href: "/admin/logs" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const activityLogs = [
    { id: 1, action: "New user registered", user: "john.doe@email.com", type: "user", time: "2 min ago", icon: UserPlus, color: "text-info" },
    { id: 2, action: "Recruiter verified", user: "TechStartup Inc.", type: "verification", time: "15 min ago", icon: CheckCircle2, color: "text-success" },
    { id: 3, action: "Job posted", user: "GlobalRecruiters", type: "job", time: "30 min ago", icon: FileText, color: "text-accent" },
    { id: 4, action: "Subscription upgraded", user: "HireFast LLC", type: "subscription", time: "1 hour ago", icon: CreditCard, color: "text-warning" },
    { id: 5, action: "Verification rejected", user: "SpamCompany Ltd.", type: "verification", time: "2 hours ago", icon: XCircle, color: "text-destructive" },
    { id: 6, action: "Interview completed", user: "TechFlow Inc.", type: "interview", time: "3 hours ago", icon: Video, color: "text-accent" },
    { id: 7, action: "Account suspended", user: "baduser@fake.com", type: "user", time: "4 hours ago", icon: Ban, color: "text-destructive" },
    { id: 8, action: "New recruiter registered", user: "StartupHub", type: "user", time: "5 hours ago", icon: UserPlus, color: "text-info" },
    { id: 9, action: "Job expired", user: "OldCompany", type: "job", time: "6 hours ago", icon: FileText, color: "text-muted-foreground" },
    { id: 10, action: "Password reset requested", user: "user@example.com", type: "user", time: "8 hours ago", icon: Shield, color: "text-warning" },
  ];

  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesType;
  });

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
          <span className="ml-auto px-2 py-0.5 rounded-full bg-destructive/20 text-destructive text-xs font-medium">
            Admin
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
            onClick={() => navigate("/admin/login")}
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
            <h1 className="text-xl font-display font-semibold text-foreground">Activity Logs</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground font-medium">
              AD
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search activity logs..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "All" },
                { value: "user", label: "Users" },
                { value: "verification", label: "Verification" },
                { value: "job", label: "Jobs" },
                { value: "interview", label: "Interviews" },
                { value: "subscription", label: "Subscriptions" },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={filterType === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Logs */}
          <div className="bg-card rounded-2xl border border-border">
            <div className="divide-y divide-border">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-secondary")}>
                    <log.icon className={cn("w-5 h-5", log.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{log.action}</p>
                    <p className="text-sm text-muted-foreground">{log.user}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                    <Clock className="w-4 h-4" />
                    {log.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLogs;
