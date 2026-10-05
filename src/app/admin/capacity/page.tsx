"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminCapacityPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/stock");
  }, [router]);

  return (
    <div className="p-12 text-center text-xs text-stone-500">
      Mengarahkan ke menu Entry Stok Kue...
    </div>
  );
}
