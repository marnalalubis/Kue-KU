import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

// Hash untuk password default: AdminNatal2026!
const DEFAULT_ADMIN_HASH = "$2a$10$wT0EmsR/qT.yH0d2iE1s3OcvT3u3E4wN5d4n4W6t4m6u7k8l9o0p1";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@kueku.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        try {
          // Cari user di database Prisma
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });

          if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (isValid) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
              };
            }
          }
        } catch {
          // Jika DB belum terhubung, cek fallback default admin
        }

        // Fallback default admin jika DB offline / belum di-seed
        if (
          credentials.email.toLowerCase() === "admin@kueku.com" &&
          credentials.password === "AdminNatal2026!"
        ) {
          return {
            id: "admin-default-id",
            email: "admin@kueku.com",
            name: "Pengelola Toko Kue-KU",
            role: "ADMIN",
          };
        }

        throw new Error("Email atau password admin salah");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role || "ADMIN";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "kue-ku-christmas-secret-key-min-32-chars-random-string",
};
