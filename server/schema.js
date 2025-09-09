import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const paperSchema = new Schema({
    paperID: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true
    },
    authors: [String],
    summary: {
        type: String,
        required: true
    },
    paperLink: {
        type: String,
        required: true
    },
    publishedDate: String
});

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paper: {
        type: Schema.Types.ObjectId,
        ref: 'Paper',
        required: true
    },
    parentComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},);


const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paper: {
        type: Schema.Types.ObjectId,
        ref: 'Paper',
        required: true
    },
        createdAt: {
        type: Date,
        default: Date.now
    }
},);

// users can only like a specific paper once
likeSchema.index({ user: 1, paper: 1 }, { unique: true });


const User = mongoose.model('User', userSchema);
const Paper = mongoose.model('Paper', paperSchema);
const Comment = mongoose.model('Comment', commentSchema);
const Like = mongoose.model('Like', likeSchema);

export { User, Paper, Comment, Like };