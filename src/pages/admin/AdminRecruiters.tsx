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
  Eye,
  Ban,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const AdminRecruiters = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
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

  const recruiters = [
    { id: 1, company: "TechFlow Inc.", email: "hr@techflow.com", plan: "Premium", status: "verified", jobs: 12, interviews: 45, joined: "Oct 15, 2024" },
    { id: 2, company: "StartupLabs", email: "recruit@startuplabs.io", plan: "Standard", status: "verified", jobs: 8, interviews: 28, joined: "Nov 2, 2024" },
    { id: 3, company: "HireFast LLC", email: "contact@hirefast.com", plan: "Basic", status: "pending", jobs: 0, interviews: 0, joined: "Dec 18, 2024" },
    { id: 4, company: "GlobalRecruiters", email: "admin@globalrecruiters.com", plan: "Premium", status: "verified", jobs: 25, interviews: 120, joined: "Sep 5, 2024" },
    { id: 5, company: "TechStartup Inc.", email: "hr@techstartup.com", plan: "Standard", status: "pending", jobs: 0, interviews: 0, joined: "Dec 20, 2024" },
    { id: 6, company: "BadRecruiter Co.", email: "spam@badrecruiter.com", plan: "Basic", status: "suspended", jobs: 2, interviews: 0, joined: "Nov 10, 2024" },
  ];

  const filteredRecruiters = recruiters.filter(recruiter => {
    const matchesSearch = recruiter.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recruiter.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || recruiter.status === filterStatus;
    return matchesSearch && matchesStatus;
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
            <h1 className="text-xl font-display font-semibold text-foreground">Recruiter Management</h1>
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
                placeholder="Search recruiters..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {[
                { value: "all", label: "All" },
                { value: "verified", label: "Verified" },
                { value: "pending", label: "Pending" },
                { value: "suspended", label: "Suspended" },
              ].map((filter) => (
                <Button
                  key={filter.value}
                  variant={filterStatus === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Recruiters Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Company</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Plan</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Jobs</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Interviews</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredRecruiters.map((recruiter) => (
                    <tr key={recruiter.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{recruiter.company}</p>
                            <p className="text-sm text-muted-foreground">{recruiter.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex px-3 py-1 rounded-full text-xs font-medium",
                          recruiter.plan === "Premium" && "bg-accent/10 text-accent",
                          recruiter.plan === "Standard" && "bg-info/10 text-info",
                          recruiter.plan === "Basic" && "bg-muted text-muted-foreground"
                        )}>
                          {recruiter.plan}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                          recruiter.status === "verified" && "bg-success/10 text-success",
                          recruiter.status === "pending" && "bg-warning/10 text-warning",
                          recruiter.status === "suspended" && "bg-destructive/10 text-destructive"
                        )}>
                          {recruiter.status === "verified" && <CheckCircle2 className="w-3 h-3" />}
                          {recruiter.status === "pending" && <Clock className="w-3 h-3" />}
                          {recruiter.status === "suspended" && <XCircle className="w-3 h-3" />}
                          {recruiter.status.charAt(0).toUpperCase() + recruiter.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground">{recruiter.jobs}</td>
                      <td className="px-6 py-4 text-foreground">{recruiter.interviews}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-warning">
                            <Ban className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminRecruiters;
