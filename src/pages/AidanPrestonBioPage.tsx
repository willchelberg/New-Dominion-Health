import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AidanPrestonBioPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Image & Meta */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="mb-10 aspect-[4/5] relative overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-500 shadow-sm border border-[#C6C0B4]/20">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop" 
                alt="Aidan Preston" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Bio Content */}
          <div className="md:col-span-7 lg:col-span-8">
            <h1 className="text-3xl md:text-4xl font-serif text-[#1A2227] mb-8">
              Aidan Preston
            </h1>

            <div className="prose prose-lg max-w-none text-[#1A2227]/90 leading-relaxed font-serif space-y-6">
              <p>
                Aidan Preston is a writer and health enthusiast dedicated to helping Christians embrace a faith-centered approach to wellness. His work at New Dominion Health reflects a commitment to integrating biblical principles with practical health strategies.
              </p>

              <p>
                Aidan's writing focuses on the spiritual dimensions of physical health, exploring how our care for the body can reflect our reverence for the Creator. He is passionate about helping believers see health not as a burden, but as an opportunity to experience God's goodness and serve His kingdom more fully.
              </p>

              <p>
                With a heart for teaching and encouragement, Aidan addresses topics ranging from nutrition and exercise to rest and renewal, always pointing readers back to Scripture and the sufficiency of Christ. He believes that true wellness flows from a life rooted in faith and aligned with God's design.
              </p>

              <p>
                Through his articles and teaching, Aidan continues to inspire Christians to pursue health as an act of stewardship, worship, and love for God and neighbor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
