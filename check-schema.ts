import prisma from "@/lib/prisma";

async function checkSchema() {
  try {
    console.log("Checking if 'link' column exists in Project table...");
    
    // Try to query the projects table with the link field
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        link: true,
      },
      take: 1,
    });
    
    console.log("✅ Successfully queried projects with link field");
    console.log("Sample project:", projects[0]);
    
    // Check if we can create a project with a link
    const testProject = await prisma.project.create({
      data: {
        title: "Test Project",
        description: "Test Description",
        tags: "test",
        imageUrl: "/test.png",
        link: "https://example.com",
      },
      select: {
        id: true,
        title: true,
        link: true,
      }
    });
    
    console.log("✅ Successfully created project with link field");
    console.log("Created project:", testProject);
    
    // Clean up - delete the test project
    await prisma.project.delete({
      where: {
        id: testProject.id,
      }
    });
    
    console.log("✅ Cleaned up test project");
    
  } catch (error) {
    console.error("❌ Error checking schema:", error);
    
    // Try a simpler query to see what fields are available
    try {
      const projects = await prisma.project.findMany({
        take: 1,
      });
      console.log("✅ Basic query works. Sample project:", projects[0]);
    } catch (simpleError) {
      console.error("❌ Even basic query failed:", simpleError);
    }
  } finally {
    await prisma.$disconnect();
  }
}

checkSchema();