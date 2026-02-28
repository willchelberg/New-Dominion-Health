import { AlertCircle, CheckCircle, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useState, useEffect } from "react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { safeFetch } from "../utils/safeFetch";

export function BackendStatusBanner() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  useEffect(() => {
    async function checkBackend() {
      const response = await safeFetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/health`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          suppressWarnings: true, // Don't show console warnings for health check
        }
      );

      if (response?.ok) {
        setStatus('connected');
      } else {
        setStatus('disconnected');
      }
    }

    checkBackend();
  }, []);

  if (status === 'checking') {
    return null; // Don't show anything while checking
  }

  if (status === 'connected') {
    return null; // Don't show banner if everything is working
  }

  // Show warning banner if backend is not deployed
  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <Alert className="border-amber-300 bg-amber-50">
          <Server className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900 font-semibold">
            Backend Not Deployed Yet
          </AlertTitle>
          <AlertDescription className="text-amber-800 text-sm">
            Your website is running, but the backend server hasn't been deployed to Supabase yet.
            <br />
            <strong>To create blog posts and use the admin panel:</strong> Follow the deployment guide in{" "}
            <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">/DEPLOY_BACKEND_GUIDE.md</code>
            <br />
            <strong>Or use Sanity CMS:</strong> Go to{" "}
            <a 
              href={`${window.location.origin}/studio`} 
              target="_blank"
              className="underline font-semibold hover:text-amber-900"
            >
              /studio
            </a>
            {" "}to create posts using Sanity (no deployment needed!)
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}