// const mongoose = require('mongoose')
import mongoose from "mongoose"

const SubsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    subsToChannel: {
        type: String,
        required: true,
    },
    subsDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default mongoose.model("TestSchemaSubs",SubsSchema)




