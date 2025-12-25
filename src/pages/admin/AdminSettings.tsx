import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  Save,
  Mail,
  Lock,
  Globe,
  CreditCard,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const AdminSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    siteName: "JobShob",
    siteEmail: "admin@jobshob.com",
    emailNotifications: true,
    maintenanceMode: false,
    autoApproveRecruiters: false,
    maxJobsPerRecruiter: "25",
    interviewDuration: "30",
  });

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "All Users", href: "/admin/users" },
    { icon: Building2, label: "Recruiters", href: "/admin/recruiters" },
    { icon: Shield, label: "Verification", href: "/admin/verification" },
    { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
    { icon: Activity, label: "Activity Logs", href: "/admin/logs" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const subscriptionPlans = [
    { name: "Basic", price: "$29", interviews: 10 },
    { name: "Standard", price: "$79", interviews: 50 },
    { name: "Premium", price: "$199", interviews: "Unlimited" },
  ];

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
            <h1 className="text-xl font-display font-semibold text-foreground">System Settings</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="accent" size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
            <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground font-medium">
              AD
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* General Settings */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">General Settings</h3>
                <p className="text-sm text-muted-foreground">Configure basic platform settings</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteEmail">Admin Email</Label>
                <Input
                  id="siteEmail"
                  type="email"
                  value={settings.siteEmail}
                  onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Platform Settings */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-info" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Platform Settings</h3>
                <p className="text-sm text-muted-foreground">Configure platform behavior</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Send email notifications for important events</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Auto-Approve Recruiters</p>
                  <p className="text-sm text-muted-foreground">Skip manual verification for new recruiters</p>
                </div>
                <Switch
                  checked={settings.autoApproveRecruiters}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoApproveRecruiters: checked })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                <div className="space-y-2">
                  <Label htmlFor="maxJobs">Max Jobs per Recruiter (Basic Plan)</Label>
                  <Input
                    id="maxJobs"
                    type="number"
                    value={settings.maxJobsPerRecruiter}
                    onChange={(e) => setSettings({ ...settings, maxJobsPerRecruiter: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewDuration">Default Interview Duration (minutes)</Label>
                  <Input
                    id="interviewDuration"
                    type="number"
                    value={settings.interviewDuration}
                    onChange={(e) => setSettings({ ...settings, interviewDuration: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Plans */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">Subscription Plans</h3>
                  <p className="text-sm text-muted-foreground">Manage recruiter subscription tiers</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit Plans</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {subscriptionPlans.map((plan) => (
                <div key={plan.name} className="p-4 rounded-xl bg-secondary/50 border border-border">
                  <h4 className="font-display font-semibold text-foreground">{plan.name}</h4>
                  <p className="text-2xl font-display font-bold text-accent mt-2">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <p className="text-sm text-muted-foreground mt-2">{plan.interviews} AI interviews</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;
