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
  Menu,
  Activity,
  CreditCard,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Plus,
  DollarSign,
  TrendingUp
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

const AdminSubscriptions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Building2, label: "Recruiters", href: "/admin/recruiters" },
    { icon: Shield, label: "Verification", href: "/admin/verification" },
    { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
    { icon: Activity, label: "Activity Logs", href: "/admin/logs" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const plans = [
    {
      id: 1,
      name: "Basic",
      price: 49,
      billing: "monthly",
      activeSubscribers: 245,
      revenue: 12005,
      features: ["5 jobs/mo", "10 interviews/mo"]
    },
    {
      id: 2,
      name: "Advanced",
      price: 99,
      billing: "monthly",
      activeSubscribers: 156,
      revenue: 15444,
      features: ["25 jobs/mo", "50 interviews/mo"]
    },
    {
      id: 3,
      name: "Premium",
      price: 199,
      billing: "monthly",
      activeSubscribers: 78,
      revenue: 15522,
      features: ["Unlimited jobs", "Unlimited interviews"]
    }
  ];

  const recentTransactions = [
    { id: 1, recruiter: "TechFlow Inc.", plan: "Premium", amount: 199, date: "Dec 20, 2024", status: "Completed" },
    { id: 2, recruiter: "StartupLabs", plan: "Advanced", amount: 99, date: "Dec 19, 2024", status: "Completed" },
    { id: 3, recruiter: "HireRight Solutions", plan: "Basic", amount: 49, date: "Dec 18, 2024", status: "Completed" },
    { id: 4, recruiter: "GlobalRecruiters", plan: "Advanced", amount: 99, date: "Dec 17, 2024", status: "Refunded" },
    { id: 5, recruiter: "DataDriven Corp", plan: "Premium", amount: 199, date: "Dec 16, 2024", status: "Completed" },
  ];

  const totalRevenue = plans.reduce((sum, plan) => sum + plan.revenue, 0);
  const totalSubscribers = plans.reduce((sum, plan) => sum + plan.activeSubscribers, 0);

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
            <h1 className="text-xl font-display font-semibold text-foreground">Subscription Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground font-medium">
              AD
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <span className="text-3xl font-display font-bold text-foreground">${totalRevenue.toLocaleString()}</span>
              <p className="text-sm text-muted-foreground mt-1">Monthly Revenue</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
              <span className="text-3xl font-display font-bold text-foreground">{totalSubscribers}</span>
              <p className="text-sm text-muted-foreground mt-1">Active Subscribers</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-info" />
                </div>
              </div>
              <span className="text-3xl font-display font-bold text-foreground">3</span>
              <p className="text-sm text-muted-foreground mt-1">Active Plans</p>
            </div>
          </div>

          {/* Plans */}
          <div className="bg-card rounded-2xl border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-foreground">Subscription Plans</h2>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Plan
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <div key={plan.id} className="p-4 rounded-xl border border-border bg-secondary/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-semibold text-foreground">{plan.name}</h3>
                    <button className="p-1 hover:bg-secondary rounded">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-display font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground text-sm">/{plan.billing}</span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <p key={index} className="text-sm text-muted-foreground">• {feature}</p>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subscribers</span>
                      <span className="font-medium text-foreground">{plan.activeSubscribers}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-muted-foreground">Revenue</span>
                      <span className="font-medium text-success">${plan.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 gap-1">
                      <Edit className="w-3 h-3" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-semibold text-foreground">Recent Transactions</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Recruiter</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Plan</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border hover:bg-secondary/50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-foreground">{tx.recruiter}</span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{tx.plan}</td>
                      <td className="py-3 px-4 font-medium text-foreground">${tx.amount}</td>
                      <td className="py-3 px-4 text-muted-foreground">{tx.date}</td>
                      <td className="py-3 px-4">
                        <span className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          tx.status === "Completed" && "bg-success/10 text-success",
                          tx.status === "Refunded" && "bg-warning/10 text-warning"
                        )}>
                          {tx.status}
                        </span>
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

export default AdminSubscriptions;
