import mongoose from "mongoose";

const eventSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    desc:{
        type:String,
    },
    location:{
        type:String,
        require:true,
    },
    cat:{
        type:String,
        require:true,
    },
    date:{
        type:Date
    }
},{timestamps:true})

export default mongoose.model("Event",eventSchema)