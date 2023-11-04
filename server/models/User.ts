import {Document, Schema, model, Model} from 'mongoose';
import bcrypt from 'bcryptjs';

import {Deck} from '../interface';

interface IUserDocument extends Document {
    username: string
    email: string
    password: string
    profileImg: string
    decks: Deck[]
    config: Object
    sharedWithMe: {author: string, deckId: string}[]
}

interface IUserModel extends Model<IUserDocument> {
    encryptPassword: (password: string) => Promise<string>;
    verifyPassword: (password: string, hash: string) => Promise<boolean>
};

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String,
        required: false,
    },
    sharedWithMe: [{
        author: String, deckId: String
    }],
    decks: [{
        name: String,
        backgroundColor: String,
        backgroundImage: String,
        options: Object,
        shareWith: [String],
        cards: 

            [{
                
            front: String, 
            back: String,

            frontImg: {
                type: {title: String, data: String},
                required: false
            },

            backImg:{
                type: {title: String, data: String},
                required: false
            },

            frontAudio:{
                type: {data: String},
                required: false
            },

            backAudio:{
                type: {data: String},
                required: false
            }

            }]

    }],
    config: {
        type: Object
    }
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.statics.encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

UserSchema.statics.verifyPassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}

const User : IUserModel = model<IUserDocument, IUserModel>("User", UserSchema);

export default User;