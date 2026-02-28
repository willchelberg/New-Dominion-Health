import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { LoadingSpinner } from "./LoadingSpinner";

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

export function AboutPageEditor() {
  const [content, setContent] = useState<AboutContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
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
        } else {
          // No content yet, mark as first time
          setIsFirstTime(true);
        }
      } else if (response.status === 404) {
        // No content yet, mark as first time
        setIsFirstTime(true);
      }
    } catch (error) {
      console.log("Loading default content");
      setIsFirstTime(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/about`,
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
            'apikey': publicAnonKey
          },
          body: JSON.stringify(content)
        }
      );

      if (response.ok) {
        toast.success("About page updated successfully!");
      } else {
        toast.error("Failed to update About page");
      }
    } catch (error) {
      toast.error("Error saving About page");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof AboutContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" text="Loading About page content..." />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header matching the public About page */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-serif text-[#1A2227]">Edit About Page</h1>
        <p className="text-[#64767C] text-lg">
          This content appears on your About page. The Apostles' Creed, Nicene Creed, Second London 1689 Baptist Confession, and Westminster Confession are automatically included.
        </p>
      </div>

      {/* Editor Card - matching About page max-w-3xl */}
      <div className="max-w-3xl">
        <div className="prose prose-lg max-w-none">
          {/* Page Title */}
          <div className="mb-12">
            <label className="block text-sm text-[#64767C] mb-2 uppercase tracking-wide font-medium">Page Title</label>
            <input
              type="text"
              value={content.pageTitle}
              onChange={(e) => updateField('pageTitle', e.target.value)}
              className="w-full text-4xl font-serif text-[#1A2227] border-b-2 border-[#C6C0B4] focus:border-[#64767C] outline-none bg-transparent pb-4"
              placeholder="About New Dominion Health"
            />
          </div>

          {/* Our Mission Section */}
          <div className="mb-12">
            <h2 className="mt-0 mb-6 text-3xl font-serif text-[#1A2227]">
              <input
                type="text"
                value={content.whyWeExistTitle}
                onChange={(e) => updateField('whyWeExistTitle', e.target.value)}
                className="w-full border-b border-[#C6C0B4] focus:border-[#64767C] outline-none bg-transparent"
                placeholder="Our Mission"
              />
            </h2>
            <textarea
              value={content.whyWeExistContent}
              onChange={(e) => updateField('whyWeExistContent', e.target.value)}
              rows={3}
              className="w-full text-[rgb(26,34,39)] leading-relaxed border border-[#C6C0B4] rounded-lg p-4 focus:border-[#64767C] outline-none resize-none font-serif text-lg"
              placeholder="We exist to share how to magnify Christ..."
            />
          </div>

          {/* Who We Are Section */}
          <div className="mb-12">
            <h2 className="mt-12 mb-6 text-3xl font-serif text-[#1A2227]">
              <input
                type="text"
                value={content.whoWeAreTitle}
                onChange={(e) => updateField('whoWeAreTitle', e.target.value)}
                className="w-full border-b border-[#C6C0B4] focus:border-[#64767C] outline-none bg-transparent"
                placeholder="Who We Are"
              />
            </h2>
            <textarea
              value={content.whoWeAreContent}
              onChange={(e) => updateField('whoWeAreContent', e.target.value)}
              rows={4}
              className="w-full text-[rgb(26,34,39)] leading-relaxed border border-[#C6C0B4] rounded-lg p-4 focus:border-[#64767C] outline-none resize-none font-serif text-lg"
              placeholder="We are a Christian health and wellness platform..."
            />
          </div>

          {/* What We Believe Section */}
          <div className="mb-12">
            <h2 className="mt-12 mb-6 text-3xl font-serif text-[#1A2227]">
              <input
                type="text"
                value={content.whatWeBelieveTitle}
                onChange={(e) => updateField('whatWeBelieveTitle', e.target.value)}
                className="w-full border-b border-[#C6C0B4] focus:border-[#64767C] outline-none bg-transparent"
                placeholder="What We Believe"
              />
            </h2>

            {/* Preview of Automatically Included Content */}
            <div className="bg-[#F1EFED] border border-[#C6C0B4] rounded-lg p-6 mb-6">
              <p className="text-sm text-[#64767C] mb-3">
                ℹ️ The following are automatically included on the About page:
              </p>
              <p className="text-[rgb(26,34,39)] font-bold mb-2">Apostles' Creed</p>
              <p className="text-sm text-[#64767C] mb-4 italic">(Automatically displayed)</p>
              
              <p className="text-[rgb(26,34,39)] font-bold mb-2 mt-6">Nicene Creed</p>
              <p className="text-sm text-[#64767C] mb-4 italic">(Automatically displayed)</p>
              
              <p className="text-[rgb(26,34,39)] font-bold mb-2 mt-6">Second London 1689 Baptist Confession of Faith</p>
              <p className="text-sm text-[#64767C] mb-4 italic">(Automatically linked to https://www.the1689confession.com/)</p>
              
              <p className="text-[rgb(26,34,39)] font-bold mb-2 mt-6">Westminster Confession of Faith</p>
              <p className="text-sm text-[#64767C] italic">(Automatically linked to https://thewestminsterstandard.org/the-westminster-confession/)</p>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-12 pt-8 border-t border-[#C6C0B4] flex gap-4">
            <Button 
              onClick={handleSave}
              disabled={saving}
              className="bg-[#64767C] hover:bg-[#64767C]/90 text-white flex-1"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button 
              onClick={loadContent}
              variant="outline"
              className="border-[#C6C0B4] text-[#64767C] hover:bg-[#F1EFED]"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}