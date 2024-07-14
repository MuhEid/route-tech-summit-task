import Category from "../../../DB/models/category.model.js";
import Task from "../../../DB/models/task.model.js";
import { pagination } from "../../utils/paginate.js";

export const addTask = async (req, res, next) => {
    const { taskName, taskType, textBody, listItems, isPrivate } = req.body;
    const { categoryId } = req.params;
    const { id } = req.token;

    if (taskType === "text" && textBody) {
        const createdTask = await Task.create({
            taskName,
            taskType,
            textBody,
            isPrivate,
            userId: id,
            categoryId,
        });

        return res.status(200).json({ message: "Task Created", status: 200, createdTask });
    } else if (
        taskType === "list" &&
        listItems &&
        Array.isArray(listItems) &&
        listItems.length > 0
    ) {
        const createdTask = await Task.create({
            taskName,
            taskType,
            listItems,
            isPrivate,
            userId: id,
            categoryId,
        });

        return res.status(200).json({ message: "Task Created", status: 200, createdTask });
    }
};

export const updateTask = async (req, res, next) => {
    const { taskName, taskType, textBody, listItems, isPrivate } = req.body;
    const { taskId } = req.params;

    const isTaskExist = await Task.findById(taskId);

    if (!isTaskExist) {
        return res.status(401).json({ message: "Task Not Found" });
    }
    const updatedTask = {
        taskName,
        taskType,
        textBody,
        listItems,
        isPrivate,
    };

    if (taskType === "text" && textBody) {
        const newTask = await Task.findByIdAndUpdate(
            categoryId,
            { $set: updatedCategory },
            { new: true } // Return the updated document
        );

        return res.status(200).json({ message: "Task updated", status: 200, newTask });
    } else if (
        taskType === "list" &&
        listItems &&
        Array.isArray(listItems) &&
        listItems.length > 0
    ) {
        const newTask = await Task.findByIdAndUpdate(
            categoryId,
            { $set: updatedTask },
            { new: true } // Return the updated document
        );

        return res.status(200).json({ message: "Task Updated", status: 200, newTask });
    }
};

export const getAllTasks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.size) || 10;
    const isPrivate = req.query.isPrivate === "true";
    const categoryName = req.query.categoryName;

    const { limit, skip } = pagination({ page, size });

    try {
        let filter = {};
        if (isPrivate !== undefined) {
            filter.isPrivate = isPrivate;
        }
        if (categoryName) {
            const category = await Category.findOne({ categoryName: categoryName });
            if (category) {
                filter.categoryId = category._id;
            } else {
                return res.status(404).json({ message: "Category not found" });
            }
        }

        const tasks = await Task.find(filter).skip(skip).limit(limit).populate("categoryId");
        return res.json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tasks", error });
    }
};

export const deleteTask = async (req, res, next) => {
    const { taskId } = req.params;
    const deleted = await Task.findOneAndDelete({ _id: taskId });
    if (!deleted) {
        return res.status(400).json({ message: "Task Delete failed" });
    }
    return res.status(200).json({ message: "Task Delete success" });
};
