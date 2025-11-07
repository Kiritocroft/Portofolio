import prisma from "@/lib/prisma";

async function addLinkColumn() {
  try {
    console.log("Checking if 'link' column exists...");
    
    // Try to query projects with link field
    const testQuery = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        link: true,
      },
      take: 1,
    });
    
    console.log("✅ Link column already exists!");
    console.log("Sample:", testQuery[0]);
    
  } catch (error: any) {
    if (error.message.includes("link")) {
      console.log("❌ Link column doesn't exist. You need to update your database schema.");
      console.log("\nTo fix this, run one of the following:");
      console.log("1. npx prisma db push  (to push your local schema)");
      console.log("2. Manually add the column through Prisma Data Platform");
      console.log("3. Or create a proper migration:");
      console.log("   npx prisma migrate dev --name add_link_to_project");
    } else {
      console.error("❌ Unexpected error:", error.message);
    }
  } finally {
    await prisma.$disconnect();
  }
}

addLinkColumn();