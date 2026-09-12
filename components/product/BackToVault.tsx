"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function BackToVault() {
  const router = useRouter();

  useEffect(() => {
    sessionStorage.setItem("aurora_intro_completed", "true");
    sessionStorage.setItem("aurora_return_to_vault", "true");
  }, []);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem("aurora_intro_completed", "true");
    sessionStorage.setItem("aurora_return_to_vault", "true");

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/#vault");
    }
  };

  return (
    <a
      href="/#vault"
      onClick={handleBack}
      className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5A2B]/10 hover:bg-[#8B5A2B]/20 border border-[#8B5A2B]/30 hover:border-[#D2B48C]/60 text-[#D2B48C] text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 group cursor-pointer"
      title="Return to Vault Collection"
    >
      <FaArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform text-[#8B5A2B] group-hover:text-[#D2B48C]" />
      <span>Back to Vault</span>
    </a>
  );
}
