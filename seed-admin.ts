import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function seedAdminUser() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || "nabilganteng03@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "nabil0123$$$???";
    
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
    
  } catch (error: any) {
    console.error("❌ Error creating admin user:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdminUser();