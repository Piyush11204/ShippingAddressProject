import mongoose from "mongoose";

const bloodSchema = new mongoose.Schema(
	{
        name: {
            type: String,
            required: true,
            trim: true,
        },
        bloodGroup:{
            type: String,
            required: true,
            trim: true,
        },
        disease:{
            type: String,
            required: true,
            trim: true,
        },
        NumberofTimesDonated:{
            type: String,
            required: true,
            trim: true
        }
    }
	
);

export const Blood = mongoose.model("Batman", bloodSchema);
