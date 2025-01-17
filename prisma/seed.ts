import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      // Add fields if needed, e.g., name, email, etc.
    },
  });

  console.log("Created user:", user);

  // Create a project with the created user
  const project = await prisma.project.create({
    data: {
      name: "Secret Santa",
      assigned: true,
      user: {
        connect: { id: user.id }, // Connect the project to the user
      },
      participants: {
        create: [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }],
      },
    },
  });

  console.log("Seeded project with participants:", { project });

  // Create assignments for participants
  const assignments = await prisma.assignment.createMany({
    data: [
      {
        projectId: project.id,
        fromName: "Alice",
        toName: "Bob",
      },
      {
        projectId: project.id,
        fromName: "Bob",
        toName: "Charlie",
      },
      {
        projectId: project.id,
        fromName: "Charlie",
        toName: "Alice",
      },
    ],
  });

  console.log("Created assignments:", { assignments });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
