import mongoose from 'mongoose'
const messageSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    to:{
        type: String,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    by:{
        type:String,
        // type: mongoose.Schema.Types.ObjectId,
        // ref:'User'
        
    },
    // createdAt:{
    //     type:Date,
    //     default:Date.now()
    // }

},
{
    timestamps: true
})


mongoose.model('Message', messageSchema)

