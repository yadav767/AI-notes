const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    credits:{
        type:Number,
        default:50,
        mini:0,
    },
    isCreditAvailable:{
        type:Boolean,
        default:true
    },
    notes:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"notes",
        default:[]
    }
},{timestamps:true})

const userModel=mongoose.model("user",userSchema)
module.exports=userModel