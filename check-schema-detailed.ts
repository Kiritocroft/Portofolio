import prisma from "@/lib/prisma";

async function checkSchemaDetailed() {
  try {
    console.log("🔍 Checking database schema...");
    
    // Check if projects table exists
    const projectCount = await prisma.project.count();
    console.log(`✅ Projects table exists with ${projectCount} records`);
    
    // Try to get project structure
    const sampleProject = await prisma.project.findFirst();
    console.log("✅ Sample project structure:", Object.keys(sampleProject || {}));
    
    // Check if link field exists by trying to query it
    try {
      const projectWithLink = await prisma.project.findMany({
        select: {
          id: true,
          title: true,
          link: true,
        },
        take: 1,
      });
      console.log("✅ Link field exists in projects table");
      console.log("Sample with link:", projectWithLink[0]);
    } catch (linkError: any) {
      console.log("❌ Link field does not exist in projects table");
      console.log("Link error:", linkError.message);
    }
    
    // Check other tables
    const userCount = await prisma.user.count();
    console.log(`✅ Users table exists with ${userCount} records`);
    
    const skillCount = await prisma.skill.count();
    console.log(`✅ Skills table exists with ${skillCount} records`);
    
    console.log("\n🎉 All basic checks passed!");
    
  } catch (error: any) {
    console.error("❌ Error checking schema:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchemaDetailed();