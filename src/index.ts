import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to get all projects
app.get('/projects', async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to create a new project
app.post('/projects', async (req: Request, res: Response) => {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
