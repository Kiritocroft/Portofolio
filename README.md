# 🚀 Portfolio Website

> **Modern Portfolio Website** - Built with the latest technology to showcase your work, experience, and certificates professionally.

![Portfolio Preview](https://imgur.com/a/website-COAaqqQ#gcPBtsc) (https://imgur.com/a/website-COAaqqQ#kKL6s9j) (https://imgur.com/a/website-COAaqqQ#gTuajoH) (https://imgur.com/a/website-COAaqqQ#zh5j0br)

## ✨ Key Features

### 🎨 **Modern & Responsive Design**
- Elegant design with smooth animations
- Automatic dark mode
- 100% mobile-friendly

### 🔐 **Admin Dashboard**
- Secure login with authentication
- Manage content without coding
- Drag & drop to reorder content

### 📋 **Complete Content Management**
- ✅ **Projects** - Showcase projects with links
- ✅ **Skills** - List technical skills
- ✅ **Experience** - Work history
- ✅ **Certificates** - Certificates & recognition
- ✅ **About** - Brief profile
- ✅ **Contact** - Interactive contact form

### 🎯 **Special Features**
- 📱 **Certificate Modal** - Click certificate images to view full-size
- 🔄 **Drag & Drop** - Easily reorder content
- 📧 **Email Integration** - Contact form goes directly to email
- 🚀 **Optimal Performance** - Built with Next.js 15

## 🛠️ Technologies Used

<div align="center">
<br>

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-Latest-1B222D?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

## 🚀 Quick Start (For Beginners)

### 📋 Preparation

**What you need:**
- ✅ [Node.js](https://nodejs.org/) (version 18 or newer)
- ✅ [Git](https://git-scm.com/) to clone repository
- ✅ [PostgreSQL](https://www.postgresql.org/) (database)
- ✅ [VS Code](https://code.visualstudio.com/) (recommended editor)

### 🎯 Installation Steps

#### 1. Clone Repository
```bash
git clone https://github.com/Kiritocroft/Portofolio.git
cd Portofolio
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Setup Database

**Option A: Local PostgreSQL**
- Install PostgreSQL on your computer
- Create a new database (example: `portfolio_db`)

**Option B: Online Database (Recommended for Beginners)**
- Use [Supabase](https://supabase.com/) (Free)
- Or [Railway](https://railway.app/) (Free tier)

#### 4. Setup Environment

**Copy environment file:**
```bash
cp .env.example .env
```

**Fill the `.env` file with your data:**
```env
# Database (REQUIRED)
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db"

# NextAuth (For Admin Login)
NEXTAUTH_SECRET="fill-with-long-random-string"
NEXTAUTH_URL="http://localhost:3000"

# Admin Account (REQUIRED)
ADMIN_EMAIL="admin@email.com"
ADMIN_PASSWORD="your-admin-password"

# Email (Optional - for contact form)
RESEND_API_KEY="your-api-key-from-resend.com"
```

#### 5. Setup Database Schema
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed initial data
npx prisma db seed
```

#### 6. Run Development Server
```bash
npm run dev
```

**Open browser:** [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

### 🌐 Visitor Mode
- Open your website
- Explore all sections (Home, About, Projects, Skills, Experience, Certificates, Contact)
- Click certificate images to view in full size

### 🔐 Admin Mode (To Manage Content)

**Login to Admin Panel:**
1. Open [http://localhost:3000/admin](http://localhost:3000/admin)
2. Enter admin email & password (set in `.env`)
3. You'll enter the admin dashboard

**Managing Content:**
- **Projects**: Add, edit, delete projects
- **Skills**: Manage skills list
- **Experience**: Update work history
- **Certificates**: Upload new certificates
- **About**: Update brief profile

**Tips for Reordering Content:**
- Use drag & drop to reorder
- Click "Reorder" button to save order

## 🚀 Deploy to Internet (Free)

### Option 1: Vercel (Recommended)
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Portfolio ready to deploy"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Open [vercel.com](https://vercel.com)
   - Login with GitHub
   - Import your repository
   - Set environment variables
   - Deploy!

### Option 2: Netlify
- Open [netlify.com](https://netlify.com)
- Connect to GitHub
- Auto deploy every push

## 📚 Complete Guide

### 🔧 Environment Variables Detail

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dbname` |
| `NEXTAUTH_SECRET` | ✅ | Random string for auth | `your-super-secret-key-here` |
| `NEXTAUTH_URL` | ✅ | Your website URL | `https://yourdomain.com` |
| `ADMIN_EMAIL` | ✅ | Admin login email | `admin@yourdomain.com` |
| `ADMIN_PASSWORD` | ✅ | Admin password | `strongpassword123` |
| `RESEND_API_KEY` | ❌ | For contact form | `re_xxxxxxxxxxxx` |

### 📖 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profile` | GET/POST | User profile |
| `/api/projects` | GET/POST/PUT/DELETE | Project management |
| `/api/skills` | GET/POST/PUT/DELETE | Skills management |
| `/api/experiences` | GET/POST/PUT/DELETE | Experience management |
| `/api/certificates` | GET/POST/PUT/DELETE | Certificate management |
| `/api/about` | GET/POST | About content |
| `/api/auth/*` | POST | Authentication |
| `/api/upload` | POST | Image upload |

## 🐛 Troubleshooting (Common Issues)

### ❌ "Database connection failed"
**Solution:**
1. Check `DATABASE_URL` in `.env`
2. Make sure PostgreSQL is running
3. Test connection: `npx prisma db push`

### ❌ "Failed to save content"
**Solution:**
1. Check browser console (F12)
2. Check terminal for error details
3. Test auth: `curl http://localhost:3000/api/test-auth`
4. Test DB: `curl http://localhost:3000/api/test-db`

### ❌ "Can't login to admin"
**Solution:**
1. Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`
2. Restart server after changing `.env`
3. Clear browser cache

### ❌ "Images not loading"
**Solution:**
1. Check `public/uploads` folder exists
2. Check folder permissions
3. Check upload size limit

## 🎨 Customization

### Change Theme Colors
Edit file `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#your-color-50',
    // ... change colors as you like
  }
}
```

### Change Font
Edit `app/layout.tsx`:
```typescript
const font = Inter({ 
  subsets: ['latin'],
  // replace with your favorite font
})
```

### Add New Section
1. Create new component in `components/`
2. Add to `app/page.tsx`
3. Update navigation in `lib/data.ts`

## 🤝 Contributing

Want to contribute? **Great!**

1. Fork this repository
2. Create your feature branch (`git checkout -b amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - free to use for personal & commercial projects!

## 🆘 Need Help?

**How to get help:**
1. 📖 Read the documentation above first
2. 🔍 Check [Issues](https://github.com/Kiritocroft/Portofolio/issues) on GitHub
3. 💬 Ask in [Discussions](https://github.com/Kiritocroft/Portofolio/discussions)
4. 📧 Email: [nabil@example.com](mailto:nabilathaillah33@gmail.com)

---

<div align="center">

**⭐ Give a star if this helps!**

**Made with ❤️ by Muhammad Nabil Athaillah**

</div>