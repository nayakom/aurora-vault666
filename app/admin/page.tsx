"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Link as LinkIcon, Star, Image as ImageIcon, Send, Loader2, UploadCloud } from "lucide-react";
import { publishToBlogger } from "@/app/actions/publishPost";

interface AdminFormData {
  title: string;
  rating: number | string;
  images: string[];
  description: string;
  purpose: string;
  features: string;
  warranty: string;
  labels: string;
  specifications: { key: string; value: string }[];
  affiliates: {
    amazon: { url: string; rating: number | string };
    flipkart: { url: string; rating: number | string };
    myntra: { url: string; rating: number | string };
    meesho: { url: string; rating: number | string };
  };
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editMode, setEditMode] = useState<string | null>(null);

  const [formData, setFormData] = useState<AdminFormData>({
    title: "",
    rating: 4.8,
    images: [""],
    description: "",
    purpose: "",
    features: "",
    warranty: "",
    labels: "",
    specifications: [{ key: "", value: "" }],
    affiliates: {
      amazon: { url: "", rating: 4.8 },
      flipkart: { url: "", rating: 4.6 },
      myntra: { url: "", rating: 4.7 },
      meesho: { url: "", rating: 4.4 },
    },
  });

  useEffect(() => {
    const editData = localStorage.getItem("edit_product_data");
    if (editData) {
      try {
        const product = JSON.parse(editData);
        setFormData({
          title: product.name || "",
          rating: (product.rating !== undefined && !isNaN(product.rating)) ? product.rating : 4.8,
          images: product.images || [product.imageUrl || ""],
          description: product.description || "",
          purpose: product.usage || "",
          features: product.features || "",
          warranty: product.warranty || "",
          labels: product.labels ? product.labels.join(", ") : "",
          specifications: Object.keys(product.specifications || {}).length > 0
            ? Object.entries(product.specifications).map(([key, value]) => ({ key, value: String(value) }))
            : [{ key: "", value: "" }],
          affiliates: {
            amazon: { url: product.affiliates?.amazon?.url || "", rating: (product.affiliates?.amazon?.rating && !isNaN(product.affiliates?.amazon?.rating)) ? product.affiliates?.amazon?.rating : 4.8 },
            flipkart: { url: product.affiliates?.flipkart?.url || "", rating: (product.affiliates?.flipkart?.rating && !isNaN(product.affiliates?.flipkart?.rating)) ? product.affiliates?.flipkart?.rating : 4.6 },
            myntra: { url: product.affiliates?.myntra?.url || "", rating: (product.affiliates?.myntra?.rating && !isNaN(product.affiliates?.myntra?.rating)) ? product.affiliates?.myntra?.rating : 4.7 },
            meesho: { url: product.affiliates?.meesho?.url || "", rating: (product.affiliates?.meesho?.rating && !isNaN(product.affiliates?.meesho?.rating)) ? product.affiliates?.meesho?.rating : 4.4 },
          }
        });
        setEditMode(product.id);
        localStorage.removeItem("edit_product_data"); // Clear after loading
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] text-[#E0E0E0]"><Loader2 className="w-8 h-8 animate-spin text-[#D2B48C]" /></div>;
  }

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0F0F0F] text-[#E0E0E0]">
        <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#D2B48C]/20 max-w-md w-full text-center">
          <h1 className="text-3xl font-space font-bold text-[#D2B48C] mb-2">Vault Access</h1>
          <p className="text-[#808080] mb-8 text-sm">Restricted Area. Authorized personnel only.</p>
          <button
            onClick={() => signIn("google")}
            className="w-full bg-[#D2B48C] text-[#0F0F0F] py-3 rounded-md font-bold uppercase tracking-widest hover:bg-[#8B5A2B] hover:text-[#E0E0E0] transition-colors"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  const handlePublish = async () => {
    setLoading(true);
    setMessage("");
    try {
      const sanitizedAffiliates: any = {};
      const platforms = ['amazon', 'flipkart', 'myntra', 'meesho'];
      platforms.forEach((platform) => {
        const item = (formData.affiliates as any)[platform] || {};
        sanitizedAffiliates[platform] = {
          url: item.url || "",
          rating: parseFloat(String(item.rating)) || 4.8,
        };
      });

      const payload = {
        ...formData,
        rating: parseFloat(String(formData.rating)) || 4.8,
        affiliates: sanitizedAffiliates,
      };

      const res = await publishToBlogger(payload, (session as any).accessToken, editMode || undefined);
      if (res.success) {
        setMessage(editMode ? "Post Updated in Blogger Successfully!" : "Post Published to Blogger Successfully!");
      } else {
        setMessage("Error: " + res.error);
      }
    } catch (error: any) {
      setMessage("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Filter images
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      alert('Please upload image files only.');
      return;
    }

    setUploadingImage(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      
      // Upload all files concurrently
      const uploadPromises = imageFiles.map(async (file) => {
        const uploadData = new FormData();
        uploadData.append('image', file);
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: uploadData
        });
        const data = await res.json();
        if (data.success) return data.data.url;
        throw new Error(data.error?.message || "Upload failed");
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      setFormData((prev: any) => {
        // If the first item is empty string, remove it
        const currentImages = prev.images.filter((img: string) => img.trim() !== "");
        return {
          ...prev,
          images: [...currentImages, ...uploadedUrls]
        };
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      alert("Failed to upload some images: " + error.message);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#E0E0E0] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-[#333333] pb-4">
          <div>
            <h1 className="text-3xl font-space font-bold text-[#D2B48C]">Admin Dashboard</h1>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-[#E0E0E0] text-sm font-bold underline">Create Post</span>
              <a href="/admin/manage" className="text-[#808080] hover:text-[#D2B48C] text-sm transition-colors">Manage Vault</a>
            </div>
            <p className="text-[#808080] text-xs mt-2">Logged in as {session.user?.email}</p>
          </div>
          <button onClick={() => signOut()} className="text-[#808080] hover:text-red-400 text-sm underline">Log Out</button>
        </div>

        <div className="space-y-8">
          {/* Title & Overall Rating & Labels */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333] grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-[#D2B48C] text-sm font-bold uppercase tracking-widest mb-2">Product Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none text-sm"
                placeholder="e.g. Obsidian Chronograph"
              />
            </div>
            <div>
              <label className="block text-[#D2B48C] text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-[#D2B48C]" /> Product Rating (1 - 5)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={formData.rating ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setFormData({ ...formData, rating: val === "" ? "" : val });
                }}
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none text-sm"
                placeholder="4.2"
              />
            </div>
            <div>
              <label className="block text-[#D2B48C] text-sm font-bold uppercase tracking-widest mb-2">Labels (Comma Separated)</label>
              <input
                type="text"
                value={formData.labels}
                onChange={(e) => setFormData({ ...formData, labels: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none text-sm"
                placeholder="e.g. WOMEN, Kurtis, Traditional"
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333]">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-[#D2B48C]" />
              <h2 className="text-[#D2B48C] font-bold uppercase tracking-widest">Images</h2>
            </div>
            
            {/* Drag and Drop Zone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#333333] hover:border-[#D2B48C] bg-[#0F0F0F] rounded-xl p-8 mb-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group relative overflow-hidden"
            >
              <input 
                type="file" 
                multiple
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
              {uploadingImage ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-8 h-8 text-[#D2B48C] animate-spin" />
                  <p className="text-[#808080] text-sm">Uploading to ImgBB...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#1A1A1A] group-hover:bg-[#D2B48C]/10 flex items-center justify-center transition-colors">
                    <UploadCloud className="w-8 h-8 text-[#D2B48C]" />
                  </div>
                  <div>
                    <p className="text-[#E0E0E0] font-bold mb-1">Click or Drag Image to Upload</p>
                    <p className="text-[#808080] text-xs">Directly uploads to internet for Blogger</p>
                  </div>
                </div>
              )}
            </div>

            {formData.images.map((img, i) => (
              <div key={i} className="flex gap-2 mb-2 items-center">
                <input
                  type="text"
                  value={img}
                  onChange={(e) => {
                    const newImages = [...formData.images];
                    newImages[i] = e.target.value;
                    setFormData({ ...formData, images: newImages });
                  }}
                  className="flex-1 bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none text-sm"
                  placeholder="https://image-url.com/image.jpg"
                />
                <button
                  onClick={() => setFormData({ ...formData, images: formData.images.filter((_, idx) => idx !== i) })}
                  className="p-3 bg-red-900/20 text-red-400 rounded hover:bg-red-900/40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setFormData({ ...formData, images: [...formData.images, ""] })}
              className="mt-2 flex items-center gap-2 text-[#808080] hover:text-[#D2B48C] text-sm hover:underline"
            >
              <Plus className="w-4 h-4" /> Add URL manually
            </button>
          </div>

          {/* Text Content */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333] space-y-6">
            <div>
              <label className="block text-[#D2B48C] text-sm font-bold uppercase tracking-widest mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none min-h-[100px]"
              />
            </div>
            <div>
              <label className="block text-[#D2B48C] text-sm font-bold uppercase tracking-widest mb-2">Purpose / Usage</label>
              <textarea
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-[#D2B48C] text-sm font-bold uppercase tracking-widest mb-2">Features (Optional)</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-[#D2B48C] text-sm font-bold uppercase tracking-widest mb-2">Warranty (Optional)</label>
              <input
                type="text"
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                className="w-full bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333]">
            <h2 className="text-[#D2B48C] font-bold uppercase tracking-widest mb-4">Specifications</h2>
            {formData.specifications.map((spec, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={spec.key}
                  onChange={(e) => {
                    const newSpecs = [...formData.specifications];
                    newSpecs[i].key = e.target.value;
                    setFormData({ ...formData, specifications: newSpecs });
                  }}
                  className="w-1/3 bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none text-sm"
                  placeholder="Key (e.g. Brand)"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => {
                    const newSpecs = [...formData.specifications];
                    newSpecs[i].value = e.target.value;
                    setFormData({ ...formData, specifications: newSpecs });
                  }}
                  className="flex-1 bg-[#0F0F0F] border border-[#333333] rounded p-3 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none text-sm"
                  placeholder="Value (e.g. Daniel Klein)"
                />
                <button
                  onClick={() => setFormData({ ...formData, specifications: formData.specifications.filter((_, idx) => idx !== i) })}
                  className="p-3 bg-red-900/20 text-red-400 rounded hover:bg-red-900/40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setFormData({ ...formData, specifications: [...formData.specifications, { key: "", value: "" }] })}
              className="mt-2 flex items-center gap-2 text-[#D2B48C] text-sm hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Specification
            </button>
          </div>

          {/* Affiliates & Ratings */}
          <div className="bg-[#1A1A1A] p-6 rounded-xl border border-[#333333]">
            <h2 className="text-[#D2B48C] font-bold uppercase tracking-widest mb-4">Affiliate Links & Ratings</h2>
            <div className="space-y-4">
              {['amazon', 'flipkart', 'myntra', 'meesho'].map((platform) => (
                <div key={platform} className="p-4 border border-[#333333] rounded bg-[#0F0F0F]">
                  <h3 className="capitalize font-bold text-[#D2B48C] mb-2">{platform}</h3>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-xs text-[#808080] flex items-center gap-1 mb-1"><LinkIcon className="w-3 h-3" /> Affiliate URL</label>
                      <input
                        type="text"
                        value={(formData.affiliates as any)[platform].url}
                        onChange={(e) => setFormData({
                          ...formData,
                          affiliates: {
                            ...formData.affiliates,
                            [platform]: { ...(formData.affiliates as any)[platform], url: e.target.value }
                          }
                        })}
                        className="w-full bg-[#1A1A1A] border border-[#333333] rounded p-2 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none text-sm"
                        placeholder="Leave empty if not available"
                      />
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-[#808080] flex items-center gap-1 mb-1"><Star className="w-3 h-3" /> Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={(formData.affiliates as any)[platform]?.rating ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData({
                            ...formData,
                            affiliates: {
                              ...formData.affiliates,
                              [platform]: { ...(formData.affiliates as any)[platform], rating: val === "" ? "" : val }
                            }
                          });
                        }}
                        className="w-full bg-[#1A1A1A] border border-[#333333] rounded p-2 text-[#E0E0E0] focus:border-[#D2B48C] focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          {message && (
            <div className={`p-4 rounded text-sm ${message.includes('Error') ? 'bg-red-900/20 text-red-400' : 'bg-green-900/20 text-green-400'}`}>
              {message}
            </div>
          )}
          <button
            onClick={handlePublish}
            disabled={loading}
            className="w-full bg-[#D2B48C] text-[#0F0F0F] p-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#8B5A2B] hover:text-[#E0E0E0] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {loading ? (editMode ? "Updating..." : "Publishing...") : (editMode ? "Update Vault Post" : "Publish to Vault")}
          </button>
        </div>
      </div>
    </div>
  );
}
