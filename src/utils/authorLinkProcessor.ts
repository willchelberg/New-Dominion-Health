interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  logoUrl: string;
  createdAt: string;
}

/**
 * Process HTML content and add links to author names
 * @param html The HTML content to process
 * @param authors List of authors to link
 * @returns Processed HTML with author links
 */
export function addAuthorLinksToHTML(html: string, authors: Author[]): string {
  if (!html || authors.length === 0) {
    return html;
  }

  // Sort authors by name length (longest first) to match longer names first
  // This prevents "Will" from matching when we want to match "Will Chelberg"
  const sortedAuthors = [...authors].sort((a, b) => b.name.length - a.name.length);

  let processedHTML = html;

  // Process each author
  sortedAuthors.forEach((author) => {
    // Use the author's actual slug from the database
    const authorSlug = author.slug;
    
    // Create a regex that matches the author name but NOT if it's already inside a tag or link
    // This regex uses negative lookahead to avoid matching inside existing HTML tags
    const escapedName = author.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    // Match author name that is:
    // 1. Not inside an HTML tag (no < before it without a > in between)
    // 2. Word boundary before and after
    // 3. Not already inside a link or data-author-link attribute
    const regex = new RegExp(
      `(?<!<[^>]*)\\b(${escapedName})\\b(?![^<]*>)(?![^<]*<\\/a>)`,
      "gi"
    );

    processedHTML = processedHTML.replace(regex, (match) => {
      // Check if this match is already inside a link by looking at context
      // This is a simple check - we could make it more robust
      return `<a href="#" data-author-link="${authorSlug}" class="text-[#64767C] hover:text-[#6E6D5F] underline underline-offset-2 transition-colors cursor-pointer">${match}</a>`;
    });
  });

  return processedHTML;
}

/**
 * Add click handlers to author links after content is rendered
 * @param container The container element with author links
 * @param onNavigate Navigation function
 */
export function attachAuthorLinkHandlers(
  container: HTMLElement,
  onNavigate: (page: string, post?: any, authorSlug?: string) => void
): () => void {
  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const authorLink = target.closest("[data-author-link]") as HTMLElement;
    
    if (authorLink) {
      e.preventDefault();
      const authorSlug = authorLink.getAttribute("data-author-link");
      if (authorSlug) {
        onNavigate('bio-author', undefined, authorSlug);
      }
    }
  };

  container.addEventListener("click", handleClick);

  // Return cleanup function
  return () => {
    container.removeEventListener("click", handleClick);
  };
}