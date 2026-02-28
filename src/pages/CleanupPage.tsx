import { useEffect, useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { Button } from '../components/ui/button';
import { Trash2, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface CleanupPageProps {
  onNavigate?: (page: string) => void;
}

export function CleanupPage({ onNavigate }: CleanupPageProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('loading');
  const [deletedCount, setDeletedCount] = useState(0);
  const [error, setError] = useState('');

  const deleteAllPosts = async () => {
    setStatus('loading');
    setError('');
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/posts-all`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'apikey': publicAnonKey
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete: ${response.status}`);
      }
      
      const data = await response.json();
      setDeletedCount(data.deletedCount);
      setStatus('success');
    } catch (err) {
      console.error('Error deleting all posts:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  };

  // Automatically delete posts when page loads
  useEffect(() => {
    deleteAllPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1EFED] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          {status === 'idle' && (
            <>
              <Trash2 className="w-20 h-20 text-red-500 mx-auto mb-6" />
              <h1 className="text-4xl font-['Baskerville_URW_Medium',_serif] text-[#6E6D5F] mb-4">
                Delete All Demo Posts
              </h1>
              <p className="text-lg text-[#64767C] mb-8">
                This will permanently delete all blog posts from the custom admin panel database.
                <br />
                <span className="font-semibold">This will NOT affect Sanity posts.</span>
              </p>
              <div className="space-y-4">
                <Button
                  onClick={deleteAllPosts}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Delete All Posts Now
                </Button>
                {onNavigate && (
                  <div>
                    <Button
                      variant="outline"
                      onClick={() => onNavigate('home')}
                    >
                      Cancel - Go Back to Website
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          {status === 'loading' && (
            <>
              <Loader className="w-20 h-20 text-[#64767C] mx-auto mb-6 animate-spin" />
              <h1 className="text-4xl font-['Baskerville_URW_Medium',_serif] text-[#6E6D5F] mb-4">
                Deleting Posts...
              </h1>
              <p className="text-lg text-[#64767C]">
                Please wait while we remove all demo articles.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl font-['Baskerville_URW_Medium',_serif] text-[#6E6D5F] mb-4">
                All Clean! 🎉
              </h1>
              <p className="text-lg text-[#64767C] mb-4">
                Successfully deleted <span className="font-semibold text-[#6E6D5F]">{deletedCount}</span> posts.
              </p>
              <p className="text-md text-[#64767C] mb-8">
                Your website is now ready for fresh content from Sanity!
              </p>
              {onNavigate && (
                <div className="space-y-3">
                  <Button
                    onClick={() => onNavigate('home')}
                    className="px-8"
                  >
                    View Your Clean Website
                  </Button>
                  <div>
                    <Button
                      variant="outline"
                      onClick={() => onNavigate('admin')}
                    >
                      Go to Admin Panel
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {status === 'error' && (
            <>
              <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
              <h1 className="text-4xl font-['Baskerville_URW_Medium',_serif] text-[#6E6D5F] mb-4">
                Oops! Something Went Wrong
              </h1>
              <p className="text-lg text-[#64767C] mb-4">
                Error: {error}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={deleteAllPosts}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Try Again
                </Button>
                {onNavigate && (
                  <div>
                    <Button
                      variant="outline"
                      onClick={() => onNavigate('home')}
                    >
                      Go Back to Website
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}