"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-stone-100">{children}</div>;
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
