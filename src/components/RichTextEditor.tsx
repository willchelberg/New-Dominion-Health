import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Eye, EyeOff, Type, Bold, Italic, List, ListOrdered, Link as LinkIcon, Quote, Code, AlignLeft, AlignCenter, Heading1, Heading2, Heading3 } from 'lucide-react';
import { Card } from './ui/card';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // Calculate word count (strip HTML tags)
  const getWordCount = (html: string) => {
    const text = html.replace(/<[^>]*>/g, ' ').trim();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    return words.length;
  };

  const getCharCount = (html: string) => {
    const text = html.replace(/<[^>]*>/g, '');
    return text.length;
  };

  const wordCount = getWordCount(value);
  const charCount = getCharCount(value);
  const readTime = Math.ceil(wordCount / 200); // Average reading speed

  // Format commands
  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertHeading = (level: number) => {
    execCommand('formatBlock', `<h${level}>`);
  };

  const insertLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="space-y-3">
      {/* Toolbar Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-sm text-[#64767C]">
          <Type className="w-4 h-4" />
          <span>{wordCount} words</span>
          <span>•</span>
          <span>{charCount} characters</span>
          <span>•</span>
          <span>~{readTime} min read</span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>

      {/* Editor / Preview Toggle */}
      {showPreview ? (
        <Card className="p-6 bg-white min-h-[400px]">
          <div className="mb-4 pb-4 border-b">
            <h3 className="text-lg text-[#64767C]">Preview</h3>
          </div>
          <div 
            className="prose prose-lg max-w-none
              prose-headings:font-['Baskerville_URW_Medium',_serif]
              prose-headings:text-[#1A2227]
              prose-p:text-[#1A2227]
              prose-p:leading-relaxed
              prose-a:text-[#64767C]
              prose-a:underline
              prose-strong:text-[#1A2227]
              prose-ul:text-[#1A2227]
              prose-ol:text-[#1A2227]
              prose-blockquote:border-l-[#64767C]
              prose-blockquote:text-[#64767C]
              prose-code:text-[#64767C]
              prose-code:bg-[#F1EFED]
              prose-pre:bg-[#1A2227]
              prose-pre:text-white"
            dangerouslySetInnerHTML={{ __html: value || '<p class="text-[#64767C] italic">Start typing to see your content preview here...</p>' }}
          />
        </Card>
      ) : (
        <div className="rich-text-editor-container">
          {/* Formatting Toolbar */}
          <div className="toolbar flex flex-wrap gap-1 p-3 bg-[#F1EFED] border border-[#C6C0B4] rounded-t-md">
            <div className="flex gap-1 pr-2 border-r border-[#C6C0B4]">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertHeading(2)}
                title="Heading 2"
                className="h-8 w-8 p-0"
              >
                <Heading2 className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertHeading(3)}
                title="Heading 3"
                className="h-8 w-8 p-0"
              >
                <Heading3 className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-1 pr-2 border-r border-[#C6C0B4]">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => execCommand('bold')}
                title="Bold"
                className="h-8 w-8 p-0"
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => execCommand('italic')}
                title="Italic"
                className="h-8 w-8 p-0"
              >
                <Italic className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-1 pr-2 border-r border-[#C6C0B4]">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => execCommand('insertUnorderedList')}
                title="Bullet List"
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => execCommand('insertOrderedList')}
                title="Numbered List"
                className="h-8 w-8 p-0"
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-1 pr-2 border-r border-[#C6C0B4]">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => execCommand('formatBlock', '<blockquote>')}
                title="Quote"
                className="h-8 w-8 p-0"
              >
                <Quote className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={insertLink}
                title="Insert Link"
                className="h-8 w-8 p-0"
              >
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => execCommand('justifyLeft')}
                title="Align Left"
                className="h-8 w-8 p-0"
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => execCommand('justifyCenter')}
                title="Align Center"
                className="h-8 w-8 p-0"
              >
                <AlignCenter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Editable Content Area */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onPaste={handlePaste}
            className="editor-content min-h-[400px] p-5 bg-white border border-t-0 border-[#C6C0B4] rounded-b-md focus:outline-none focus:ring-2 focus:ring-[#64767C] focus:ring-offset-2"
            dangerouslySetInnerHTML={{ __html: value }}
            data-placeholder={placeholder || "Start writing your article..."}
          />
        </div>
      )}

      {/* Formatting Guide */}
      <div className="p-4 bg-[#F1EFED] rounded-md">
        <p className="text-sm mb-2"><strong className="text-[#1A2227]">Formatting Guide:</strong></p>
        <div className="grid md:grid-cols-2 gap-2 text-xs text-[#64767C]">
          <div>
            <p>• <strong>Headers:</strong> Use H2-H3 for titles and subtitles</p>
            <p>• <strong>Bold/Italic:</strong> Emphasize important points</p>
            <p>• <strong>Lists:</strong> Organize information clearly</p>
          </div>
          <div>
            <p>• <strong>Links:</strong> Add references and resources</p>
            <p>• <strong>Quotes:</strong> Highlight key Bible verses or quotes</p>
            <p>• <strong>Preview:</strong> Check how it looks before saving</p>
          </div>
        </div>
      </div>

      <style>{`
        .editor-content {
          font-family: 'Baskerville URW Medium', serif;
          font-size: 16px;
          line-height: 1.75;
          color: #1A2227;
        }
        
        .editor-content:empty:before {
          content: attr(data-placeholder);
          color: #64767C;
          font-style: italic;
        }
        
        .editor-content p {
          margin-bottom: 1em;
        }
        
        .editor-content h2,
        .editor-content h3 {
          font-family: 'Baskerville URW Medium', serif;
          margin-top: 1.5em;
          margin-bottom: 0.75em;
          line-height: 1.3;
          color: #1A2227;
        }
        
        .editor-content h2 {
          font-size: 1.5em;
        }
        
        .editor-content h3 {
          font-size: 1.25em;
        }
        
        .editor-content strong {
          font-weight: 600;
        }
        
        .editor-content em {
          font-style: italic;
        }
        
        .editor-content ul,
        .editor-content ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        .editor-content li {
          margin: 0.5em 0;
        }
        
        .editor-content blockquote {
          border-left: 4px solid #64767C;
          padding-left: 1em;
          margin: 1.5em 0;
          color: #64767C;
          font-style: italic;
        }
        
        .editor-content a {
          color: #64767C;
          text-decoration: underline;
        }
        
        .editor-content a:hover {
          color: #6E6D5F;
        }
        
        .toolbar button:hover {
          background-color: #C6C0B4;
        }
      `}</style>
    </div>
  );
}
