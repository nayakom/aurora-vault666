"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Trash2, Edit, ExternalLink, Loader2 } from "lucide-react";
import { deleteBloggerPost } from "@/app/actions/deletePost";
import { Product } from "@/data/products";

export default function ManageClient({ initialProducts }: { initialProducts: Product[] }) {
  const { data: session } = useSession();
  const [products, setProducts] = useState(initialProducts);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this product from the Vault and Blogger?")) return;
    
    setDeletingId(id);
    try {
      const res = await deleteBloggerPost(id, (session as any).accessToken);
      if (res.success) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert("Failed to delete: " + res.error);
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (product: Product) => {
    // In a full implementation, we would populate the parent form or redirect with query params.
    // For now, we alert them how to edit, or we can simply pass data via localStorage.
    // Let's use localStorage to pass data to the Create page and redirect.
    localStorage.setItem("edit_product_data", JSON.stringify(product));
    window.location.href = "/admin";
  };

  return (
    <div className="space-y-4 mt-8">
      {products.map((product) => (
        <div key={product.id} className="bg-[#1A1A1A] border border-[#333333] p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-center justify-between hover:border-[#D2B48C]/50 transition-colors">
          <div className="flex items-center gap-4 flex-1 w-full">
            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded bg-[#0F0F0F] border border-[#333333]" />
            <div>
              <h3 className="text-[#D2B48C] font-bold font-display uppercase tracking-wider">{product.name}</h3>
              <div className="flex gap-2 text-xs text-[#808080] mt-1">
                {product.labels && product.labels.length > 0 && (
                  <span className="bg-[#8B5A2B]/20 text-[#D2B48C] px-2 py-0.5 rounded">{product.labels.join(", ")}</span>
                )}
                <span>★ {product.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a 
              href={`/blog/${product.id}`} 
              target="_blank" 
              className="p-2 bg-[#0F0F0F] border border-[#333333] text-[#E0E0E0] rounded hover:text-[#D2B48C] hover:border-[#D2B48C]"
              title="View on Website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button 
              onClick={() => handleEdit(product)}
              className="p-2 bg-[#0F0F0F] border border-[#333333] text-[#E0E0E0] rounded hover:text-[#D2B48C] hover:border-[#D2B48C]"
              title="Edit Post"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleDelete(product.id)}
              disabled={deletingId === product.id}
              className="p-2 bg-red-900/20 border border-red-900/50 text-red-400 rounded hover:bg-red-900/40 disabled:opacity-50"
              title="Delete Post"
            >
              {deletingId === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      ))}
      {products.length === 0 && (
        <div className="text-center text-[#808080] py-12 border-2 border-dashed border-[#333333] rounded-xl">
          No products found in the Vault.
        </div>
      )}
    </div>
  );
}
