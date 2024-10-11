import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a few projects
  const project = await prisma.project.create({
    data: {
      name: "Secret Santa",
      participants: {
        create: [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }],
      },
    },
  });

  console.log("Seeded projects:", { project });

  const projectId = project.id;
  const assignments = await prisma.assignment.createMany({
    data: [
      {
        projectId: projectId,
        fromName: "Alice",
        toName: "Bob",
      },
      {
        projectId: projectId,
        fromName: "Bob",
        toName: "Charlie",
      },
      {
        projectId: projectId,
        fromName: "Charlie",
        toName: "Alice",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
