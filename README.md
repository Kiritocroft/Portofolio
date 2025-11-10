# Portfolio Website

A modern portfolio website built with Next.js 15, Prisma, and PostgreSQL.

## Features

- Responsive design with Tailwind CSS
- Admin dashboard for content management
- Project showcase with external links
- Skills and experience sections
- Dark mode support
- Drag and drop reordering
- Authentication with NextAuth.js

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Prisma account (for Prisma Accelerate, optional)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [.env.example](file:///C:/Users/MSI%20ID/Downloads/portofolio/.env.example) for required variables):
   ```bash
   cp .env.example .env
   ```

4. Run database migrations:
   ```bash
   npx prisma db push
   ```

5. Seed the database:
   ```bash
   npx prisma db seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment to Vercel

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Set the environment variables in Vercel project settings:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `PRISMA_DATABASE_URL` - Your Prisma Accelerate URL (if using)
   - `NEXTAUTH_SECRET` - A random string for NextAuth
   - `NEXTAUTH_URL` - Your deployed URL
   - `ADMIN_EMAIL` - Admin email for login
   - `ADMIN_PASSWORD` - Admin password
   - `RESEND_API_KEY` - Resend API key (if using email functionality)

4. Add the build command in Vercel settings:
   ```bash
   prisma generate && next build
   ```

## Environment Variables

See [DEPLOYMENT_GUIDE.md](file:///C:/Users/MSI%20ID/Downloads/portofolio/DEPLOYMENT_GUIDE.md) for detailed information about environment variables.

## API Routes

- `/api/health` - Health check endpoint
- `/api/test-db` - Database connection test
- `/api/test-auth` - Authentication test
- `/api/profile` - Profile management
- `/api/projects` - Project management
- `/api/skills` - Skills management
- `/api/experiences` - Experience management
- `/api/about` - About content management
- `/api/upload` - File upload
- `/api/create-admin` - Admin user creation (protected)

## Troubleshooting

### "Gagal menyimpan" (Failed to save) Error

This usually indicates:

1. Database connection issues
2. Missing environment variables
3. Authentication problems
4. Required fields not being provided

To debug:

1. Check the browser console for network errors
2. Check Vercel logs for server-side errors
3. Test database connectivity with `/api/test-db`
4. Test authentication with `/api/test-auth`

### Database Issues

1. Ensure your database URL is correctly formatted
2. If using Prisma Accelerate, make sure both `DATABASE_URL` and `PRISMA_DATABASE_URL` are set
3. Check that your database is accessible from Vercel

## Development

### Adding New Features

1. Update the Prisma schema in [prisma/schema.prisma](file:///C:/Users/MSI%20ID/Downloads/portofolio/prisma/schema.prisma)
2. Run `npx prisma generate` to update the Prisma client
3. Run `npx prisma db push` to update the database schema
4. Implement the API routes
5. Update the admin dashboard UI

### Testing

Run the development server and test all functionality:
```bash
npm run dev
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)