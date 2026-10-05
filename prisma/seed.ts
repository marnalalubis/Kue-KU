import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai seeding data awal Kue-KU...");

  // 1. Seed Akun Admin
  const adminPasswordHash = await bcrypt.hash("AdminNatal2026!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@kueku.com" },
    update: { password: adminPasswordHash },
    create: {
      email: "admin@kueku.com",
      name: "Pengelola Toko Kue-KU",
      password: adminPasswordHash,
      role: "ADMIN",
    },
  });
  console.log("Akun admin berhasil di-seed:", admin.email);

  // 2. Seed Pengaturan Toko
  await prisma.storeSetting.upsert({
    where: { id: "default-setting" },
    update: {},
    create: {
      id: "default-setting",
      storeName: "Kue-KU Artisanal Christmas Bakery",
      phone: "081289001225",
      flatShippingFee: 20000,
      deliveryAreaNotes: "Area Jabodetabek (Radius maks 25km via kurir khusus)",
      announcement: "🎄 Pemesanan Spesial Natal 2026 Dibuka! Slot Pengantaran Terbatas.",
      isStoreOpen: true,
    },
  });

  // 3. Seed Kategori
  const catKering = await prisma.category.upsert({
    where: { slug: "kue-kering" },
    update: {},
    create: {
      id: "cat-kering",
      name: "Kue Kering Toples",
      slug: "kue-kering",
      description: "Kue kering klasik favorit keluarga dengan butter Wisman premium dan keju edam asli.",
      sortOrder: 1,
    },
  });

  const catCake = await prisma.category.upsert({
    where: { slug: "cake-dan-roll" },
    update: {},
    create: {
      id: "cat-cake",
      name: "Cake & Roll Spesial",
      slug: "cake-dan-roll",
      description: "Bolu gulung lembut dan cake perayaan bertema Natal dengan dekorasi meriah.",
      sortOrder: 2,
    },
  });

  const catHampers = await prisma.category.upsert({
    where: { slug: "hampers-natal" },
    update: {},
    create: {
      id: "cat-hampers",
      name: "Hampers & Gift Box",
      slug: "hampers-natal",
      description: "Paket bingkisan Natal eksklusif dalam kotak kayu & pita beludru, siap kirim ke orang terkasih.",
      sortOrder: 3,
    },
  });

  // 4. Seed Kapasitas Harian Periode Natal 2026
  const dates = [
    { date: "2026-12-21", max: 35, booked: 5 },
    { date: "2026-12-22", max: 35, booked: 8 },
    { date: "2026-12-23", max: 35, booked: 14 },
    { date: "2026-12-24", max: 35, booked: 26 },
    { date: "2026-12-25", max: 35, booked: 33 },
    { date: "2026-12-26", max: 35, booked: 10 },
  ];

  for (const d of dates) {
    await prisma.dailyCapacity.upsert({
      where: { date: d.date },
      update: { maxOrders: d.max, bookedOrders: d.booked },
      create: {
        date: d.date,
        maxOrders: d.max,
        bookedOrders: d.booked,
        isClosed: false,
      },
    });
  }

  console.log("Seeding data selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("Gagal menjalankan seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
