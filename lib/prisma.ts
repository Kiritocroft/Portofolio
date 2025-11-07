import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create DATABASE_URL with connection parameters
const getDatabaseUrl = () => {
  const baseUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL;
  if (!baseUrl) return baseUrl;
  
  // Add connection parameters for better stability
  const url = new URL(baseUrl);
  url.searchParams.set('connect_timeout', '60');
  url.searchParams.set('pool_timeout', '60');
  url.searchParams.set('socket_timeout', '60');
  url.searchParams.set('connection_limit', '10');
  url.searchParams.set('max_allowed_packet', '67108864');
  
  return url.toString();
};

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;