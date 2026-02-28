import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Plus, Edit, Trash2, Save, X, Upload, User, Eye } from "lucide-react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  logoUrl: string;
  createdAt: string;
}

export function AuthorsEditor() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    bio: "",
    logoUrl: "",
  });

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/authors`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAuthors(data);
      }
    } catch (error) {
      console.error("Error loading authors:", error);
      toast.error("Failed to load authors");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/upload-author-logo`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const { url } = await response.json();
        setFormData((prev) => ({ ...prev, logoUrl: url }));
      } else {
        alert("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter author name");
      return;
    }

    try {
      const url = editingAuthor
        ? `https://${projectId}.supabase.co/functions/v1/make-server-19263118/authors/${editingAuthor.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-19263118/authors`;

      const response = await fetch(url, {
        method: editingAuthor ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadAuthors();
        handleCancel();
      } else {
        alert("Failed to save author");
      }
    } catch (error) {
      console.error("Error saving author:", error);
      alert("Failed to save author");
    }
  };

  const handleEdit = (author: Author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      slug: author.slug,
      bio: author.bio,
      logoUrl: author.logoUrl,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author?")) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/authors/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        await loadAuthors();
      } else {
        alert("Failed to delete author");
      }
    } catch (error) {
      console.error("Error deleting author:", error);
      alert("Failed to delete author");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingAuthor(null);
    setFormData({
      name: "",
      slug: "",
      bio: "",
      logoUrl: "",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-[#64767C]">Loading authors...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A2227]">Manage Authors</h2>
          <p className="text-sm text-[#64767C] mt-1">
            {authors.length === 0
              ? "Add author profiles to attribute blog posts"
              : `${authors.length} author${authors.length === 1 ? "" : "s"} • These profiles appear on blog posts and author bio pages`}
          </p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-[#64767C] hover:bg-[#64767C]/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Author
          </Button>
        )}
      </div>

      {/* Edit/Create Form */}
      {isEditing && (
        <div className="bg-[#F1EFED] p-6 rounded-lg mb-6 border-2 border-[#64767C]">
          <h3 className="text-lg font-bold text-[#1A2227] mb-4">
            {editingAuthor ? `Edit ${editingAuthor.name}` : "Add New Author"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[#1A2227]">
                Author Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData((prev) => ({ 
                    ...prev, 
                    name,
                    // Auto-generate slug from name if creating new author
                    slug: editingAuthor ? prev.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                  }));
                }}
                placeholder="e.g., Will Chelberg"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="slug" className="text-[#1A2227]">
                URL Slug * 
                <span className="text-xs text-[#64767C] ml-2 font-normal">
                  (Auto-generated, but you can customize)
                </span>
              </Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="e.g., will-chelberg"
                required
                className="mt-1"
              />
              <p className="text-xs text-[#64767C] mt-1">
                Author page will be at: <code className="bg-white px-1 py-0.5 rounded">/author/{formData.slug || 'author-slug'}</code>
              </p>
            </div>

            <div>
              <Label htmlFor="bio" className="text-[#1A2227] text-base font-semibold">
                Author Bio
              </Label>
              <p className="text-xs text-[#64767C] mt-1 mb-2">
                This bio appears on the author's dedicated page and in blog post bylines. Write in third person.
              </p>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Example: John is a certified nutritionist and personal trainer with over 10 years of experience helping people achieve their health goals. He believes that true wellness comes from honoring God with our bodies and finding joy in the journey.

Use double line breaks to create new paragraphs. This text supports basic formatting."
                rows={12}
                className="mt-1 font-serif"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-[#64767C]">
                  💡 Tip: Use double line breaks (press Enter twice) to separate paragraphs
                </p>
                <p className="text-xs text-[#64767C]">
                  {formData.bio.length} characters {formData.bio.length < 100 && formData.bio.length > 0 && '(aim for 150-300)'}
                </p>
              </div>
              {formData.bio && (
                <div className="mt-4 p-4 bg-[#F1EFED] border border-[#C6C0B4] rounded-lg">
                  <p className="text-xs font-semibold text-[#1A2227] mb-2 uppercase tracking-wide">Preview:</p>
                  <div className="prose prose-sm max-w-none text-[#1A2227]/90 font-serif space-y-3">
                    {formData.bio.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="logo" className="text-[#1A2227]">
                Profile Photo
              </Label>
              <div className="flex items-start gap-4 mt-2">
                {formData.logoUrl ? (
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#64767C]">
                      <ImageWithFallback
                        src={formData.logoUrl}
                        alt={formData.name || "Author"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, logoUrl: "" }))
                      }
                      className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0 bg-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-[#C6C0B4] flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("logo")?.click()}
                    disabled={uploading}
                    className="mb-2"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {uploading
                      ? "Uploading..."
                      : formData.logoUrl
                      ? "Change Photo"
                      : "Upload Photo"}
                  </Button>
                  <p className="text-xs text-[#64767C]">
                    Recommended: Square image, at least 400x400px
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-[#C6C0B4]">
              <Button
                type="submit"
                className="bg-[#64767C] hover:bg-[#64767C]/90 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingAuthor ? "Update Author" : "Save Author"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Authors List */}
      <div className="space-y-4">
        {authors.length === 0 ? (
          <div className="text-center py-12 bg-[#F1EFED] rounded-lg border-2 border-dashed border-[#C6C0B4]">
            <User className="w-12 h-12 text-[#C6C0B4] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#1A2227] mb-2">No authors yet</h3>
            <p className="text-[#64767C] mb-4 max-w-md mx-auto">
              Add author profiles to attribute blog posts and create individual author bio pages
            </p>
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-[#64767C] hover:bg-[#64767C]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Author
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-[#F1EFED] border border-[#C6C0B4] rounded-lg p-4 mb-4">
              <p className="text-sm text-[#64767C]">
                💡 <strong className="text-[#1A2227]">Tip:</strong> Authors you create here can be assigned to blog posts in Sanity Studio. Each author gets their own bio page at <code className="text-xs bg-white px-1 py-0.5 rounded">/author/[author-name]</code>
              </p>
            </div>
            {authors.map((author) => (
              <div
                key={author.id}
                className="bg-white p-5 rounded-lg border border-[#C6C0B4] hover:border-[#64767C] transition-colors flex items-start gap-4"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#C6C0B4] flex-shrink-0">
                  {author.logoUrl ? (
                    <ImageWithFallback
                      src={author.logoUrl}
                      alt={author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#C6C0B4] flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-[#1A2227] mb-1">{author.name}</h4>
                  {author.bio ? (
                    <p className="text-sm text-[#64767C] line-clamp-2">
                      {author.bio}
                    </p>
                  ) : (
                    <p className="text-sm text-[#C6C0B4] italic">No bio added</p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-xs text-[#64767C]">
                      Created {new Date(author.createdAt).toLocaleDateString()}
                    </p>
                    <span className="text-[#C6C0B4]">•</span>
                    <a 
                      href={`/author/${author.slug}`}
                      className="text-xs text-[#64767C] hover:text-[#6E6D5F] underline flex items-center gap-1"
                      onClick={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(new CustomEvent('navigate', { 
                          detail: { page: 'bio-author', authorSlug: author.slug } 
                        }));
                      }}
                    >
                      <Eye className="w-3 h-3" />
                      View bio page
                    </a>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(author)}
                    title="Edit author"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(author.id)}
                    title="Delete author"
                    className="hover:bg-red-50 hover:border-red-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}