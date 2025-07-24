import { PrismaClient } from "@prisma/client";

// Initialize the Prisma Client
const prisma = new PrismaClient();

// Sample data for snippets
const snippetsData = [
  {
    title: "React Functional Component",
    content: `
import React from 'react';

interface MyComponentProps {
  name: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default MyComponent;
    `,
    language: "javascript",
  },
  {
    title: "Center a Div with Flexbox",
    content: `
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
    `,
    language: "css",
  },
  {
    title: "Git Alias for Log",
    content: `
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
    `,
    language: "shell",
  },
  {
    title: "Python Simple API with Flask",
    content: `
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/greet')
def greet():
    return jsonify(message='Hello, World!')

if __name__ == '__main__':
    app.run(debug=True)
    `,
    language: "python",
  },
];

async function main() {
  console.log("🌱 Start seeding...");

  // 1. Clean up the database to ensure a fresh start
  console.log("🗑️ Deleting existing data...");
  // Delete snippets first due to the relation
  await prisma.snippet.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Existing data deleted.");

  // 2. Create a sample user
  console.log("👤 Creating a sample user...");
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      // You can use a service like pravatar.cc for placeholder images
      image: `https://i.pravatar.cc/150?u=alice@example.com`,
    },
  });
  console.log(`✅ Created user: ${user.name} (ID: ${user.id})`);

  // 3. Create snippets for the sample user
  console.log(`📝 Creating snippets for ${user.name}...`);
  for (const snippet of snippetsData) {
    await prisma.snippet.create({
      data: {
        title: snippet.title,
        content: snippet.content,
        language: snippet.language,
        // Connect the snippet to the user we just created
        userId: user.id,
      },
    });
  }
  console.log(`✅ Created ${snippetsData.length} snippets.`);

  console.log("🎉 Seeding finished.");
}

// Execute the main function and handle potential errors
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Ensure the Prisma Client disconnects after the script finishes
    await prisma.$disconnect();
  });
