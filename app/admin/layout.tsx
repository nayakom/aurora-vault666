import AuthProvider from "@/components/providers/AuthProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0F0F0F] text-[#E0E0E0]">
        {children}
      </div>
    </AuthProvider>
  );
}
