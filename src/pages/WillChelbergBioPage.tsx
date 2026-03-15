import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function WillChelbergBioPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column - Image & Meta */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="mb-10 aspect-[4/5] relative overflow-hidden rounded-sm shadow-sm border border-[#C6C0B4]/20">
              <ImageWithFallback 
                src={profileImage} 
                alt="Will Chelberg" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Bio Content */}
          <div className="md:col-span-7 lg:col-span-8">
            <h1 className="text-3xl md:text-4xl font-serif text-[#1A2227] mb-8">
              Will Chelberg
            </h1>

            <div className="prose prose-lg max-w-none text-[#1A2227]/90 leading-relaxed font-serif space-y-6">
              <p>
                Will Chelberg is the founder and lead visionary behind New Dominion Health. His mission is rooted in the belief that the stewardship of our physical bodies is a profound way to honor the Creator and experience the fullness of life He intended for us.
              </p>

              <p>
                With a deep commitment to integrating biblical truth with practical health science, Will started New Dominion Health as a resource for those seeking to align their lifestyle with their faith. He believes that wellness is not an end in itself, but a means to better serve God and our neighbors.
              </p>

              <p>
                Will's passion is to help Christians rediscover the sufficiency of Christ in every aspect of life, including how we eat, move, and rest. He is committed to clearing away the confusion of modern health trends and pointing believers back to the wisdom found in Scripture and the natural order of God's creation.
              </p>

              <p>
                Through writing, teaching, and community building, Will continues to encourage the church to view health through the lens of stewardship, resisting the self-reliance of the world and resting in the grace of Christ alone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}