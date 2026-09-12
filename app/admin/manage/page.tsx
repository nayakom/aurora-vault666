import { getProductsFromBlogger } from "@/lib/blogger";
import ManageClient from "./ManageClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ManageVaultPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin");
  }

  const products = await getProductsFromBlogger();

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#E0E0E0] p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-[#333333] pb-4">
          <div>
            <h1 className="text-3xl font-space font-bold text-[#D2B48C]">Manage Vault</h1>
            <div className="flex items-center gap-4 mt-2">
              <a href="/admin" className="text-[#808080] hover:text-[#D2B48C] text-sm transition-colors">Create Post</a>
              <span className="text-[#E0E0E0] text-sm font-bold underline">Manage Vault</span>
            </div>
            <p className="text-[#808080] text-xs mt-2">Total Products: {products.length}</p>
          </div>
        </div>

        <ManageClient initialProducts={products} />
      </div>
    </div>
  );
}
