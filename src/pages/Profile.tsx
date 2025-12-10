import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Camera,
  Save,
  Plus,
  X,
  Linkedin,
  Globe,
  Github,
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"]);
  const [newSkill, setNewSkill] = useState("");

  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Full Stack Developer",
    bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I love working with modern technologies and solving complex problems.",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    portfolio: "johndoe.dev",
  });

  const experience = [
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      period: "2021 - Present",
      description: "Leading the development of core platform features.",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "StartupXYZ",
      period: "2019 - 2021",
      description: "Built and maintained multiple microservices.",
    },
  ];

  const education = [
    {
      id: 1,
      degree: "M.S. Computer Science",
      institution: "Stanford University",
      year: "2019",
    },
    {
      id: 2,
      degree: "B.S. Computer Science",
      institution: "UC Berkeley",
      year: "2017",
    },
  ];

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Profile Header */}
          <Card className="border-border/50 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="https://ui-avatars.com/api/?name=John+Doe&background=0d9488&color=fff&size=96" />
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent text-primary-foreground rounded-full flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-display font-bold">{profile.fullName}</h1>
                      <p className="text-muted-foreground">{profile.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {profile.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" /> {profile.email}
                        </span>
                      </div>
                    </div>
                    <Button onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="resume">Resume</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" /> Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input
                            value={profile.fullName}
                            onChange={(e) =>
                              setProfile({ ...profile, fullName: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Job Title</Label>
                          <Input
                            value={profile.title}
                            onChange={(e) =>
                              setProfile({ ...profile, title: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Email</Label>
                          <Input
                            value={profile.email}
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone</Label>
                          <Input
                            value={profile.phone}
                            onChange={(e) =>
                              setProfile({ ...profile, phone: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                          <Label>Location</Label>
                          <Input
                            value={profile.location}
                            onChange={(e) =>
                              setProfile({ ...profile, location: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Bio</Label>
                        <Textarea
                          value={profile.bio}
                          onChange={(e) =>
                            setProfile({ ...profile, bio: e.target.value })
                          }
                          rows={4}
                        />
                      </div>
                      <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-muted-foreground">{profile.bio}</p>
                      <Separator />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-muted-foreground" />
                          <span>{profile.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-muted-foreground" />
                          <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Linkedin className="w-5 h-5 text-muted-foreground" />
                          <span>{profile.linkedin}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Github className="w-5 h-5 text-muted-foreground" />
                          <span>{profile.github}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-muted-foreground" />
                          <span>{profile.portfolio}</span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1 flex items-center gap-1"
                      >
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                      />
                      <Button onClick={handleAddSkill} size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" /> Work Experience
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Add Experience
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={exp.id}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{exp.title}</h3>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.period}</p>
                          <p className="mt-2 text-sm">{exp.description}</p>
                        </div>
                      </div>
                      {index < experience.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" /> Education
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" /> Add Education
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={edu.id}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">{edu.year}</p>
                        </div>
                      </div>
                      {index < education.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resume" className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" /> Resume / CV
                  </CardTitle>
                  <CardDescription>
                    Upload and manage your resume documents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="font-medium mb-2">No resume uploaded</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload your resume to apply for jobs quickly
                    </p>
                    <Button>Upload Resume</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
