import { Heart, BookOpen, Users, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Mission Statement */}
          <div className="text-center mb-16">
            <h2 className="mb-4">What We're About</h2>
            <p className="text-lg text-[#64767C] max-w-2xl mx-auto">
              New Dominion Health is a space where health education meets everyday life. 
              We believe wellness should be accessible, understandable, and empowering for everyone.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2">Health Made Simple</h3>
                <p className="text-[#64767C]">
                  We break down complex health topics into clear, actionable information you can use in your daily life.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2">Evidence-Based Content</h3>
                <p className="text-[#64767C]">
                  Our articles are grounded in research and reviewed for accuracy, giving you trustworthy information.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2">Community Focused</h3>
                <p className="text-[#64767C]">
                  We're building a community of people who care about their health and want to learn together.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2">Practical Wellness</h3>
                <p className="text-[#64767C]">
                  From nutrition tips to mental health strategies, we focus on what you can actually apply to your life.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-blue-50/30 rounded-2xl p-8 md:p-12">
            <h3 className="mb-3">Start Your Wellness Journey</h3>
            <p className="text-[#64767C] mb-6 max-w-xl mx-auto">
              Whether you're looking for nutrition advice, mental health support, or just want to learn more about living well, 
              you're in the right place.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="#featured" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Browse Articles
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}