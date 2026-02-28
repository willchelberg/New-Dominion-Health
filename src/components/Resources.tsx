import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, FileText, Video, Code, BookOpen } from "lucide-react";

const resources = [
  {
    category: "Articles & Guides",
    icon: FileText,
    items: [
      {
        title: "Getting Started with Web Development",
        description: "A comprehensive guide for beginners looking to start their coding journey.",
        link: "#",
        tags: ["Beginner", "Web Dev"]
      },
      {
        title: "Best Practices for Clean Code",
        description: "Learn how to write maintainable and scalable code that others can understand.",
        link: "#",
        tags: ["Intermediate", "Best Practices"]
      },
      {
        title: "Design Systems 101",
        description: "Understanding the fundamentals of building consistent design systems.",
        link: "#",
        tags: ["Design", "UI/UX"]
      }
    ]
  },
  {
    category: "Video Tutorials",
    icon: Video,
    items: [
      {
        title: "React Fundamentals Course",
        description: "Master the basics of React with this step-by-step video series.",
        link: "#",
        tags: ["React", "Video"]
      },
      {
        title: "TypeScript Deep Dive",
        description: "Advanced TypeScript concepts explained with practical examples.",
        link: "#",
        tags: ["TypeScript", "Advanced"]
      }
    ]
  },
  {
    category: "Code Snippets",
    icon: Code,
    items: [
      {
        title: "Reusable React Hooks",
        description: "A collection of custom hooks to speed up your development workflow.",
        link: "#",
        tags: ["React", "Code"]
      },
      {
        title: "CSS Animations Library",
        description: "Ready-to-use CSS animations for modern web applications.",
        link: "#",
        tags: ["CSS", "Animation"]
      }
    ]
  },
  {
    category: "Learning Resources",
    icon: BookOpen,
    items: [
      {
        title: "Recommended Books",
        description: "Curated list of must-read books for developers and designers.",
        link: "#",
        tags: ["Books", "Learning"]
      },
      {
        title: "Online Courses",
        description: "Top-rated courses from various platforms to enhance your skills.",
        link: "#",
        tags: ["Courses", "Learning"]
      }
    ]
  }
];

export function Resources() {
  return (
    <section id="resources" className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4">
            Explore Resources
          </h2>
          <p className="text-[#64767C] max-w-2xl mx-auto">
            Browse through categorized resources to find exactly what you need
          </p>
        </div>

        <div className="space-y-12">
          {resources.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                  <h3>{category.category}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2 flex-wrap">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
