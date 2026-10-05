"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && status === "unauthenticated") {
      router.replace(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isLoginPage, status, pathname, router]);

  if (isLoginPage) {
    return <div className="min-h-screen bg-stone-100">{children}</div>;
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 text-stone-600 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-red-800" />
        <p className="text-sm font-semibold">Memeriksa autentikasi admin...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 text-stone-600 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-red-800" />
        <p className="text-sm font-semibold">Mengarahkan ke halaman login admin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-stone-100">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="p-6 sm:p-10 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  );
}

