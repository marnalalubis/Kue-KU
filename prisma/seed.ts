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

  // 4. Seed Produk & Varian
  const { INITIAL_PRODUCTS } = await import("../src/lib/constants");

  for (const prod of INITIAL_PRODUCTS) {
    const product = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        name: prod.name,
        description: prod.description,
        image: prod.image,
        categoryId: prod.categoryId,
        isAvailable: prod.isAvailable,
        isFeatured: prod.isFeatured,
        badge: prod.badge,
        allergenInfo: prod.allergenInfo,
      },
      create: {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        image: prod.image,
        categoryId: prod.categoryId,
        isAvailable: prod.isAvailable,
        isFeatured: prod.isFeatured,
        badge: prod.badge,
        allergenInfo: prod.allergenInfo,
      },
    });

    for (const v of prod.variants) {
      await prisma.productVariant.upsert({
        where: { id: v.id },
        update: {
          name: v.name,
          price: v.price,
          stock: v.stock,
          weightGram: v.weightGram,
          isAvailable: v.isAvailable,
        },
        create: {
          id: v.id,
          productId: product.id,
          name: v.name,
          price: v.price,
          stock: v.stock,
          weightGram: v.weightGram,
          isAvailable: v.isAvailable,
        },
      });
    }
  }
  console.log(`Berhasil me-seed ${INITIAL_PRODUCTS.length} produk beserta variannya.`);

  // 5. Seed Kapasitas Harian Periode Natal 2026
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

  // 6. Seed Pesanan Contoh Awal (Demo Orders)
  const existingOrder = await prisma.order.findUnique({
    where: { orderCode: "KUE-20261224-8821" },
  });

  if (!existingOrder) {
    await prisma.order.create({
      data: {
        orderCode: "KUE-20261224-8821",
        customerName: "Ibu Michelle Santoso",
        customerPhone: "081234567890",
        deliveryAddress: "Jl. Boulevard Raya Blok PA No. 12, Kelapa Gading, Jakarta Utara",
        deliveryDate: "2026-12-24",
        notes: "Mohon diantar sebelum jam 14.00, ada acara ibadah keluarga.",
        subtotal: 385000,
        shippingFee: 20000,
        totalAmount: 405000,
        status: "DIKONFIRMASI",
        paymentMethod: "COD",
        paymentStatus: "PENDING",
        items: {
          create: [
            {
              productId: "prod-7",
              variantId: "var-7-1",
              productName: "Hampers Bethlehem Joy (3 Toples)",
              variantName: "Paket Box Hardcase + Pita Satin",
              price: 385000,
              quantity: 1,
              subtotal: 385000,
            },
          ],
        },
      },
    });

    await prisma.order.create({
      data: {
        orderCode: "KUE-20261225-1049",
        customerName: "Bpk. David Christian",
        customerPhone: "081987654321",
        deliveryAddress: "Apartemen Senopati Suites Tower 2 Unit 15A, Kebayoran Baru, Jakarta Selatan",
        deliveryDate: "2026-12-25",
        notes: "Titip di resepsionis lobi jika saya belum tiba.",
        subtotal: 325000,
        shippingFee: 20000,
        totalAmount: 345000,
        status: "BARU",
        paymentMethod: "COD",
        paymentStatus: "PENDING",
        items: {
          create: [
            {
              productId: "prod-1",
              variantId: "var-1-2",
              productName: "Nastar Wisman Spesial Natal",
              variantName: "Toples Bulat Besar 500g",
              price: 155000,
              quantity: 1,
              subtotal: 155000,
            },
            {
              productId: "prod-2",
              variantId: "var-2-2",
              productName: "Kastengel Keju Edam Tua & Gouda",
              variantName: "Toples Bulat Besar 500g",
              price: 170000,
              quantity: 1,
              subtotal: 170000,
            },
          ],
        },
      },
    });
    console.log("Contoh pesanan demo awal berhasil di-seed.");
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

