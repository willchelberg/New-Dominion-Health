import { Heart, BookOpen, Users, Lightbulb } from "lucide-react";

interface MissionSectionProps {
  onNavigate: (page: string) => void;
}

export function MissionSection({ onNavigate }: MissionSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-[#F1EFED]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl mb-6">
              Why New Dominion Health Exists
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-lg md:text-xl text-[#1A2227] leading-relaxed">
                We exist to share how to magnify Christ through stewarding our bodies for His glory and our joy.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="inline-block bg-white border border-[#C6C0B4] rounded-xl px-6 py-4">
              <button
                onClick={() => onNavigate('about')}
                className="text-[#64767C] hover:text-[#64767C]/80 underline underline-offset-4 transition-colors text-lg"
              >
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}