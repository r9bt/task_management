import { RequestHandler } from "express";
import CustomError from "../error/error";
import { Decode } from "../middleware/access_token";
import { taskService } from "../services/task_service";

export const findTaskList: RequestHandler = async (req, res, next) => {
  try {
    const userId = (res.locals.decode as Decode).id;
    const tasks = await taskService.findAll(userId);
    res.status(200).json({ tasks });
  } catch (error) {
    console.log(error);
    next(new CustomError(400, "タスクリスト取得に失敗しました。"));
  }
};

export const findTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = (res.locals.decode as Decode).id;
    const task = await taskService.findOne(Number(id), userId);

    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    if (error.message) return next(error);
    next(new CustomError(400, "タスク取得に失敗しました。"));
  }
};

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const userId = (res.locals.decode as Decode).id;
    const { content } = req.body as { content: string };

    if (!content)
      return next(new CustomError(400, "タスク内容を入力してください。"));

    const task = await taskService.create(content, userId);
    res.status(200).json({
      task: {
        id: task.id,
        userId: task.userId,
        content: task.content,
        isCompleted: task.isCompleted,
      },
    });
  } catch (error) {
    console.log(error);
    next(new CustomError(400, "タスク作成に失敗しました。"));
  }
};

export const completeTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isCompleted } = req.body as { isCompleted: boolean };
    const userId = (res.locals.decode as Decode).id;

    const task = await taskService.updateComplete(
      Number(id),
      isCompleted,
      userId
    );
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    if (error.message) return next(error);
    next(new CustomError(400, "タスク更新に失敗しました。"));
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body as { content: string };
    const userId = (res.locals.decode as Decode).id;

    const task = await taskService.updateContent(Number(id), content, userId);
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
    if (error.message) return next(error);
    next(new CustomError(400, "タスク更新に失敗しました。"));
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = (res.locals.decode as Decode).id;

    const result = await taskService.delete(Number(id), userId);
    res.status(200).json({ message: result.message });
  } catch (error) {
    console.log(error);
    if (error.message) return next(error);
    next(new CustomError(400, "タスク削除に失敗しました。"));
  }
};
