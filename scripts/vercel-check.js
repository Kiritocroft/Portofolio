#!/usr/bin/env node

// Script to verify Vercel deployment configuration
const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Vercel deployment configuration...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (fs.existsSync(envPath)) {
  console.log('✅ .env file found');
} else {
  console.log('⚠️  .env file not found');
  console.log('   Please create a .env file based on .env.example');
}

// Check required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD'
];

const missingEnvVars = [];
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

requiredEnvVars.forEach(varName => {
  if (!envContent.includes(varName + '=')) {
    missingEnvVars.push(varName);
  }
});

if (missingEnvVars.length > 0) {
  console.log('\n❌ Missing required environment variables:');
  missingEnvVars.forEach(varName => console.log(`   - ${varName}`));
} else {
  console.log('\n✅ All required environment variables present');
}

// Check package.json scripts
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.scripts && packageJson.scripts.build) {
    if (packageJson.scripts.build.includes('prisma generate')) {
      console.log('✅ Build script includes prisma generate');
    } else {
      console.log('⚠️  Build script should include "prisma generate"');
      console.log('   Current build script:', packageJson.scripts.build);
    }
  }
}

console.log('\n📝 Next steps:');
console.log('1. Ensure all environment variables are set in Vercel project settings');
console.log('2. Deploy to Vercel');
console.log('3. After deployment, test:');
console.log('   - Visit /api/health to check if the app is running');
console.log('   - Visit /api/test-db to check database connectivity');
console.log('   - Try logging in with your admin credentials');
console.log('   - Try saving profile information');