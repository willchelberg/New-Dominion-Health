import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { LogOut, UserCircle, BookOpen, ExternalLink } from "lucide-react";
import { AboutPageEditor } from "./AboutPageEditor";
import { AuthorsEditor } from "./AuthorsEditor";
import { TestPostCreator } from "./TestPostCreator";

interface SimplifiedAdminPanelProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
}

export function SimplifiedAdminPanel({ onLogout, onNavigate }: SimplifiedAdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'authors'>('about');

  return (
    <div className="min-h-screen bg-[#F1EFED]">
      {/* Header */}
      <div className="bg-white border-b border-[#C6C0B4]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-[#1A2227]">
                Admin Panel
              </h1>
              <span className="text-sm text-[#64767C]">
                New Dominion Health
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => onNavigate?.('home')}
                variant="outline"
                size="sm"
              >
                View Website
              </Button>
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Management Notice */}
      <div className="bg-[#64767C] text-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">
                Blog posts are now managed in Sanity Studio
              </span>
            </div>
            <Button
              onClick={() => window.open('https://www.sanity.io/manage', '_blank')}
              variant="outline"
              size="sm"
              className="bg-white text-[#64767C] hover:bg-[#F1EFED]"
            >
              Open Sanity Studio
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-[#C6C0B4]">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'about'
                  ? 'border-[#64767C] text-[#64767C]'
                  : 'border-transparent text-[#6E6D5F] hover:text-[#64767C]'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                About Page
              </div>
            </button>
            <button
              onClick={() => setActiveTab('authors')}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'authors'
                  ? 'border-[#64767C] text-[#64767C]'
                  : 'border-transparent text-[#6E6D5F] hover:text-[#64767C]'
              }`}
            >
              <div className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                Authors
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'about' && (
          <Card>
            <CardContent className="p-6">
              <AboutPageEditor />
            </CardContent>
          </Card>
        )}

        {activeTab === 'authors' && (
          <div className="space-y-6">
            {/* Test Post Creator */}
            <TestPostCreator />
            
            {/* Authors Editor */}
            <Card>
              <CardContent className="p-6">
                <AuthorsEditor />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}