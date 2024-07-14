import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema(
    {
        categoryName: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

categorySchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "categoryId",
});
const Category = model("Category", categorySchema);
export default Category;
