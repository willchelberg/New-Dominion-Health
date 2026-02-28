import { PortableText, PortableTextComponents } from '@portabletext/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Custom components for rendering Sanity's Portable Text
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 mt-8 text-[#1A2227]">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-6 text-[#1A2227]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-3 mt-5 text-[#1A2227]">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="text-[#1A2227] leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#64767C] pl-6 italic text-[#64767C] my-6">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[#1A2227]">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }) => (
      <span className="underline">{children}</span>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#64767C] underline hover:text-[#6E6D5F] transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-6 text-[#1A2227] space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 text-[#1A2227] space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-[#1A2227]">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-[#1A2227]">{children}</li>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="my-8 rounded-2xl overflow-hidden">
        <ImageWithFallback
          src={value?.asset?.url || ''}
          alt={value?.alt || 'Blog post image'}
          className="w-full h-auto object-cover"
        />
        {value?.caption && (
          <p className="text-sm text-[#64767C] text-center mt-2 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
};

interface PortableTextRendererProps {
  content: any;
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
