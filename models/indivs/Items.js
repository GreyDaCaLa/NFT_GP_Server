import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dateMade:{
        type: Date,
        default: Date.now
    },
    class: {
        type: String,
        default: "NONE"
    },
    style:{
        type: String,
        default: "NONE"
    },
    rarity:{
        type: String,
        default: "BasicBasic"
    },
    durability:{
        type: Number,
        default: 10
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

})

export default mongoose.model("Items",ItemSchema)




