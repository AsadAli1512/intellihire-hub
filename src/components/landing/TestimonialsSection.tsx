import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "JobShob cut our time-to-hire by 60%. The AI interviews are incredibly thorough and consistent, giving us confidence in every hiring decision.",
    author: "Sarah Chen",
    role: "Head of Talent",
    company: "TechFlow Inc.",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "As a candidate, the AI interview was surprisingly comfortable. The questions were relevant to my experience, and I got instant feedback on my performance.",
    author: "Michael Roberts",
    role: "Senior Developer",
    company: "Hired via JobShob",
    avatar: "MR",
    rating: 5,
  },
  {
    quote: "The merit list feature is a game-changer. We can now objectively compare candidates and make data-driven decisions without bias.",
    author: "Emily Watson",
    role: "HR Director",
    company: "GlobalServe Corp",
    avatar: "EW",
    rating: 5,
  },
  {
    quote: "Implementation was seamless. Within a week, we were conducting AI interviews at scale. The ROI has been incredible.",
    author: "David Park",
    role: "CEO",
    company: "StartupLabs",
    avatar: "DP",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Loved by Teams
            <span className="gradient-text"> Worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what recruiters and candidates are saying about their experience with JobShob.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className="bg-card rounded-2xl p-8 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-elegant"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-semibold">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="font-display font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["TechCorp", "GlobalBank", "InnovateCo", "StartupX", "Enterprise Inc"].map((company) => (
              <div key={company} className="text-xl font-display font-bold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
