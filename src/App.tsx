import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { BackendStatusBanner } from "./components/BackendStatusBanner";
import { HomePage } from "./pages/HomePage";
import { BlogPage } from "./pages/BlogPage";
import { AboutPage } from "./pages/AboutPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";
import { AuthorBioPage } from "./pages/AuthorBioPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CleanupPage } from "./pages/CleanupPage";
import { RefTagger } from "./components/RefTagger";
import { Toaster } from "sonner";
import { type BlogPost } from "./utils/blogServiceUnified";
import { supabase } from "./utils/supabase/client";
import {
  projectId,
  publicAnonKey,
} from "./utils/supabase/info";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPost, setSelectedPost] =
    useState<BlogPost | null>(null);
  const [selectedAuthorSlug, setSelectedAuthorSlug] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    async function checkSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.access_token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkSession();
  }, []);

  const handleNavigate = (page: string, post?: BlogPost, authorSlug?: string) => {
    // If trying to access admin without auth, redirect to login
    if (page === "admin" && !isAuthenticated) {
      setCurrentPage("login");
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" });

    // Update page state
    if (post) {
      setSelectedPost(post);
    }
    if (authorSlug) {
      setSelectedAuthorSlug(authorSlug);
    }
    setCurrentPage(page);
  };

  // Listen for custom navigate events (for components that can't access handleNavigate directly)
  useEffect(() => {
    const handleCustomNavigate = (event: CustomEvent) => {
      const { page, post, authorSlug } = event.detail;
      handleNavigate(page, post, authorSlug);
    };

    window.addEventListener('navigate', handleCustomNavigate as EventListener);
    return () => {
      window.removeEventListener('navigate', handleCustomNavigate as EventListener);
    };
  }, [isAuthenticated]); // Re-add listener when auth status changes

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage("admin");
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setCurrentPage("home");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Function to refresh blog data after creating/updating/deleting posts
  const handleRefreshPosts = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C6C0B4] border-t-[#6E6D5F] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#64767C] text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Render the current page
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            key="home-page"
            onNavigate={handleNavigate}
            refreshKey={refreshKey}
          />
        );
      case "blog":
        return (
          <BlogPage
            key="blog-page"
            onNavigate={handleNavigate}
            refreshKey={refreshKey}
          />
        );
      case "about":
        return <AboutPage key="about-page" onNavigate={handleNavigate} />;
      case "bio-author":
        return selectedAuthorSlug ? (
          <AuthorBioPage key={`bio-${selectedAuthorSlug}`} authorSlug={selectedAuthorSlug} />
        ) : null;
      case "post":
        return selectedPost ? (
          <BlogPostPage
            key={`post-${selectedPost.id}`}
            post={selectedPost}
            onNavigate={handleNavigate}
          />
        ) : null;
      case "login":
        return (
          <LoginPage
            key="login-page"
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case "admin":
        // Protect admin page - if not authenticated, show login
        return isAuthenticated ? (
          <AdminPage
            key="admin-page"
            onNavigate={handleNavigate}
            onPostsUpdated={handleRefreshPosts}
            onLogout={handleLogout}
          />
        ) : (
          <LoginPage
            key="login-page"
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case "cleanup":
        return <CleanupPage key="cleanup-page" onNavigate={handleNavigate} />;
      default:
        return (
          <NotFoundPage
            key="not-found-page"
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex flex-col">
      <BackendStatusBanner />
      <Header
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
      <Toaster position="top-right" />
      <RefTagger currentPage={currentPage} selectedPostId={selectedPost?.id} />
    </div>
  );
}