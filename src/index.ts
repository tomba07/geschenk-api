import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to get all projects
app.get("/projects", async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(id) }, // Ensure id is converted to a number
      include: {
        participants: true, // Assuming 'participants' is the correct relation
      },
    });
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to create a new project
app.post("/projects", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: { name },
    });
    res.status(201).json(newProject);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/participants", async (req: Request, res: Response) => {
  const { projectId, name } = req.body;
  try {
    const newParticipant = await prisma.participant.create({
      data: {
        projectId: Number(projectId),
        name,
      },
    });
    res.status(201).json(newParticipant);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
