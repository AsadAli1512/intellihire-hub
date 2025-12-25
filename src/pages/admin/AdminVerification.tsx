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
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  Eye,
  Clock,
  Activity,
  CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

const AdminVerification = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const pendingVerifications = [
    { 
      id: 1, 
      company: "TechStartup Inc.", 
      email: "hr@techstartup.com",
      ntn: "1234567-8",
      submitted: "2 hours ago",
      documents: [
        { name: "Business Registration.pdf", size: "2.4 MB" },
        { name: "NTN Certificate.pdf", size: "1.2 MB" },
        { name: "Company Profile.pdf", size: "3.8 MB" }
      ]
    },
    { 
      id: 2, 
      company: "GlobalRecruiters", 
      email: "admin@globalrecruiters.com",
      ntn: "8765432-1",
      submitted: "5 hours ago",
      documents: [
        { name: "License.pdf", size: "1.8 MB" },
        { name: "Tax Certificate.pdf", size: "0.9 MB" }
      ]
    },
    { 
      id: 3, 
      company: "HireFast LLC", 
      email: "contact@hirefast.com",
      ntn: "5678901-2",
      submitted: "1 day ago",
      documents: [
        { name: "Registration Certificate.pdf", size: "2.1 MB" },
        { name: "NTN Document.pdf", size: "1.5 MB" },
        { name: "Authorization Letter.pdf", size: "0.8 MB" },
        { name: "Bank Statement.pdf", size: "4.2 MB" }
      ]
    },
  ];

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
              {link.label === "Verification" && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-warning text-warning-foreground text-xs">
                  {pendingVerifications.length}
                </span>
              )}
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
            <h1 className="text-xl font-display font-semibold text-foreground">Recruiter Verification</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-destructive flex items-center justify-center text-destructive-foreground font-medium">
              AD
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <span className="text-3xl font-display font-bold text-foreground">{pendingVerifications.length}</span>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <span className="text-3xl font-display font-bold text-foreground">156</span>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <span className="text-3xl font-display font-bold text-foreground">12</span>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Verifications */}
          <div className="space-y-4">
            {pendingVerifications.map((verification) => (
              <div key={verification.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-7 h-7 text-warning" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-foreground text-lg">{verification.company}</h3>
                        <p className="text-sm text-muted-foreground">{verification.email}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-muted-foreground">NTN: {verification.ntn}</span>
                          <span className="text-xs text-muted-foreground">Submitted {verification.submitted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setExpandedCard(expandedCard === verification.id ? null : verification.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {expandedCard === verification.id ? "Hide" : "View"} Documents
                      </Button>
                      <Button variant="success" size="sm" className="gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm" className="gap-2">
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                {expandedCard === verification.id && (
                  <div className="border-t border-border bg-secondary/30 p-6">
                    <h4 className="text-sm font-medium text-foreground mb-4">Uploaded Documents</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {verification.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">{doc.size}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminVerification;
