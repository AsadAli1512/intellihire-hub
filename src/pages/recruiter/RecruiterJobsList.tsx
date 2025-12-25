import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Plus,
  Search,
  MapPin,
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  TrendingUp,
  Calendar,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const RecruiterJobsList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      status: "active",
      applicants: 45,
      interviews: 12,
      postedDate: "Dec 1, 2024",
      slots: ["9:00 AM", "2:00 PM", "4:00 PM"],
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      status: "active",
      applicants: 32,
      interviews: 8,
      postedDate: "Dec 5, 2024",
      slots: ["10:00 AM", "3:00 PM"],
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "New York, NY",
      type: "Full-time",
      status: "paused",
      applicants: 28,
      interviews: 5,
      postedDate: "Nov 28, 2024",
      slots: ["11:00 AM", "1:00 PM", "5:00 PM"],
    },
    {
      id: 4,
      title: "Backend Engineer",
      department: "Engineering",
      location: "Austin, TX",
      type: "Contract",
      status: "closed",
      applicants: 56,
      interviews: 15,
      postedDate: "Nov 15, 2024",
      slots: [],
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/10 text-success border-success/20">Active</Badge>;
      case "paused":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Paused</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    active: jobs.filter((j) => j.status === "active").length,
    paused: jobs.filter((j) => j.status === "paused").length,
    closed: jobs.filter((j) => j.status === "closed").length,
    total: jobs.length,
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
            <h1 className="text-xl font-display font-semibold text-foreground">Job Postings</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/recruiter/jobs/new">
              <Button variant="accent" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Post Job
              </Button>
            </Link>
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
              TF
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-3xl font-display font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Jobs</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-3xl font-display font-bold text-success">{stats.active}</p>
                <p className="text-sm text-muted-foreground">Active</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-3xl font-display font-bold text-warning">{stats.paused}</p>
                <p className="text-sm text-muted-foreground">Paused</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <p className="text-3xl font-display font-bold text-muted-foreground">{stats.closed}</p>
                <p className="text-sm text-muted-foreground">Closed</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="border-border/50 hover:border-accent/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" /> {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" /> Posted {job.postedDate}
                        </span>
                      </div>
                      {job.slots.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-muted-foreground">Interview Slots:</span>
                          {job.slots.map((slot, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex gap-6 text-center">
                        <div>
                          <p className="text-2xl font-display font-bold text-accent">{job.applicants}</p>
                          <p className="text-xs text-muted-foreground">Applicants</p>
                        </div>
                        <div>
                          <p className="text-2xl font-display font-bold text-info">{job.interviews}</p>
                          <p className="text-xs text-muted-foreground">Interviews</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterJobsList;
