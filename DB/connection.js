import mongoose from "mongoose";

const db_connection = async () => {
    await mongoose
        .connect(`mongodb://localhost:27017/${process.env.DATABASE_NAME}`)
        .then((res) => console.log(`${process.env.DATABASE_NAME} connected successfully`))
        .catch((err) => console.log(`db connection failed`, err));
};

export default db_connection;
