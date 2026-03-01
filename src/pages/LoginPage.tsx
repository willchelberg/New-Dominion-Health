import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { toast } from "sonner";
import { supabase } from "../utils/supabase/client";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupSecret, setSignupSecret] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    if (isSignUp && password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        // Use our server's signup endpoint to create a confirmed user via admin API
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-19263118/signup`,
          {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
              'apikey': publicAnonKey
            },
            body: JSON.stringify({ email, password, signupSecret })
          }
        );

        const result = await response.json();

        if (response.ok) {
          toast.success("Account created successfully! You can now sign in.");
          setIsSignUp(false);
          // Don't auto-login yet, let them type it in to confirm they know it
        } else {
          console.error("Signup error:", result.error);
          const errorMsg = result.error || "Unknown error";
          if (errorMsg.includes("already exists") || errorMsg.includes("already been registered")) {
            toast.error("An account with this email already exists. Switching to sign in...");
            setIsSignUp(false);
            // Clear the signup secret for security
            setSignupSecret("");
          } else if (errorMsg.includes("Invalid signup code")) {
            toast.error("Invalid signup code. Only authorized users can create admin accounts.");
          } else {
            toast.error(`Signup failed: ${errorMsg}`);
          }
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Login error:", error);
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password. If you haven't created an account yet, click 'Create one' below.");
          } else {
            toast.error(`Login failed: ${error.message}`);
          }
          return;
        }

        if (data?.session?.access_token) {
          toast.success("Successfully logged in!");
          onLoginSuccess();
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("An error occurred during authentication");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-[#C6C0B4]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{isSignUp ? "Create Admin Account" : "Admin Login"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Register a new administrator" : "Sign in to access the admin panel"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#64767C]">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#C6C0B4]"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-[#64767C]">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-[#C6C0B4]"
                disabled={isLoading}
              />
            </div>

            {isSignUp && (
              <div>
                <label htmlFor="signupSecret" className="block text-sm font-medium mb-2 text-[#64767C]">
                  Signup Secret Code
                </label>
                <Input
                  id="signupSecret"
                  type="text"
                  placeholder="Enter the secret code"
                  value={signupSecret}
                  onChange={(e) => setSignupSecret(e.target.value)}
                  className="border-[#C6C0B4] font-mono"
                  disabled={isLoading}
                  autoComplete="off"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#6E6D5F] hover:bg-[#6E6D5F]/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (isSignUp ? "Creating account..." : "Signing in...") : (isSignUp ? "Create Account" : "Sign In")}
            </Button>
            
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-sm text-[#64767C] hover:text-[#6E6D5F] mt-2 underline"
              disabled={isLoading}
            >
              {isSignUp ? "Already have an account? Sign In" : "Need an account? Create one"}
            </button>
          </form>

          {!isSignUp && (
            <div className="mt-6 p-4 bg-[#F1EFED] rounded-lg">
              <p className="text-xs text-[#64767C]">
                Logging in gives you access to the blog administration tools where you can create, edit, and delete posts.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}