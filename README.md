# Personal Portfolio Website

A fully dynamic portfolio website with admin panel to manage all homepage content. Built with modern technologies and beginner-friendly.

<!-- Updated for PostgreSQL deployment -->

![Portfolio Preview](https://i.imgur.com/IHmtXN7.png)
![Portfolio Preview](https://i.imgur.com/KEMBuTw.png)

## ✨ Key Features

- **🎨 Fully Dynamic Content:** All homepage content can be edited directly from admin panel
- **🔐 Admin Panel:** Secure admin panel to manage profile, projects, about, skills, and experience
- **🔄 Drag & Drop Reordering:** Easily reorder skills, projects, and experiences with intuitive drag and drop
- **💾 Database Integration:** Uses MySQL (XAMPP) to store all data
- **📱 Responsive Design:** Perfect display on all devices (mobile, tablet, desktop)
- **🎭 Animations:** Smooth animations with Framer Motion
- **📧 Contact Form:** Contact form integrated with email service
- **🌙 Dark/Light Mode:** Theme switcher for dark and light modes

## 🚀 Quick Start for Beginners

### 1. Prerequisites (Required Software)

**Must install:**
- [Node.js](https://nodejs.org/en/download/) (version 18 or newer)
- [XAMPP](https://www.apachefriends.org/download.html) for Windows (includes MySQL + phpMyAdmin)

**Alternatives for other OS:**
- Mac: [MAMP](https://www.mamp.info/en/downloads/) or [Homebrew](https://brew.sh/)
- Linux: `sudo apt install mysql-server nodejs npm`

### 2. Database Setup (XAMPP)

1. **Start XAMPP:**
   - Open XAMPP Control Panel
   - Click "Start" on Apache and MySQL
   - Make sure both services are green

2. **Create Database:**
   - Open browser, visit http://localhost/phpmyadmin
   - Click "New" in left sidebar
   - Enter database name: `portofolio_db`
   - Click "Create"

### 3. Installation & Setup

1. **Clone repository:**
   ```bash
   git clone https://github.com/Kiritocroft/Portofolio.git
   cd Portofolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   - Copy `.env.example` file to `.env`
   - Edit `.env` file and fill in:
   ```env
   # Database (adjust to your XAMPP setup)
   DATABASE_URL="mysql://root:@localhost:3306/portofolio_db"
   
   # Admin credentials (change to your email and password)
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_secure_password
   
   # Security (generate random strings)
   JWT_SECRET=your_jwt_secret_here
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000
   
   # Email API (optional, for contact form)
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Setup database schema:**
   ```bash
   npx prisma db push
   ```

5. **Seed initial data:**
   ```bash
   npx prisma db seed
   ```

6. **Run the application:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

## 🎛️ How to Use Admin Panel

### Login to Admin
1. Go to http://localhost:3000/login
2. Enter `ADMIN_EMAIL` and `ADMIN_PASSWORD` from your `.env` file
3. Click "Login"

### Managing Content in Admin Panel

After login, you'll access http://localhost:3000/admin with features:

#### 📝 Profile Management
- **Edit name, title, description** displayed in homepage Intro section
- **Upload profile photo** or use default photo
- Click "Save Changes" to save to database

#### 📂 Projects Management
- **Add new project:** Fill title, description, tags (comma separated), image URL
- **Edit project:** Click "Edit" button on existing project
- **Delete project:** Click "Delete" button
- **Reorder projects:** Use drag handle (⋮⋮) to drag and drop projects in desired order
- All changes instantly appear in "My Projects" homepage section

#### 📖 About Management
- **Edit "About me" content** with large textarea
- Supports multiline text
- Click "Save About" to save

#### 🛠️ Skills Management
- **Add new skill:** Enter skill name
- **Delete skill:** Click "Delete" button on existing skill
- **Reorder skills:** Use drag handle (⋮⋮) to drag and drop skills in desired order
- Skills appear in "My Skills" homepage section with animations

#### 💼 Experience Management
- **Add new experience:** Fill title, location, description, date
- **Choose icon:** Dropdown with Work, Education, or Graduation options
- **Delete experience:** Click "Delete" button
- **Reorder experiences:** Use drag handle (⋮⋮) to drag and drop experiences in desired order
- Experience appears in "My Experience" timeline on homepage

### 🔄 Drag & Drop Reordering

The admin panel features intuitive drag and drop functionality for reordering content:

- **Drag Handle:** Look for the `⋮⋮` icon on the left side of each item
- **How to Reorder:** Click and hold the drag handle, then drag the item to your desired position
- **Visual Feedback:** Items become semi-transparent while dragging
- **Auto-Save:** Order changes are automatically saved to the database
- **Separate Controls:** Drag handle is separate from Edit/Delete buttons to prevent conflicts

**Available for:**
- Skills (reorder how they appear in "My Skills" section)
- Projects (reorder project display order)
- Experiences (reorder timeline entries)

### Tips for Beginners

1. **Start with Profile:** Edit name and description first
2. **Add Projects:** Showcase your best projects
3. **Update About:** Tell your story
4. **Fill Skills:** List technologies you know
5. **Add Experience:** Education and work history
6. **Organize Order:** Use drag and drop to arrange content in your preferred order

## 🔧 Troubleshooting

### Database Issues
**Error: "Failed to connect to database"**
- Make sure XAMPP MySQL service is running (green in Control Panel)
- Check database name in phpMyAdmin matches your `.env`
- For XAMPP default: username=`root`, password=empty

**Error: "Table doesn't exist"**
```bash
npx prisma db push
npx prisma db seed
```

### Admin Login Issues
**Cannot login to admin**
- Make sure `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in `.env`
- Run seeding again: `npx prisma db seed`
- Check database in phpMyAdmin, `User` table should have admin data

### Development Issues
**Error: "Module not found"**
```bash
npm install
```

**Error: "Prisma Client not generated"**
```bash
npx prisma generate
npm run dev
```

**Port 3000 already in use**
```bash
# Change port in package.json or kill process using port 3000
npx kill-port 3000
npm run dev
```

## 📁 Project Structure

```
├── app/
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes for CRUD operations
│   ├── login/          # Admin login page
│   └── page.tsx        # Main homepage
├── components/         # React components (About, Skills, Projects, etc.)
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── seed.ts         # Initial database data
├── public/             # Static files (images, CV, etc.)
├── .env.example        # Environment variables template
└── README.md           # This documentation
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to [Vercel](https://vercel.com/)
3. Set environment variables in Vercel dashboard
4. Auto-deploy on every push to main branch

### Deploy to Other Hosting
1. Build production: `npm run build`
2. Upload `.next`, `public`, and other files
3. Setup environment variables on hosting
4. Ensure MySQL database is accessible from hosting

## 📞 Support

If you encounter issues:
1. Check Troubleshooting section above
2. Make sure all prerequisites are installed
3. Check error logs in terminal when running `npm run dev`

## 🎯 Next Steps

After successful setup:
1. Customize content through admin panel
2. Replace profile photo and CV in `public/` folder
3. Adjust colors and styling in `app/globals.css`
4. Deploy to internet for public access

---

**Congratulations! Your portfolio is ready to use! 🎉**