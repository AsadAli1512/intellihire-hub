import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search, MapPin, Briefcase, Clock, DollarSign, Building2, Filter, ChevronDown } from "lucide-react";

const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechFlow Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120K - $180K",
    posted: "2 days ago",
    tags: ["React", "TypeScript", "Tailwind"],
    aiInterview: true,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupLabs",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130K - $170K",
    posted: "1 day ago",
    tags: ["Strategy", "Agile", "Analytics"],
    aiInterview: true,
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignCo",
    location: "Remote",
    type: "Full-time",
    salary: "$90K - $130K",
    posted: "3 days ago",
    tags: ["Figma", "User Research", "Prototyping"],
    aiInterview: true,
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataDriven",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140K - $200K",
    posted: "5 days ago",
    tags: ["Python", "Machine Learning", "SQL"],
    aiInterview: true,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110K - $160K",
    posted: "1 week ago",
    tags: ["AWS", "Docker", "Kubernetes"],
    aiInterview: true,
  },
  {
    id: 6,
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "Los Angeles, CA",
    type: "Full-time",
    salary: "$85K - $120K",
    posted: "4 days ago",
    tags: ["Digital Marketing", "SEO", "Analytics"],
    aiInterview: true,
  },
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Search Header */}
        <section className="hero-gradient py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground text-center mb-8">
              Find Your <span className="gradient-text">Dream Job</span>
            </h1>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 p-2 bg-primary-foreground/10 backdrop-blur-lg rounded-2xl border border-primary-foreground/20">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                  <Input
                    placeholder="Job title, keywords, or company"
                    className="pl-12 bg-primary-foreground text-foreground border-0 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-foreground/50" />
                  <Input
                    placeholder="City, state, or remote"
                    className="pl-12 bg-primary-foreground text-foreground border-0 h-12"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                  />
                </div>
                <Button variant="accent" size="lg" className="h-12 px-8">
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-foreground">Filters</h3>
                  <Filter className="w-5 h-5 text-muted-foreground" />
                </div>

                {/* Job Type */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Job Type</h4>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Remote"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm text-muted-foreground">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Experience Level</h4>
                  <div className="space-y-2">
                    {["Entry Level", "Mid Level", "Senior", "Lead/Manager"].map((level) => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm text-muted-foreground">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Salary Range</h4>
                  <div className="space-y-2">
                    {["$50K+", "$75K+", "$100K+", "$150K+"].map((salary) => (
                      <label key={salary} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm text-muted-foreground">{salary}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Job Listings */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  <span className="font-semibold text-foreground">{jobListings.length}</span> jobs found
                </p>
                <Button variant="ghost" className="gap-2">
                  Sort by: Relevance
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {jobListings.map((job) => (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="block bg-card rounded-2xl border border-border p-6 hover:border-accent/50 hover:shadow-elegant transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Company Logo Placeholder */}
                      <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                        <Building2 className="w-7 h-7 text-muted-foreground" />
                      </div>

                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-accent transition-colors">
                              {job.title}
                            </h3>
                            <p className="text-muted-foreground">{job.company}</p>
                          </div>
                          {job.aiInterview && (
                            <span className="shrink-0 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                              AI Interview
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.posted}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Jobs
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Jobs;
