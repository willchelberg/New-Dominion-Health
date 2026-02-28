interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({ size = 'md', text, fullScreen = false }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const content = (
    <div className="text-center">
      <div 
        className={`${sizeClasses[size]} border-[#C6C0B4] border-t-[#6E6D5F] rounded-full animate-spin mx-auto`}
      />
      {text && (
        <p className={`text-[#64767C] mt-4 ${textSizes[size]}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}

// Card-based loading skeleton for blog posts
export function BlogPostSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#C6C0B4] animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-64 bg-[#F1EFED]" />
      
      {/* Content skeleton */}
      <div className="p-6">
        {/* Category skeleton */}
        <div className="h-4 w-24 bg-[#F1EFED] rounded mb-4" />
        
        {/* Title skeleton */}
        <div className="h-8 bg-[#F1EFED] rounded mb-3" />
        <div className="h-8 bg-[#F1EFED] rounded w-3/4 mb-4" />
        
        {/* Excerpt skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-[#F1EFED] rounded" />
          <div className="h-4 bg-[#F1EFED] rounded" />
          <div className="h-4 bg-[#F1EFED] rounded w-5/6" />
        </div>
        
        {/* Author and date skeleton */}
        <div className="flex items-center gap-3 pt-4 border-t border-[#C6C0B4]">
          <div className="w-10 h-10 rounded-full bg-[#F1EFED]" />
          <div className="flex-1">
            <div className="h-4 w-32 bg-[#F1EFED] rounded mb-2" />
            <div className="h-3 w-24 bg-[#F1EFED] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid of blog post skeletons
export function BlogPostGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <BlogPostSkeleton key={index} />
      ))}
    </div>
  );
}
