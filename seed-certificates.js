const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedCertificates() {
  const certificates = [
    {
      title: "Web Development Certification",
      description: "Complete web development course covering HTML, CSS, JavaScript, and modern frameworks",
      imageUrl: "/sertifikat1.jpg",
      issueDate: "2024-01-15",
      issuer: "Tech Academy",
      order: 1
    },
    {
      title: "React & Next.js Mastery",
      description: "Advanced certification in React, Next.js, and modern frontend development",
      imageUrl: "/sertifikat2.jpg",
      issueDate: "2024-03-20",
      issuer: "Frontend Masters",
      order: 2
    },
    {
      title: "Full Stack Development",
      description: "Comprehensive full stack development including backend APIs and database management",
      imageUrl: "/sertifikat3.png",
      issueDate: "2024-05-10",
      issuer: "Developer Institute",
      order: 3
    },
    {
      title: "Cloud Computing Essentials",
      description: "Certification in cloud computing, deployment, and modern DevOps practices",
      imageUrl: "/sertifikat4.png",
      issueDate: "2024-07-05",
      issuer: "Cloud Tech Solutions",
      order: 4
    }
  ];

  try {
    console.log('Seeding certificates...');
    
    for (const cert of certificates) {
      await prisma.certificate.create({
        data: cert
      });
      console.log(`Created certificate: ${cert.title}`);
    }
    
    console.log('Certificates seeded successfully!');
  } catch (error) {
    console.error('Error seeding certificates:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCertificates();