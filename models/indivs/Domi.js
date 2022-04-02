import mongoose from "mongoose"
// import Item from "./Items.js"

const DomiSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateMade:{
        type: Date,
        required: true,
        default: Date.now()
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    MNC:{
        type: Number,
        required: true,
        default: 3,
    },
    itemBank: [{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Items',
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        dateMade:{
            type: Date,
            required: true,
            default: Date.now()
        },
        class: {
            type: String,
        },
        style:{
            type: String,
        },
        rarity:{
            type: String,
        },
        stats: {
            ATK:{
                type: Number,
                required:true,
                default: 0
            },
            SPD:{
                type: Number,
                required:true,
                default: 0
            },
            RNG:{
                type: Number,
                required:true,
                default: 0,
            },
            HP:{
                type: Number,
                required:true,
                default: 0,
            },
            LCK:{
                type: Number,
                required:true,
                default: 0,
            },
            ATR:{
                type: Number,
                required:true,
                default: 200
            }
        }
    }]
})

export default mongoose.model("Domis",DomiSchema)




