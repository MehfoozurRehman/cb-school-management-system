import mongoose from "mongoose";

const SchoolsSchema = new mongoose.Schema({
    schoolName: String,
    phone: String,
    email: String,
    address: String,
    password: String,
    logo: String,
});

export default mongoose.model("Schools") || mongoose.model("Schools", SchoolsSchema);
