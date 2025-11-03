import { Router, Request, Response } from "express";
import {
  TaskSchema,
  TaskListSchema,
  CreateTaskSchema,
  UpdateTaskSchema,
  TaskCommentSchema,
  type Task,
  type CreateTask,
  type UpdateTask,
  type TaskComment,
} from "../../../shared/negotiation/tasks.js";

const router = Router();

// Mock data - replace with actual database operations
let tasks: Task[] = [
  {
    id: "task-001",
    dealId: "deal-001",
    propertyId: "prop-001",
    propertyName: "Canary Wharf Office Complex",
    title: "Review lease agreement terms",
    description: "Comprehensive review of all lease terms and conditions",
    type: "legal",
    priority: "high",
    status: "in_progress",
    assignedTo: "Legal Team",
    assignedBy: "Sarah Chen",
    dueDate: new Date("2024-11-10").toISOString(),
    estimatedHours: 8,
    actualHours: 5,
    dependencies: [],
    tags: ["lease", "legal-review"],
    attachments: [],
    comments: [],
    checklist: [
      {
        id: "check-001",
        item: "Review rent escalation clauses",
        completed: true,
        completedAt: new Date("2024-11-02").toISOString(),
        completedBy: "Legal Team",
      },
      {
        id: "check-002",
        item: "Verify break clause conditions",
        completed: false,
      },
    ],
    createdAt: new Date("2024-10-25").toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "Sarah Chen",
  },
];

// GET /api/negotiation/tasks
router.get("/", (req: Request, res: Response) => {
  try {
    const { status, type, assignedTo, priority } = req.query;

    let filteredTasks = tasks;

    // Apply filters
    if (status) {
      filteredTasks = filteredTasks.filter(t => t.status === status);
    }
    if (type) {
      filteredTasks = filteredTasks.filter(t => t.type === type);
    }
    if (assignedTo) {
      filteredTasks = filteredTasks.filter(t => t.assignedTo === assignedTo);
    }
    if (priority) {
      filteredTasks = filteredTasks.filter(t => t.priority === priority);
    }

    const validatedTasks = TaskListSchema.parse(filteredTasks);
    res.json(validatedTasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// GET /api/negotiation/tasks/:id
router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const validatedTask = TaskSchema.parse(task);
    res.json(validatedTask);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// POST /api/negotiation/tasks
router.post("/", (req: Request, res: Response) => {
  try {
    const validatedData = CreateTaskSchema.parse(req.body);

    const newTask: Task = {
      ...validatedData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "Current User", // TODO: Get from auth context
      comments: [],
      attachments: [],
    };

    tasks.push(newTask);

    const validatedTask = TaskSchema.parse(newTask);
    res.status(201).json(validatedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: "Invalid task data" });
  }
});

// PUT /api/negotiation/tasks/:id
router.put("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedData = UpdateTaskSchema.parse(req.body);

    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask: Task = {
      ...tasks[taskIndex],
      ...validatedData,
      updatedAt: new Date().toISOString(),
    };

    // Set completion date if status changed to completed
    if (
      validatedData.status === "completed" &&
      tasks[taskIndex].status !== "completed"
    ) {
      updatedTask.completedDate = new Date().toISOString();
    }

    // Clear completion date if status changed from completed
    if (
      validatedData.status !== "completed" &&
      tasks[taskIndex].status === "completed"
    ) {
      updatedTask.completedDate = undefined;
    }

    tasks[taskIndex] = updatedTask;

    const validatedTask = TaskSchema.parse(updatedTask);
    res.json(validatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(400).json({ error: "Invalid task data" });
  }
});

// POST /api/negotiation/tasks/:id/comments
router.post("/:id/comments", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validatedComment = TaskCommentSchema.parse(req.body);

    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    const newComment = {
      id: `comment-${Date.now()}`,
      author: "Current User", // TODO: Get from auth context
      content: validatedComment.content,
      createdAt: new Date().toISOString(),
    };

    tasks[taskIndex].comments.push(newComment);
    tasks[taskIndex].updatedAt = new Date().toISOString();

    const validatedTask = TaskSchema.parse(tasks[taskIndex]);
    res.json(validatedTask);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(400).json({ error: "Invalid comment data" });
  }
});

// PUT /api/negotiation/tasks/:id/checklist/:checkId
router.put("/:id/checklist/:checkId", (req: Request, res: Response) => {
  try {
    const { id, checkId } = req.params;
    const { completed } = req.body;

    if (typeof completed !== "boolean") {
      return res
        .status(400)
        .json({ error: "Completed status must be a boolean" });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    const checklistItemIndex = tasks[taskIndex].checklist.findIndex(
      c => c.id === checkId
    );
    if (checklistItemIndex === -1) {
      return res.status(404).json({ error: "Checklist item not found" });
    }

    tasks[taskIndex].checklist[checklistItemIndex].completed = completed;

    if (completed) {
      tasks[taskIndex].checklist[checklistItemIndex].completedAt =
        new Date().toISOString();
      tasks[taskIndex].checklist[checklistItemIndex].completedBy =
        "Current User"; // TODO: Get from auth context
    } else {
      tasks[taskIndex].checklist[checklistItemIndex].completedAt = undefined;
      tasks[taskIndex].checklist[checklistItemIndex].completedBy = undefined;
    }

    tasks[taskIndex].updatedAt = new Date().toISOString();

    const validatedTask = TaskSchema.parse(tasks[taskIndex]);
    res.json(validatedTask);
  } catch (error) {
    console.error("Error updating checklist item:", error);
    res.status(500).json({ error: "Failed to update checklist item" });
  }
});

// DELETE /api/negotiation/tasks/:id
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
