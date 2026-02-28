import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert(`Thanks for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <section className="container mx-auto px-4 py-16 mb-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl p-8 md:p-12 text-center text-white">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
          <Mail className="w-8 h-8" />
        </div>
        
        <h2 className="mb-4 text-white">
          Subscribe to Our Newsletter
        </h2>
        
        <p className="text-slate-200 mb-8 max-w-xl mx-auto">
          Get the latest insights, articles, and resources delivered straight to your inbox. 
          Join our community of professionals staying ahead of the curve.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white"
          />
          <Button type="submit" variant="secondary" className="whitespace-nowrap">
            Subscribe Now
          </Button>
        </form>
        
        <p className="text-slate-300 text-sm mt-4">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
