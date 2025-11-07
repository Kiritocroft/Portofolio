import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create DATABASE_URL with connection parameters
const getDatabaseUrl = () => {
  // Prioritize PRISMA_DATABASE_URL for Vercel deployments
  const baseUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL;
  if (!baseUrl) {
    console.error("No database URL found in environment variables");
    return baseUrl;
  }
  
  try {
    // Add connection parameters for better stability
    const url = new URL(baseUrl);
    url.searchParams.set('connect_timeout', '30');
    url.searchParams.set('pool_timeout', '30');
    url.searchParams.set('socket_timeout', '30');
    url.searchParams.set('connection_limit', '5');
    
    return url.toString();
  } catch (error) {
    console.error("Error parsing database URL:", error);
    return baseUrl;
  }
};

const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;