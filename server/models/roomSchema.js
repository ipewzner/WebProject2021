import mongoose from 'mongoose';

const roomSchema = mongoose.Schema({
    name:String, 
    image:String,
    admin:{ type:String, require: "creator is required" },
    users:[ { type: Array, default: void 0 }],
    massges:[{ type: Array}],
    approved:{type:Boolean, default:false}
});
const Rooms= mongoose.model('Rooms',roomSchema);

export default Rooms;