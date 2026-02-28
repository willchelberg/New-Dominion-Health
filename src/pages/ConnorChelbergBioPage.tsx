import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ConnorChelbergBioPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Image & Meta */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="mb-10 aspect-[4/5] relative overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-500 shadow-sm border border-[#C6C0B4]/20">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=1000&fit=crop" 
                alt="Connor Chelberg" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Bio Content */}
          <div className="md:col-span-7 lg:col-span-8">
            <h1 className="text-3xl md:text-4xl font-serif text-[#1A2227] mb-8">
              Connor Chelberg
            </h1>

            <div className="prose prose-lg max-w-none text-[#1A2227]/90 leading-relaxed font-serif space-y-6">
              <p>
                Connor Chelberg is a contributing writer at New Dominion Health with a passion for exploring the intersection of faith, fitness, and flourishing. His approach to health is grounded in the belief that God calls us to steward our bodies with intentionality and grace.
              </p>

              <p>
                With a focus on practical application and biblical wisdom, Connor writes to encourage believers to pursue physical health as a means of glorifying God and serving others more effectively. He is particularly interested in helping Christians develop sustainable habits that honor the Creator.
              </p>

              <p>
                Connor's articles often address the challenges of modern living and how to navigate health decisions through a lens of faith. He believes that true wellness comes not from self-improvement alone, but from dependence on Christ and obedience to His design.
              </p>

              <p>
                Through thoughtful writing and personal testimony, Connor seeks to equip the church with tools and insights that lead to lasting health and deeper faith.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
