import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
      where: { id: Number(id) },
      include: {
        participants: true,
        assignments: true,
      },
    });
    res.json(project);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/projects", async (req: Request, res: Response) => {
  try {
    const newProject = await prisma.project.create({
      data: req.body,
    });
    res.status(201).json(newProject);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
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

app.post("/assignments", async (req: Request, res: Response) => {
  const assignments = req.body;

  try {
    const result = await prisma.assignment.createMany({
      data: assignments,
    });
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

//API for deleting all assignments for a project
app.delete("/assignments/:projectId", async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    await prisma.assignment.deleteMany({
      where: { projectId: Number(projectId) },
    });
    res.status(204).end();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
