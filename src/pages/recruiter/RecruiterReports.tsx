import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
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
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  Target,
  Award,
  Clock,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const RecruiterReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState("30d");
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

  const metrics = [
    { label: "Total Interviews", value: "156", change: "+12%", positive: true, icon: Video },
    { label: "Avg Interview Score", value: "78%", change: "+5%", positive: true, icon: Target },
    { label: "Candidates Hired", value: "12", change: "+25%", positive: true, icon: CheckCircle2 },
    { label: "Time to Hire", value: "18 days", change: "-3 days", positive: true, icon: Clock },
  ];

  const topCandidates = [
    { name: "Sarah Johnson", job: "Senior Full Stack Developer", score: 92 },
    { name: "Amanda Lee", job: "Tech Lead", score: 95 },
    { name: "Michael Chen", job: "Product Manager", score: 85 },
    { name: "Emily Davis", job: "Backend Engineer", score: 88 },
    { name: "Robert Brown", job: "DevOps Engineer", score: 82 },
  ];

  const jobPerformance = [
    { job: "Senior Full Stack Developer", applicants: 45, interviewed: 12, hired: 2, avgScore: 78 },
    { job: "Product Manager", applicants: 32, interviewed: 8, hired: 1, avgScore: 72 },
    { job: "UX Designer", applicants: 28, interviewed: 5, hired: 0, avgScore: 68 },
    { job: "Backend Engineer", applicants: 56, interviewed: 15, hired: 3, avgScore: 81 },
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
            <h1 className="text-xl font-display font-semibold text-foreground">Reports & Analytics</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button>
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
              TF
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metrics.map((metric) => (
              <Card key={metric.label} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <metric.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      metric.positive ? "text-success" : "text-destructive"
                    )}>
                      {metric.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {metric.change}
                    </div>
                  </div>
                  <p className="text-3xl font-display font-bold">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Top Candidates */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Top Performing Candidates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCandidates.map((candidate, index) => (
                    <div key={candidate.name} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.job}</p>
                      </div>
                      <div className="text-right">
                        <p className={cn(
                          "font-bold",
                          candidate.score >= 85 ? "text-success" : candidate.score >= 70 ? "text-warning" : "text-destructive"
                        )}>
                          {candidate.score}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Funnel */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  Interview Funnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Applications</span>
                      <span className="font-medium">161</span>
                    </div>
                    <Progress value={100} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Interviews Scheduled</span>
                      <span className="font-medium">45</span>
                    </div>
                    <Progress value={28} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Interviews Completed</span>
                      <span className="font-medium">40</span>
                    </div>
                    <Progress value={25} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Shortlisted</span>
                      <span className="font-medium">18</span>
                    </div>
                    <Progress value={11} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Hired</span>
                      <span className="font-medium">12</span>
                    </div>
                    <Progress value={7} className="h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Performance Table */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Job Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Job Title</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Applicants</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Interviewed</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Hired</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Avg Score</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobPerformance.map((job) => (
                      <tr key={job.job} className="border-b border-border/50 hover:bg-secondary/50">
                        <td className="py-4 px-4 font-medium">{job.job}</td>
                        <td className="py-4 px-4 text-center">{job.applicants}</td>
                        <td className="py-4 px-4 text-center">{job.interviewed}</td>
                        <td className="py-4 px-4 text-center text-success font-medium">{job.hired}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={cn(
                            "font-medium",
                            job.avgScore >= 80 ? "text-success" : job.avgScore >= 70 ? "text-warning" : "text-destructive"
                          )}>
                            {job.avgScore}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4 mr-1" /> Export
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default RecruiterReports;
