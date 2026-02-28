import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Users, Save, Trash2, Edit, Copy, Image as ImageIcon, User, X, Upload, Eye, BookOpen, LogOut } from "lucide-react";
import { getAllPosts, createPost, updatePost, deletePost, duplicatePost, type BlogPost } from "../utils/blogService";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { AboutPageEditor } from "./AboutPageEditor";
import { RichTextEditor } from "./RichTextEditor";
import { BlogPostPage } from "../pages/BlogPostPage";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface AdminPanelProps {
  onLogout: () => void;
  onNavigate?: (page: string) => void;
  onPostsUpdated?: () => void;
}

export function AdminPanel({ onLogout, onNavigate, onPostsUpdated }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingAuthorLogo, setUploadingAuthorLogo] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [deletingAll, setDeletingAll] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    authorLogoUrl: "",
    category: [] as string[],
    author: "New Dominion Health",
    featured: false,
    slug: ""
  });

  // Load posts on mount
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const allPosts = await getAllPosts();
    setPosts(allPosts);
    setLoading(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => {
      const currentCategories = prev.category;
      if (currentCategories.includes(category)) {
        return { ...prev, category: currentCategories.filter(c => c !== category) };
      } else {
        return { ...prev, category: [...currentCategories, category] };
      }
    });
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/upload-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'apikey': publicAnonKey
          },
          body: formDataToSend
        }
      );

      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      handleInputChange('imageUrl', data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleAuthorLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAuthorLogo(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-19263118/upload-image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'apikey': publicAnonKey
          },
          body: formDataToSend
        }
      );

      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      handleInputChange('authorLogoUrl', data.url);
    } catch (error) {
      console.error('Error uploading author logo:', error);
      alert('Failed to upload author logo. Please try again.');
    } finally {
      setUploadingAuthorLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = formData.slug || generateSlug(formData.title);
      const postData = {
        ...formData,
        slug,
        publishedAt: new Date().toISOString()
      };

      if (editingPost) {
        await updatePost(editingPost.id, postData);
      } else {
        await createPost(postData);
      }

      // Reset form and reload
      resetForm();
      await loadPosts();
      alert(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
      if (onPostsUpdated) onPostsUpdated();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl,
      authorLogoUrl: post.authorLogoUrl || "",
      category: Array.isArray(post.category) ? post.category : [post.category],
      author: post.author,
      featured: post.featured,
      slug: post.slug
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    setLoading(true);
    try {
      await deletePost(id);
      await loadPosts();
      alert('Post deleted successfully!');
      if (onPostsUpdated) onPostsUpdated();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    if (!confirm('Duplicate this post as a draft?')) return;

    setLoading(true);
    try {
      await duplicatePost(id);
      await loadPosts();
      alert('Post duplicated successfully as a draft!');
      if (onPostsUpdated) onPostsUpdated();
    } catch (error) {
      console.error('Error duplicating post:', error);
      alert('Failed to duplicate post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      authorLogoUrl: "",
      category: [] as string[],
      author: "New Dominion Health",
      featured: false,
      slug: ""
    });
    setEditingPost(null);
    setIsEditing(false);
  };

  const handleDeleteAll = async () => {
    if (!confirm(`⚠️ WARNING: This will permanently delete ALL ${posts.length} posts from the custom admin panel.\n\nThis will NOT delete posts from Sanity.\n\nAre you absolutely sure?`)) return;
    
    if (!confirm('This action cannot be undone. Delete all posts?')) return;

    setDeletingAll(true);
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

      if (!response.ok) throw new Error('Delete all failed');
      
      const data = await response.json();
      await loadPosts();
      alert(`Successfully deleted ${data.deletedCount} posts!`);
      if (onPostsUpdated) onPostsUpdated();
    } catch (error) {
      console.error('Error deleting all posts:', error);
      alert('Failed to delete all posts. Please try again.');
    } finally {
      setDeletingAll(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#F1EFED]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl mb-2">Admin Panel</h1>
            <p className="text-[#64767C]">Manage your blog posts</p>
          </div>
          <div className="flex gap-2">
            {onNavigate && (
              <Button variant="outline" onClick={() => onNavigate('home')}>
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            )}
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={activeTab === 'posts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('posts')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Blog Posts
          </Button>
          <Button
            variant={activeTab === 'about' ? 'default' : 'outline'}
            onClick={() => setActiveTab('about')}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            About Page
          </Button>
        </div>

        {/* Editor Form */}
        {activeTab === 'posts' && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h2>
                {isEditing && (
                  <Button variant="outline" onClick={resetForm}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                    placeholder="Enter post title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <Label htmlFor="slug">URL Slug (optional)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="Auto-generated from title if left empty"
                  />
                  <p className="text-sm text-[#64767C] mt-1">
                    Preview: /blog/{formData.slug || generateSlug(formData.title)}
                  </p>
                </div>

                {/* Excerpt */}
                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    required
                    placeholder="Brief summary of the post"
                    rows={3}
                  />
                </div>

                {/* Content */}
                <div>
                  <Label htmlFor="content">Content *</Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => handleInputChange('content', value)}
                    placeholder="Write your article content here..."
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <Label htmlFor="image">Featured Image</Label>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('imageUpload')?.click()}
                        disabled={uploading}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                      <Input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Input
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        placeholder="Or paste image URL"
                        className="flex-1"
                      />
                    </div>
                    {formData.imageUrl && (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                {/* Author Logo Upload */}
                <div>
                  <Label htmlFor="authorLogo">Author Logo</Label>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('authorLogoUpload')?.click()}
                        disabled={uploadingAuthorLogo}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploadingAuthorLogo ? 'Uploading...' : 'Upload Logo'}
                      </Button>
                      <Input
                        id="authorLogoUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleAuthorLogoUpload}
                        className="hidden"
                      />
                      <Input
                        id="authorLogoUrl"
                        value={formData.authorLogoUrl}
                        onChange={(e) => handleInputChange('authorLogoUrl', e.target.value)}
                        placeholder="Or paste logo URL"
                        className="flex-1"
                      />
                    </div>
                    {formData.authorLogoUrl && (
                      <img
                        src={formData.authorLogoUrl}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>

                {/* Category & Author */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant={formData.category.includes('Nutrition') ? 'default' : 'outline'}
                        onClick={() => handleCategoryToggle('Nutrition')}
                      >
                        Nutrition
                      </Button>
                      <Button
                        type="button"
                        variant={formData.category.includes('Exercise') ? 'default' : 'outline'}
                        onClick={() => handleCategoryToggle('Exercise')}
                      >
                        Exercise
                      </Button>
                      <Button
                        type="button"
                        variant={formData.category.includes('Embodied Health') ? 'default' : 'outline'}
                        onClick={() => handleCategoryToggle('Embodied Health')}
                      >
                        Embodied Health
                      </Button>
                      <Button
                        type="button"
                        variant={formData.category.includes('Faith & Purpose') ? 'default' : 'outline'}
                        onClick={() => handleCategoryToggle('Faith & Purpose')}
                      >
                        Faith & Purpose
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Feature this post on homepage
                  </Label>
                </div>

                {/* Submit */}
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowPreview(!showPreview)}
                    className="w-full md:w-auto"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {showPreview ? 'Hide Preview' : 'Preview Article'}
                  </Button>
                  <Button type="submit" disabled={loading} className="w-full md:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? 'Saving...' : editingPost ? 'Update Post' : 'Create Post'}
                  </Button>
                </div>
              </form>

              {/* Preview Section */}
              {showPreview && formData.title && (
                <div className="mt-8 pt-8 border-t border-[#C6C0B4]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl">Article Preview</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowPreview(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="border-2 border-[#C6C0B4] rounded-lg overflow-hidden bg-white">
                    <BlogPostPage
                      post={{
                        id: editingPost?.id || 'preview',
                        title: formData.title,
                        excerpt: formData.excerpt,
                        content: formData.content,
                        imageUrl: formData.imageUrl,
                        authorLogoUrl: formData.authorLogoUrl,
                        category: formData.category,
                        author: formData.author,
                        featured: formData.featured,
                        slug: formData.slug || generateSlug(formData.title),
                        publishedAt: new Date().toISOString()
                      }}
                      onNavigate={() => {}}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* About Page Editor */}
        {activeTab === 'about' && (
          <AboutPageEditor />
        )}

        {/* Posts List */}
        {activeTab === 'posts' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl">All Posts ({posts.length})</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteAll}
                disabled={deletingAll || posts.length === 0}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {deletingAll ? 'Deleting...' : posts.length === 0 ? 'No Posts to Delete' : 'Delete All Posts'}
              </Button>
            </div>
            {loading && posts.length === 0 ? (
              <p className="text-[#64767C]">Loading posts...</p>
            ) : posts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="w-16 h-16 text-[#C6C0B4] mx-auto mb-4" />
                  <h3 className="text-2xl font-['Baskerville_URW_Medium',_serif] text-[#6E6D5F] mb-3">
                    No Posts Yet
                  </h3>
                  <p className="text-[#64767C] mb-6 max-w-md mx-auto">
                    Create your first blog post using the form above, or head to Sanity to create rich, beautifully formatted articles.
                  </p>
                  <p className="text-sm text-[#64767C]">
                    Articles created here or in Sanity will appear on your website immediately.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="py-4">
                      <div className="flex gap-4">
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl mb-1 truncate">{post.title}</h3>
                              <p className="text-sm text-[#64767C] mb-2">
                                {Array.isArray(post.category) ? post.category.join(', ') : post.category} • {new Date(post.publishedAt).toLocaleDateString()}
                                {post.featured && ' • ⭐ Featured'}
                              </p>
                              <p className="text-[#1A2227] line-clamp-2">{post.excerpt}</p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(post)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(post.id)}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDuplicate(post.id)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}