import mongoose from "mongoose";

const blog = mongoose.Schema({

    title: {
        type: String
    },
    description: {
        type: String
    },

})