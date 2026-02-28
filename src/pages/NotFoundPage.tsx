import { Button } from "../components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

interface NotFoundPageProps {
  onNavigate?: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 
            className="text-[200px] leading-none font-bold text-[#F1EFED] select-none"
            style={{ fontFamily: "'Chapman Medium Condensed', sans-serif" }}
          >
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-4xl mb-4 text-[#1A2227]">
            Page Not Found
          </h2>
          <p className="text-lg text-[#64767C] leading-relaxed max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => onNavigate?.('home')}
            size="lg"
            className="bg-[#6E6D5F] hover:bg-[#64767C] text-white px-8"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Button>
          
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            className="border-[#C6C0B4] text-[#6E6D5F] hover:bg-[#F1EFED]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-[#C6C0B4]">
          <p className="text-sm text-[#64767C] mb-4">
            You might be interested in:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate?.('blog')}
              className="text-[#64767C] hover:text-[#6E6D5F] underline underline-offset-4 decoration-[#C6C0B4]"
            >
              Browse Articles
            </button>
            <span className="text-[#C6C0B4]">•</span>
            <button
              onClick={() => onNavigate?.('about')}
              className="text-[#64767C] hover:text-[#6E6D5F] underline underline-offset-4 decoration-[#C6C0B4]"
            >
              About Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
