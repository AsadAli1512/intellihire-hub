import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ThemeToggle from "@/components/ThemeToggle";
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
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  Upload,
  CreditCard,
  Shield,
  Key,
  TrendingUp,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const RecruiterSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/recruiter" },
    { icon: FileText, label: "Job Postings", href: "/recruiter/jobs" },
    { icon: Users, label: "Candidates", href: "/recruiter/candidates" },
    { icon: Video, label: "Interviews", href: "/recruiter/interviews" },
    { icon: BarChart3, label: "Reports", href: "/recruiter/reports" },
    { icon: CreditCard, label: "Subscription", href: "/recruiter/subscriptions" },
    { icon: Settings, label: "Settings", href: "/recruiter/settings" },
  ];

  const [settings, setSettings] = useState({
    companyName: "TechFlow Inc.",
    email: "hr@techflow.com",
    phone: "+1 (555) 123-4567",
    website: "https://techflow.com",
    address: "123 Tech Street, San Francisco, CA 94102",
    description: "TechFlow is a leading technology company specializing in innovative software solutions.",
    ntnNumber: "12-3456789",
    emailNotifications: true,
    smsNotifications: false,
    interviewReminders: true,
    weeklyReports: true,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
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
            <h1 className="text-xl font-display font-semibold text-foreground">Settings</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
              TF
            </div>
          </div>
        </header>

        <main className="p-6">
          <Tabs defaultValue="company" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Company Profile */}
            <TabsContent value="company">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-accent" />
                    Company Profile
                  </CardTitle>
                  <CardDescription>Manage your company information and branding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Logo */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="https://ui-avatars.com/api/?name=TechFlow&background=0d9488&color=fff&size=80" />
                      <AvatarFallback>TF</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" /> Upload Logo
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 2MB</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="companyName"
                          value={settings.companyName}
                          onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ntnNumber">NTN Number</Label>
                      <Input
                        id="ntnNumber"
                        value={settings.ntnNumber}
                        onChange={(e) => setSettings({ ...settings, ntnNumber: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="website"
                          value={settings.website}
                          onChange={(e) => setSettings({ ...settings, website: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={settings.address}
                          onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      value={settings.description}
                      onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-accent" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Configure how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive urgent updates via SMS</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div>
                      <p className="font-medium">Interview Reminders</p>
                      <p className="text-sm text-muted-foreground">Get notified before interviews</p>
                    </div>
                    <Switch
                      checked={settings.interviewReminders}
                      onCheckedChange={(checked) => setSettings({ ...settings, interviewReminders: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div>
                      <p className="font-medium">Weekly Reports</p>
                      <p className="text-sm text-muted-foreground">Receive weekly hiring analytics</p>
                    </div>
                    <Switch
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) => setSettings({ ...settings, weeklyReports: checked })}
                    />
                  </div>

                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" /> Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription */}
            <TabsContent value="subscription">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-accent" />
                    Subscription Plan
                  </CardTitle>
                  <CardDescription>Manage your subscription and billing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 rounded-xl border-2 border-accent bg-accent/5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-display font-bold">Pro Plan</h3>
                        <p className="text-muted-foreground">$99/month</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium">
                        Current Plan
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">✓ 25 AI interviews/month</li>
                      <li className="flex items-center gap-2">✓ Unlimited job postings</li>
                      <li className="flex items-center gap-2">✓ Advanced analytics</li>
                      <li className="flex items-center gap-2">✓ Priority support</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Link to="/subscriptions">
                      <Button variant="outline">Upgrade Plan</Button>
                    </Link>
                    <Button variant="ghost">Cancel Subscription</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" className="pl-10" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm Password</Label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>

                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" /> Update Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default RecruiterSettings;
