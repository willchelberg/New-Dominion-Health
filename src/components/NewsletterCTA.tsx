import { Mail } from "lucide-react";

interface NewsletterCTAProps {
  compact?: boolean;
}

export function NewsletterCTA({ compact = false }: NewsletterCTAProps) {
  return (
    <section className={compact ? "py-12 md:py-16 bg-[#64767C] mt-12 rounded-2xl" : "py-20 md:py-24 bg-[#64767C]"}>
      <div className="container mx-auto px-4">
        <div className={compact ? "max-w-2xl mx-auto text-center" : "max-w-3xl mx-auto text-center"}>
          <div className={compact ? "inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4" : "inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6"}>
            <Mail className={compact ? "w-6 h-6 text-white" : "w-8 h-8 text-white"} />
          </div>
          
          <h2 className={compact ? "text-3xl md:text-4xl text-white mb-3" : "text-4xl md:text-5xl text-white mb-4"}>
            Stay connected with us
          </h2>
          
          <p className={compact ? "text-base text-white/90 mb-6 max-w-xl mx-auto leading-relaxed" : "text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"}>
            Receive weekly articles delivered straight to your inbox.
          </p>

          {/* Substack Embed */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-lg overflow-hidden">
              <iframe 
  src="https://newdominionhealth.substack.com/embed" 
  width="100%" 
  height="320" 
  style={{ border: 'none', background: 'white', maxWidth: '100%' }} 
  frameBorder="0" 
  scrolling="no"
  sandbox="allow-scripts allow-forms allow-same-origin allow-popups-to-escape-sandbox"
  title="Subscribe to New Dominion Health newsletter"
/>
            </div>
            <p className="text-sm text-white/70 mt-3">
              Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
