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
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Ban,
  Trash2,
  Eye,
  Activity,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const AdminUsers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "All Users", href: "/admin/users" },
    { icon: Building2, label: "Recruiters", href: "/admin/recruiters" },
    { icon: Shield, label: "Verification", href: "/admin/verification" },
    { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
    { icon: Activity, label: "Activity Logs", href: "/admin/logs" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234-567-8900", role: "candidate", status: "active", joined: "Dec 10, 2024" },
    { id: 2, name: "Sarah Smith", email: "sarah@techflow.com", phone: "+1 234-567-8901", role: "recruiter", status: "active", joined: "Dec 8, 2024" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+1 234-567-8902", role: "candidate", status: "suspended", joined: "Dec 5, 2024" },
    { id: 4, name: "Emily Chen", email: "emily@startup.io", phone: "+1 234-567-8903", role: "recruiter", status: "pending", joined: "Dec 3, 2024" },
    { id: 5, name: "Alex Thompson", email: "alex@example.com", phone: "+1 234-567-8904", role: "candidate", status: "active", joined: "Dec 1, 2024" },
    { id: 6, name: "Lisa Wang", email: "lisa@enterprise.com", phone: "+1 234-567-8905", role: "recruiter", status: "active", joined: "Nov 28, 2024" },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
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
            <h1 className="text-xl font-display font-semibold text-foreground">User Management</h1>
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
                placeholder="Search users by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterRole === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRole("all")}
              >
                All Users
              </Button>
              <Button
                variant={filterRole === "candidate" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRole("candidate")}
              >
                Candidates
              </Button>
              <Button
                variant={filterRole === "recruiter" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRole("recruiter")}
              >
                Recruiters
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Contact</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Joined</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                            <span className="text-sm font-medium text-accent">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="w-4 h-4" />
                            {user.phone}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize",
                          user.role === "candidate" && "bg-info/10 text-info",
                          user.role === "recruiter" && "bg-accent/10 text-accent"
                        )}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize",
                          user.status === "active" && "bg-success/10 text-success",
                          user.status === "pending" && "bg-warning/10 text-warning",
                          user.status === "suspended" && "bg-destructive/10 text-destructive"
                        )}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {user.joined}
                        </span>
                      </td>
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

export default AdminUsers;
