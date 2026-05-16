import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3),

  description: z.string().optional(),

  status: z.string(),

  priority: z.string(),

  dueDate: z.string().optional(),

  projectId: z.number(),
});