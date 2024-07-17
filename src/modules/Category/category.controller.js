import Category from "../../../DB/models/category.model.js";
import { pagination } from "../../utils/paginate.js";

export const addCategory = async (req, res, next) => {
    const { categoryName } = req.body;
    const { id } = req.token;
    const isCategoryExist = await Category.findOne({ categoryName });
    if (isCategoryExist) {
        return next({ cause: 409, message: "Category already exists" });
    }
    const category = {
        categoryName,
        userId: id,
    };
    const createdCategory = await Category.create(category);
    return res.status(200).json({ message: "Category Created", status: 200, createdCategory });
};

export const updateCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    const { categoryName } = req.body;

    const isCategoryExist = await Category.findById(categoryId);

    if (!isCategoryExist) {
        return res.status(401).json({ message: "Category Not Found" });
    }
    const updatedCategory = {
        categoryName,
    };
    const newCategory = await Category.findByIdAndUpdate(
        categoryId,
        { $set: updatedCategory },
        { new: true } // Return the updated document
    );
    return res.status(200).json({ message: "Category Updated", status: 200, newCategory });
};

export const getAllCategories = async (req, res) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const categoryName = req.query.categoryName;
    const { limit, skip } = pagination({ page, size });

    let filter = {};
    if (categoryName) {
        filter.categoryName = categoryName;
    }

    const categories = await Category.find(filter)
        .skip(skip)
        .limit(limit)
        .populate([
            {
                path: "tasks",
                model: "Task",
            },
        ]);
    return res.json({ categories });
};

export const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params;
    const deleted = await Category.findOneAndDelete({ _id: categoryId });
    if (!deleted) {
        return res.status(400).json({ message: "Category Delete failed" });
    }
    return res.status(200).json({ message: "Category Delete success" });
};
