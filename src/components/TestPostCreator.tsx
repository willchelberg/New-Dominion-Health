import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner@2.0.3";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { Sparkles } from "lucide-react";

export function TestPostCreator() {
  const [creating, setCreating] = useState(false);

  const createTestPost = async () => {
    setCreating(true);
    
    const testPost = {
      title: "Understanding Biblical Health: A Foundation for Wellness",
      slug: `understanding-biblical-health-${Date.now()}`,
      excerpt: "Exploring how Scripture provides the foundation for a Christ-centered approach to physical wellness and stewardship of our bodies.",
      content: `<p>When we talk about health and wellness from a Christian perspective, we must first ground ourselves in what Scripture teaches us about our bodies and their purpose.</p>

<p>As Will Chelberg often explains, our bodies are not our own—they belong to God. The Apostle Paul reminds us in 1 Corinthians 6:19-20 that our bodies are temples of the Holy Spirit. This isn't just poetic language; it's a profound theological truth that should shape how we think about physical health.</p>

<h2>The Theology of Stewardship</h2>

<p>According to Will Chelberg, understanding health through a biblical lens means recognizing it as an act of stewardship rather than self-improvement. We don't pursue wellness to glorify ourselves, but to better serve God and our neighbors.</p>

<p>This perspective shifts everything. When Will Chelberg talks about exercise, nutrition, or rest, he's not speaking merely about physical optimization—he's addressing how we honor the Creator through caring for His creation.</p>

<h2>Christ at the Center</h2>

<p>The danger in modern wellness culture is that it often becomes self-focused and self-reliant. Will Chelberg warns against this trap, reminding us that even our best efforts at health mean nothing apart from Christ.</p>

<p>True wellness, as Will Chelberg emphasizes, flows from our relationship with Christ. When we are rooted in Him, our approach to health becomes an expression of gratitude and worship rather than anxiety or pride.</p>

<h2>Practical Application</h2>

<p>So what does this look like in daily life? Will Chelberg encourages believers to:</p>

<ul>
  <li>Start each day acknowledging that your body belongs to God</li>
  <li>Make health decisions based on biblical principles, not cultural trends</li>
  <li>Pursue wellness as a means to better serve others, not just yourself</li>
  <li>Rest in God's grace when you fall short</li>
</ul>

<p>As we journey toward better health, let's remember the words Will Chelberg often shares: "Our goal isn't perfection, but faithfulness. We steward our bodies not to earn God's love, but because we've already received it."</p>`,
      imageUrl: "https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=1200&h=800&fit=crop",
      author: "Will Chelberg",
      authorLogoUrl: "",
      category: "Faith & Health",
      featured: true,
      publishedAt: new Date().toISOString(),
      status: "published"
    };

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/posts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
            'apikey': publicAnonKey
          },
          body: JSON.stringify(testPost)
        }
      );

      if (response.ok) {
        toast.success("✅ Test post created! Check the Blog page to see it.");
      } else {
        const errorText = await response.text();
        toast.error(`Failed to create test post: ${errorText}`);
      }
    } catch (error) {
      console.error("Error creating test post:", error);
      toast.error("Error creating test post. Check console for details.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card className="border-2 border-dashed border-[#64767C] bg-[#F1EFED]/50">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[#64767C]" />
              <h3 className="font-serif text-xl text-[#1A2227]">Test Author Auto-Linking</h3>
            </div>
            <p className="text-[#64767C] mb-4">
              Create a test blog post by Will Chelberg with multiple mentions of his name in the content. 
              This will let you test the author auto-linking feature (like RefTagger).
            </p>
            <div className="bg-white border border-[#C6C0B4] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#1A2227] font-medium mb-2">📝 What this creates:</p>
              <ul className="text-sm text-[#64767C] space-y-1 ml-4">
                <li>• <strong>Title:</strong> "Understanding Biblical Health: A Foundation for Wellness"</li>
                <li>• <strong>Author:</strong> Will Chelberg</li>
                <li>• <strong>Content:</strong> Includes 8+ mentions of "Will Chelberg" to test auto-linking</li>
                <li>• <strong>Category:</strong> Faith & Health</li>
                <li>• <strong>Featured:</strong> Yes</li>
              </ul>
            </div>
            <p className="text-sm text-[#64767C] italic">
              💡 After creating, go to the Blog page and open the article. Every mention of "Will Chelberg" should be a clickable link to his bio page!
            </p>
          </div>
          <Button
            onClick={createTestPost}
            disabled={creating}
            className="bg-[#64767C] hover:bg-[#6E6D5F] text-white whitespace-nowrap"
          >
            {creating ? "Creating..." : "Create Test Post"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
