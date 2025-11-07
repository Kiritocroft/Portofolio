const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const adminEmail = "nabilganteng03@gmail.com";
    const adminPassword = "nabil0123$$$???";
    
    console.log(`Checking if admin user exists: ${adminEmail}`);
    
    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (existingUser) {
      console.log("✅ Admin user already exists");
      console.log("User ID:", existingUser.id);
      return;
    }
    
    console.log("❌ Admin user not found, creating new admin user...");
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    // Create the admin user
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
      }
    });
    
    console.log("✅ Admin user created successfully!");
    console.log("User ID:", adminUser.id);
    console.log("Email:", adminUser.email);
    
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();