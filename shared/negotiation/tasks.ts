import { z } from "zod";

// Task schema
export const TaskSchema = z.object({
  id: z.string(),
  dealId: z.string(),
  propertyId: z.string(),
  propertyName: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.enum([
    "legal",
    "technical",
    "financial",
    "administrative",
    "marketing",
  ]),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  status: z.enum(["todo", "in_progress", "blocked", "completed", "cancelled"]),
  assignedTo: z.string(),
  assignedBy: z.string(),
  dueDate: z.string(),
  startDate: z.string().optional(),
  completedDate: z.string().optional(),
  estimatedHours: z.number().min(0).optional(),
  actualHours: z.number().min(0).optional(),
  dependencies: z.array(z.string()),
  tags: z.array(z.string()),
  attachments: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      url: z.string(),
      uploadedAt: z.string(),
    })
  ),
  comments: z.array(
    z.object({
      id: z.string(),
      author: z.string(),
      content: z.string(),
      createdAt: z.string(),
    })
  ),
  checklist: z.array(
    z.object({
      id: z.string(),
      item: z.string(),
      completed: z.boolean(),
      completedAt: z.string().optional(),
      completedBy: z.string().optional(),
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
});

// Task template schema
export const TaskTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum([
    "legal",
    "technical",
    "financial",
    "administrative",
    "marketing",
  ]),
  estimatedHours: z.number().min(0),
  checklist: z.array(
    z.object({
      item: z.string(),
      required: z.boolean(),
    })
  ),
  dependencies: z.array(z.string()),
  tags: z.array(z.string()),
  createdAt: z.string(),
  createdBy: z.string(),
});

export const TaskListSchema = z.array(TaskSchema);
export const TaskTemplateListSchema = z.array(TaskTemplateSchema);

export const CreateTaskSchema = TaskSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  startDate: true,
  completedDate: true,
  actualHours: true,
  comments: true,
});

export const UpdateTaskSchema = TaskSchema.partial().extend({
  id: z.string(),
});

export const CreateTaskTemplateSchema = TaskTemplateSchema.omit({
  id: true,
  createdAt: true,
  createdBy: true,
});

// Task comment schema
export const TaskCommentSchema = z.object({
  taskId: z.string(),
  content: z.string(),
});

// Inferred types
export type Task = z.infer<typeof TaskSchema>;
export type TaskList = z.infer<typeof TaskListSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
export type TaskTemplate = z.infer<typeof TaskTemplateSchema>;
export type TaskTemplateList = z.infer<typeof TaskTemplateListSchema>;
export type CreateTaskTemplate = z.infer<typeof CreateTaskTemplateSchema>;
export type TaskComment = z.infer<typeof TaskCommentSchema>;
