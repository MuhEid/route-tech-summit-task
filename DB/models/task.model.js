import { model, Schema, Types } from "mongoose";

const taskSchema = new Schema(
    {
        taskName: {
            type: String,
            required: true,
        },
        taskType: {
            type: String,
            enum: ["list", "text"],
        },
        textBody: {
            type: String,
        },
        listItems: [
            {
                text: {
                    type: String,
                    required: true,
                },
            },
        ],
        categoryId: {
            type: Types.ObjectId,
            ref: "Category",
            required: true,
        },
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        isPrivate: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Task = model("Task", taskSchema);
export default Task;
