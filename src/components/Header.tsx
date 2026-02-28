import { Instagram, Facebook, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import logo from "figma:asset/d25c2a38ec754977ee0deeafbcb71f67dde388f8.png";
import xLogo from "figma:asset/b9e520bf0ff37c8790cf4584b415bebe071a60ad.png";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`bg-[#64767C] sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Left side - Desktop navigation */}
          <nav className="hidden md:flex gap-8" style={{ fontFamily: 'var(--font-display)' }}>
            <button 
              onClick={() => onNavigate('home')}
              className="text-white text-lg tracking-wide transition-all hover:opacity-80 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C6C0B4] transition-all group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className="text-white text-lg tracking-wide transition-all hover:opacity-80 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C6C0B4] transition-all group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => onNavigate('blog')}
              className="text-white text-lg tracking-wide transition-all hover:opacity-80 relative group"
            >
              Read
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C6C0B4] transition-all group-hover:w-full"></span>
            </button>
          </nav>

          {/* Mobile hamburger button with Menu text */}
          <button
            className="md:hidden flex items-center gap-2 text-white transition-opacity hover:opacity-80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            <span className="text-base tracking-wide">Menu</span>
          </button>
          
          {/* Center - Logo only */}
          <button 
            onClick={() => onNavigate('home')} 
            className="absolute left-1/2 transform -translate-x-1/2 hover:opacity-90 transition-opacity"
          >
            <img src={logo} alt="New Dominion Health" className="w-44 h-44 md:w-48 md:h-48 object-contain" />
          </button>
          
          {/* Right side - Social icons (hidden on mobile) */}
          <div className="hidden md:flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10" asChild>
              <a href="https://www.instagram.com/newdominionhealth/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10" asChild>
              <a href="https://www.facebook.com/profile.php?id=61588485575205" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10" asChild>
              <a href="https://x.com/newdominionhlth" target="_blank" rel="noopener noreferrer">
                <img src={xLogo} alt="X (Twitter)" className="w-4 h-4 brightness-0 invert" />
              </a>
            </Button>
          </div>

          {/* Spacer for mobile to balance menu button */}
          <div className="w-20 md:hidden"></div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav 
            className="md:hidden pt-4 pb-2 flex flex-col gap-4 border-t border-white/20 mt-4" 
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <button 
              onClick={() => handleNavigate('home')}
              className="text-white text-lg text-left tracking-wide transition-opacity hover:opacity-80"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate('about')}
              className="text-white text-lg text-left tracking-wide transition-opacity hover:opacity-80"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigate('blog')}
              className="text-white text-lg text-left tracking-wide transition-opacity hover:opacity-80"
            >
              Read
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}