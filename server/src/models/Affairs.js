import mongoose from "mongoose";

const AffairSchema = mongoose.Schema({
    theme: {
        type: String,
        required: true,
        validate: {
            validator: (value) => value.length <= 100, 
            message: "Theme should be a string with a maximum length of 100 characters.",
        },
    },

    date: {
        type: Date,
        required: true,
        index: true, // Add index for the date field
    },

    location: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    imageUrl: {
        type: String,
        // required: true,
    },
    
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
});

export const AffairModel = mongoose.model("Affairs", AffairSchema);