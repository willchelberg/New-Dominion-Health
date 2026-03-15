import { Instagram, Facebook } from "lucide-react";
import { Button } from "./ui/button";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t bg-white/50 mt-20 bg-[rgb(255,255,255)]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="mb-4">About</h4>
              <p className="text-[rgb(26,34,39)]">
                Sharing how to magnify Christ through stewarding our bodies for His glory and our joy
              </p>
            </div>
            
            <div>
              <h4 className="mb-4">Quick Links</h4>
              <ul className="space-y-2 text-[#64767C]">
                <li>
                  <button 
                    onClick={() => onNavigate('blog')}
                    className="hover:text-[#1A2227] transition-colors text-[rgb(26,34,39)]"
                  >
                    Read
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('about')}
                    className="hover:text-[#1A2227] transition-colors text-[rgb(26,34,39)]"
                  >
                    About
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Connect</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.instagram.com/newdominionhealth/" target="_blank" rel="noopener noreferrer" className="text-[rgb(26,34,39)]">
                    <Instagram className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://www.facebook.com/profile.php?id=61588485575205" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://x.com/newdominionhlth" target="_blank" rel="noopener noreferrer">
                    <img src={xLogo} alt="X (Twitter)" className="w-3.5 h-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-[#64767C]">
            <p className="text-[rgb(26,34,39)]">
              &copy; {new Date().getFullYear()} New Dominion Health. All rights reserved.
              {' '}<span className="mx-2">•</span>{' '}
              <button 
                onClick={() => onNavigate('admin')}
                className="text-[#64767C] hover:text-[#1A2227] transition-colors text-xs"
              >
                Admin
              </button>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}