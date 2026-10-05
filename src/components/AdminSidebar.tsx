"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  ClipboardList,
  Layers,
  Boxes,
  Settings,
  LogOut,
  ExternalLink,
  Store,
} from "lucide-react";


export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard Ringkasan",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Pesanan Masuk",
      href: "/admin/orders",
      icon: ClipboardList,
      exact: false,
    },
    {
      label: "Katalog Kue",
      href: "/admin/products",
      icon: Layers,
      exact: false,
    },
    {
      label: "Entry Stok Kue",
      href: "/admin/stock",
      icon: Boxes,
      exact: false,
    },
    {
      label: "Pengaturan Toko",
      href: "/admin/settings",
      icon: Settings,
      exact: false,
    },
  ];

  return (
    <aside className="w-64 bg-stone-900 text-stone-200 border-r border-stone-800 flex flex-col justify-between shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-2xl">🎄</span>
            <div>
              <span className="font-serif font-black text-xl text-white tracking-tight">
                Kue<span className="text-red-500">-KU</span>
              </span>
              <span className="block text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5 text-sm">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition-colors ${
                  isActive
                    ? "bg-red-800 text-white font-bold shadow-md"
                    : "text-stone-400 hover:text-white hover:bg-stone-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-stone-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-stone-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Store className="w-4 h-4 text-green-500" />
            <span>Lihat Website Toko</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Sesi Admin</span>
        </button>
      </div>
    </aside>
  );
}
