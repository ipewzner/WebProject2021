//var mongoose = require('mongoose');

import mongoose from 'mongoose';

var massgesSchema = mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, require: "room is required", ref: "roomSchema" },
    creatorName:String,
    creatorEmail:String,
   // creator: { type: mongoose.Schema.Types.ObjectId, ref: "userSchema" },
    cretionTime: String,
    image:{img:String,mime:String,name:String},
    likes: [],
    dislikes: [],
    msg: String,
    time: Date,
    toAdmin:{type:Boolean, default:false}    
});
const Massges = mongoose.model('massges', massgesSchema)

export default Massges;