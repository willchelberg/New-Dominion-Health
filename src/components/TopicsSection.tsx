import { Heart, Brain, Activity, Apple, Moon, Stethoscope } from "lucide-react";

interface TopicsSectionProps {
  onNavigate: (page: string) => void;
}

export function TopicsSection({ onNavigate }: TopicsSectionProps) {
  const topics = [
    {
      icon: Heart,
      title: "Heart Health",
      description: "Cardiovascular wellness and prevention",
      color: "#64767C"
    },
    {
      icon: Brain,
      title: "Mental Wellness",
      description: "Mental health and emotional balance",
      color: "#6E6D5F"
    },
    {
      icon: Activity,
      title: "Fitness & Exercise",
      description: "Movement and physical activity",
      color: "#64767C"
    },
    {
      icon: Apple,
      title: "Nutrition",
      description: "Healthy eating and dietary guidance",
      color: "#6E6D5F"
    },
    {
      icon: Moon,
      title: "Sleep & Rest",
      description: "Quality sleep and recovery",
      color: "#64767C"
    },
    {
      icon: Stethoscope,
      title: "Medical Conditions",
      description: "Understanding diagnoses and treatments",
      color: "#6E6D5F"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">
              Explore Health Topics
            </h2>
            <p className="text-lg text-[#64767C] max-w-2xl mx-auto">
              From nutrition to mental health, find expert guidance on the topics that matter most to you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <button
                  key={index}
                  onClick={() => onNavigate('blog')}
                  className="group text-left p-6 bg-[#F1EFED] border border-[#C6C0B4] rounded-xl hover:border-[#64767C] hover:shadow-lg transition-all duration-300"
                >
                  <div 
                    className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all duration-300"
                    style={{ backgroundColor: `${topic.color}15` }}
                  >
                    <Icon 
                      className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" 
                      style={{ color: topic.color }}
                    />
                  </div>
                  <h3 className="text-xl mb-2 text-[#1A2227] group-hover:text-[#64767C] transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-[#1A2227]">
                    {topic.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
