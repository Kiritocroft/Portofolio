# Vercel Deployment Guide

## Environment Variables Required

You need to set the following environment variables in your Vercel project settings:

1. **DATABASE_URL** - Your PostgreSQL database connection string
2. **PRISMA_DATABASE_URL** - Your Prisma Accelerate connection string (if using Prisma Accelerate)
3. **NEXTAUTH_SECRET** - A random string used to hash tokens, sign/encrypt cookies
4. **NEXTAUTH_URL** - Your deployed site URL (e.g., https://your-site.vercel.app)
5. **ADMIN_EMAIL** - The admin email for your application
6. **ADMIN_PASSWORD** - The admin password (should be hashed)
7. **RESEND_API_KEY** - Your Resend API key (if using email functionality)

## Setting Up Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to the "Settings" tab
4. Click on "Environment Variables" in the sidebar
5. Add each of the required environment variables listed above

## Database Configuration

### If using Prisma Accelerate (Recommended):

1. Set **PRISMA_DATABASE_URL** to your Prisma Accelerate URL:
   ```
   prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY
   ```

2. Make sure **DATABASE_URL** is also set to your regular PostgreSQL connection string:
   ```
   postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   ```

### If not using Prisma Accelerate:

1. Only set **DATABASE_URL** to your PostgreSQL connection string:
   ```
   postgresql://USER:PASSWORD@HOST:PORT/DATABASE
   ```

## NextAuth Configuration

Set these environment variables:

```
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=https://your-deployed-site.vercel.app
```

For production, NEXTAUTH_URL should be your actual deployed URL.

## Admin User Setup

After deploying, you'll need to create your admin user. You can do this by:

1. Running the seed script locally:
   ```bash
   npx prisma db seed
   ```

2. Or creating a simple API route to create the admin user programmatically.

## Troubleshooting

### 500 Internal Server Error

This usually indicates:

1. **Database connection issues**:
   - Check that DATABASE_URL and/or PRISMA_DATABASE_URL are correctly set
   - Ensure your database is accessible from Vercel
   - Verify database credentials

2. **Environment variables missing**:
   - Check that all required environment variables are set in Vercel

3. **Prisma client issues**:
   - Make sure you've run `npx prisma generate` during the build process
   - Check that your Prisma schema is correctly configured

### Testing Your Deployment

After setting up your environment variables:

1. Visit `/api/test-db` to test database connectivity
2. Visit `/api/test-auth` to test authentication
3. Try to log in with your admin credentials
4. Try to save profile information

### Common Issues

1. **"PrismaClientKnownRequestError: Invalid `prisma.user.findUnique()` invocation"**:
   - Usually means your database schema doesn't match your Prisma schema
   - Run `npx prisma db push` or `npx prisma migrate dev` to sync your database

2. **"Error: connect ECONNREFUSED"**:
   - Database is not accessible
   - Check your database connection string and firewall settings

3. **"NEXTAUTH_URL environment variable not set"**:
   - Set the NEXTAUTH_URL environment variable in Vercel

## Build Process

Make sure your build process includes Prisma generation by updating your package.json:

```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

This ensures that the Prisma client is generated during the build process.