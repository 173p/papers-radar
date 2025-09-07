import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.connect(url)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("ERROR! FAILED Connecting to MongoDB", err))
};

export default connectDB;