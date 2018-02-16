import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    timestamp:{
        type:Date,
        default:Date.now()
    },
    title:{
        type:String,
        default:'',
        required:true
    },
    content:{
        type: String,
        default:'',
        required:true
    },
    photoUrl:{
        type: String,
        default:''
    }
});


export default mongoose.model('Post',PostSchema);