import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  LayoutDashboard, 
  Search, 
  FileText, 
  Video, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Menu,
  TrendingUp,
  TrendingDown,
  Download,
  Award,
  Target,
  MessageSquare,
  Brain,
  Mic
} from "lucide-react";
import { cn } from "@/lib/utils";

const DashboardPerformance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Search, label: "Find Jobs", href: "/dashboard/jobs" },
    { icon: FileText, label: "Applications", href: "/dashboard/applications" },
    { icon: Video, label: "Interviews", href: "/dashboard/interviews" },
    { icon: BarChart3, label: "Performance", href: "/dashboard/performance" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const overallStats = {
    averageScore: 87,
    totalInterviews: 4,
    improvement: "+12%",
    ranking: "Top 15%"
  };

  const skillMetrics = [
    { skill: "Technical Knowledge", score: 92, trend: "up", change: "+5" },
    { skill: "Communication", score: 88, trend: "up", change: "+8" },
    { skill: "Problem Solving", score: 85, trend: "up", change: "+3" },
    { skill: "Domain Expertise", score: 90, trend: "stable", change: "0" },
    { skill: "Cultural Fit", score: 82, trend: "down", change: "-2" }
  ];

  const interviewHistory = [
    { id: 1, job: "Senior Frontend Developer", company: "TechFlow Inc.", date: "Dec 10, 2024", score: 92 },
    { id: 2, job: "Product Manager", company: "StartupLabs", date: "Dec 5, 2024", score: 88 },
    { id: 3, job: "DevOps Engineer", company: "CloudScale", date: "Nov 28, 2024", score: 85 },
    { id: 4, job: "Full Stack Developer", company: "DataDriven", date: "Nov 20, 2024", score: 83 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 80) return "text-accent";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-success";
    if (score >= 80) return "bg-accent";
    if (score >= 70) return "bg-warning";
    return "bg-destructive";
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
            <h1 className="text-xl font-display font-semibold text-foreground">Performance Analytics</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <button className="relative p-2 hover:bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-medium">
              JD
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
              </div>
              <span className={cn("text-4xl font-display font-bold", getScoreColor(overallStats.averageScore))}>
                {overallStats.averageScore}
              </span>
              <p className="text-sm text-muted-foreground mt-1">Average Score</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center">
                  <Video className="w-6 h-6 text-info" />
                </div>
              </div>
              <span className="text-4xl font-display font-bold text-foreground">
                {overallStats.totalInterviews}
              </span>
              <p className="text-sm text-muted-foreground mt-1">Total Interviews</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
              <span className="text-4xl font-display font-bold text-success">
                {overallStats.improvement}
              </span>
              <p className="text-sm text-muted-foreground mt-1">Improvement</p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-warning" />
                </div>
              </div>
              <span className="text-4xl font-display font-bold text-foreground">
                {overallStats.ranking}
              </span>
              <p className="text-sm text-muted-foreground mt-1">Your Ranking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Skill Breakdown */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-6">Skill Breakdown</h3>
              <div className="space-y-5">
                {skillMetrics.map((metric) => (
                  <div key={metric.skill}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{metric.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className={cn("text-sm font-bold", getScoreColor(metric.score))}>
                          {metric.score}
                        </span>
                        <span className={cn(
                          "flex items-center text-xs",
                          metric.trend === "up" && "text-success",
                          metric.trend === "down" && "text-destructive",
                          metric.trend === "stable" && "text-muted-foreground"
                        )}>
                          {metric.trend === "up" && <TrendingUp className="w-3 h-3 mr-1" />}
                          {metric.trend === "down" && <TrendingDown className="w-3 h-3 mr-1" />}
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all", getScoreBgColor(metric.score))}
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feedback Summary */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="font-display font-semibold text-foreground mb-6">AI Feedback Summary</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Strengths</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Excellent technical explanation skills</li>
                    <li>• Strong problem-solving approach</li>
                    <li>• Good understanding of system design</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-warning/5 border border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-5 h-5 text-warning" />
                    <span className="font-medium text-warning">Areas to Improve</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Practice more concise answers</li>
                    <li>• Show more enthusiasm in responses</li>
                    <li>• Elaborate on team collaboration examples</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-info/5 border border-info/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic className="w-5 h-5 text-info" />
                    <span className="font-medium text-info">Communication Tips</span>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Maintain steady pace when speaking</li>
                    <li>• Use structured responses (STAR method)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Interview History */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-foreground">Interview History</h3>
              <Link to="/dashboard/interviews" className="text-sm text-accent hover:underline">
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Position</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Score</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {interviewHistory.map((interview) => (
                    <tr key={interview.id} className="border-b border-border/50 hover:bg-secondary/50">
                      <td className="py-4 px-4">
                        <span className="font-medium text-foreground">{interview.job}</span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{interview.company}</td>
                      <td className="py-4 px-4 text-muted-foreground">{interview.date}</td>
                      <td className="py-4 px-4">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-sm font-bold",
                          getScoreColor(interview.score),
                          interview.score >= 90 ? "bg-success/10" : 
                          interview.score >= 80 ? "bg-accent/10" : 
                          interview.score >= 70 ? "bg-warning/10" : "bg-destructive/10"
                        )}>
                          {interview.score}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link to={`/reports/${interview.id}`}>
                          <Button variant="ghost" size="sm">
                            View Report
                          </Button>
                        </Link>
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

export default DashboardPerformance;