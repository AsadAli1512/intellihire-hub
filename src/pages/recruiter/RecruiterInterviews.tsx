import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Search,
  Clock,
  Calendar,
  Play,
  Eye,
  Download,
  TrendingUp,
  CheckCircle2,
  XCircle,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const RecruiterInterviews = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const todayInterviews = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      job: "Senior Full Stack Developer",
      time: "10:00 AM",
      duration: "30 min",
      status: "completed",
      score: 92,
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=0d9488&color=fff",
    },
    {
      id: 2,
      candidate: "Michael Chen",
      job: "Product Manager",
      time: "2:00 PM",
      duration: "45 min",
      status: "upcoming",
      score: null,
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=6366f1&color=fff",
    },
    {
      id: 3,
      candidate: "Emily Davis",
      job: "UX Designer",
      time: "4:00 PM",
      duration: "30 min",
      status: "upcoming",
      score: null,
      avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=ec4899&color=fff",
    },
  ];

  const recentInterviews = [
    {
      id: 4,
      candidate: "James Wilson",
      job: "Backend Engineer",
      date: "Dec 15, 2024",
      duration: "35 min",
      status: "completed",
      score: 78,
      avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=f59e0b&color=fff",
    },
    {
      id: 5,
      candidate: "Amanda Lee",
      job: "DevOps Engineer",
      date: "Dec 14, 2024",
      duration: "42 min",
      status: "completed",
      score: 95,
      avatar: "https://ui-avatars.com/api/?name=Amanda+Lee&background=10b981&color=fff",
    },
    {
      id: 6,
      candidate: "Robert Brown",
      job: "Senior Full Stack Developer",
      date: "Dec 13, 2024",
      duration: "28 min",
      status: "no-show",
      score: null,
      avatar: "https://ui-avatars.com/api/?name=Robert+Brown&background=ef4444&color=fff",
    },
  ];

  const stats = {
    today: todayInterviews.length,
    completed: todayInterviews.filter((i) => i.status === "completed").length,
    upcoming: todayInterviews.filter((i) => i.status === "upcoming").length,
    thisWeek: 18,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>;
      case "upcoming":
        return <Badge className="bg-accent/10 text-accent border-accent/20">Upcoming</Badge>;
      case "in-progress":
        return <Badge className="bg-info/10 text-info border-info/20">In Progress</Badge>;
      case "no-show":
        return <Badge variant="destructive">No Show</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
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
            <h1 className="text-xl font-display font-semibold text-foreground">Interviews</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stats.today}</p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stats.completed}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stats.upcoming}</p>
                    <p className="text-xs text-muted-foreground">Upcoming</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stats.thisWeek}</p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="today" className="space-y-6">
            <TabsList>
              <TabsTrigger value="today">Today's Interviews</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="all">All Interviews</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              {todayInterviews.map((interview) => (
                <Card key={interview.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={interview.avatar} />
                        <AvatarFallback>{interview.candidate.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{interview.candidate}</h3>
                          {interview.score && (
                            <span className={cn("font-bold", getScoreColor(interview.score))}>
                              {interview.score}%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{interview.job}</p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-medium flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          {interview.time}
                        </p>
                        <p className="text-sm text-muted-foreground">{interview.duration}</p>
                      </div>
                      {getStatusBadge(interview.status)}
                      <div className="flex gap-2 ml-4">
                        {interview.status === "upcoming" && (
                          <Button variant="accent" size="sm">
                            <Play className="w-4 h-4 mr-1" /> Join
                          </Button>
                        )}
                        {interview.status === "completed" && (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" /> View
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              {recentInterviews.map((interview) => (
                <Card key={interview.id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={interview.avatar} />
                        <AvatarFallback>{interview.candidate.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{interview.candidate}</h3>
                          {interview.score && (
                            <span className={cn("font-bold", getScoreColor(interview.score))}>
                              {interview.score}%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{interview.job}</p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="font-medium flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {interview.date}
                        </p>
                        <p className="text-sm text-muted-foreground">{interview.duration}</p>
                      </div>
                      {getStatusBadge(interview.status)}
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" /> Report
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="all">
              <div className="text-center py-12 text-muted-foreground">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>All interviews will be listed here with advanced filtering options.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default RecruiterInterviews;
