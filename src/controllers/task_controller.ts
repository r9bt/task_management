import { RequestHandler } from "express";
import { taskService } from "../services/task_service";

export const findTaskList: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await taskService.findAll();
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const findTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskService.findOne(Number(id));
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const { content } = req.body as { content: string };
    const task = await taskService.create(content);
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const completeTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body as { isCompleted: boolean };
    const task = await taskService.updateComplete(Number(id), isCompleted);
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body as { content: string };
    const task = await taskService.updateContent(Number(id), content);
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await taskService.delete(Number(id));
    res.status(200).json({ message: result.message });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
