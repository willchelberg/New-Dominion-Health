import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { SEO } from "../components/SEO";

interface AboutContent {
  pageTitle: string;
  whyWeExistTitle: string;
  whyWeExistContent: string;
  whoWeAreTitle: string;
  whoWeAreContent: string;
  whatWeBelieveTitle: string;
  whatWeBelieveParagraph1: string;
  whatWeBelieveParagraph2: string;
}

const defaultContent: AboutContent = {
  pageTitle: "About New Dominion Health",
  whyWeExistTitle: "Our Mission",
  whyWeExistContent: "We exist to share how to magnify Christ through stewarding our bodies for His glory and our joy.",
  whoWeAreTitle: "Who We Are",
  whoWeAreContent: "We are a Christian health and wellness platform with a desire to point people to Christ, in whom all true joy is found. We create Bible-centered resources that encourage and equip people to honor God with their bodies.",
  whatWeBelieveTitle: "What We Believe",
  whatWeBelieveParagraph1: "We believe that when people understand their health, they make better decisions. We believe wellness isn't one-size-fits-all—it's personal, evolving, and looks different for everyone. And we believe that health education should be a conversation, not a lecture.",
  whatWeBelieveParagraph2: "Our approach is grounded in evidence but written with empathy. We draw from research and expert insights, then translate that into content that actually makes sense in everyday life.",
};

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const [content, setContent] = useState<AboutContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-19263118/about`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'apikey': publicAnonKey
            }
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setContent(data);
          }
        }
      } catch (error) {
        console.log("Using default content");
      }
    }

    loadContent();
  }, []);

  return (
    <div className="bg-[rgb(255,255,255)]">
      <SEO title={content.pageTitle} description={content.whyWeExistContent} />
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-8">{content.pageTitle}</h1>
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="mt-0 mb-6">{content.whyWeExistTitle}</h2>
            
            <p className="text-[rgb(26,34,39)] leading-relaxed mb-6">
              {content.whyWeExistContent}
            </p>

            <h2 className="mt-12 mb-6">{content.whoWeAreTitle}</h2>
            
            <p className="text-[rgb(26,34,39)] leading-relaxed mb-6">
              {content.whoWeAreContent}
            </p>

            <h2 className="mt-12 mb-6">{content.whatWeBelieveTitle}</h2>
            
            <p className="text-[rgb(26,34,39)] font-bold mb-4">Apostles' Creed</p>
            <p className="text-[rgb(26,34,39)] leading-relaxed mb-12 whitespace-pre-wrap">
              {`I believe in God the Father, Almighty,
Maker of heaven and earth;

And in Jesus Christ, his only begotten Son, our Lord;
Who was conceived by the Holy Spirit,
Born of the virgin Mary;
Suffered under Pontius Pilate,
Was crucified, dead and buried;
He descended into hell.
The third day he arose again from the dead;
He ascended into heaven;
And sitteth on the right hand of God the Father Almighty;
From thence he shall come to judge the quick and the dead.

I believe in the Holy Spirit;
The holy catholic church;
The communion of saints;
The forgiveness of sins;
The resurrection of the body;
And the life everlasting. Amen.`}
            </p>

            <p className="text-[rgb(26,34,39)] font-bold mb-4">Nicene Creed</p>
            <p className="text-[rgb(26,34,39)] leading-relaxed mb-12 whitespace-pre-wrap">
              {`We believe in one God, the Father Almighty, Maker of heaven and earth, of all things visible and invisible.

And in one Lord Jesus Christ, the only-begotten Son of God, begotten of His Father before all worlds; God of God, Light of Light, very God of very God; begotten, not made, being of one substance with the Father, by whom all things were made; Who, for us men and for our salvation, came down from heaven, and was incarnate by the Holy Spirit of the virgin Mary, and was made man; and was crucified also for us under Pontius Pilate; He suffered and was buried; and the third day He rose again, according to the Scriptures; and ascended to heaven, and is seated at the right hand of the Father; and He shall come again, with glory, to judge both the living and the dead; Whose kingdom shall have no end.

And we believe in the Holy Spirit, the Lord and Giver of Life; who proceeds from the Father and the Son; who with the Father and the Son together is worshiped and glorified; who spoke by the prophets. And we believe in one holy catholic and apostolic church.

We acknowledge one baptism for the remission of sins; and we look for the resurrection of the dead, and the life of the world to come. Amen.`}
            </p>

            <p className="text-[rgb(26,34,39)] leading-relaxed mt-16 mb-12">
              We, New Dominion Health, hold to the <a 
                href="https://www.the1689confession.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#64767C] hover:text-[#6E6D5F] underline underline-offset-4"
              >
                Second London 1689 Baptist Confession of Faith
              </a> and the <a 
                href="https://thewestminsterstandard.org/the-westminster-confession/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#64767C] hover:text-[#6E6D5F] underline underline-offset-4"
              >
                Westminster Confession of Faith
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}