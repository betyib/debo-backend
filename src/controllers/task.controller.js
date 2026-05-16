import prisma from "../config/db.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      dueDate,
      projectId,
    } = req.body;

    // check project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: Number(projectId),
        ownerId: req.user.userId,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId: Number(projectId),
        assignedToId: req.user.userId,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET TASKS BY PROJECT
export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    // verify ownership
    const project = await prisma.project.findFirst({
      where: {
        id: Number(projectId),
        ownerId: req.user.userId,
      },
    });

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET SINGLE TASK
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        project: true,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // verify ownership
    if (task.project.ownerId !== req.user.userId) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      status,
      priority,
      dueDate,
    } = req.body;

    const existingTask = await prisma.task.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        project: true,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (existingTask.project.ownerId !== req.user.userId) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const existingTask = await prisma.task.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        project: true,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (existingTask.project.ownerId !== req.user.userId) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateTaskStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { status } = req.body;

      const existingTask =
        await prisma.task.findFirst({
          where: {
            id: Number(id),
          },
          include: {
            project: true,
          },
        });

      if (!existingTask) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      if (
        existingTask.project.ownerId !==
        req.user.userId
      ) {
        return res.status(403).json({
          message: "Unauthorized",
        });
      }

      const updatedTask =
        await prisma.task.update({
          where: {
            id: Number(id),
          },
          data: {
            status,
          },
        });

      res.status(200).json({
        message:
          "Task status updated",
        task: updatedTask,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  };