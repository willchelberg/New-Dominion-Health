import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function AndonChelbergBioPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Image & Meta */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="mb-10 aspect-[4/5] relative overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-500 shadow-sm border border-[#C6C0B4]/20">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop" 
                alt="Andon Chelberg" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Bio Content */}
          <div className="md:col-span-7 lg:col-span-8">
            <h1 className="text-3xl md:text-4xl font-serif text-[#1A2227] mb-8">
              Andon Chelberg
            </h1>

            <div className="prose prose-lg max-w-none text-[#1A2227]/90 leading-relaxed font-serif space-y-6">
              <p>
                Andon Chelberg brings a unique perspective to New Dominion Health, combining theological depth with practical health insights. His passion is helping believers understand that caring for their bodies is an act of worship and stewardship.
              </p>

              <p>
                With a heart for discipleship and teaching, Andon focuses on making complex health concepts accessible and rooted in biblical truth. He believes that physical wellness is inseparable from spiritual vitality and that our daily choices reflect our understanding of God's design.
              </p>

              <p>
                Andon's writing emphasizes the integration of faith and health, encouraging readers to view their bodies as gifts from God that enable them to serve more effectively. He is committed to helping Christians break free from worldly health philosophies and embrace a truly biblical approach to wellness.
              </p>

              <p>
                Through clear teaching and compassionate guidance, Andon continues to inspire others to pursue holistic health that honors Christ and strengthens the body of believers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
