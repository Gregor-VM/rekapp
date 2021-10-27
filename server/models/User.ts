import {Document, Schema, model, Model} from 'mongoose';
import bcrypt from 'bcryptjs';

interface Card{
    _id: string
    front: string
    back: string
}

interface Deck {
    _id: string
    name: string
    backgroundColor: string
    backgroundImage: string
    options: Object,
    cards: Card[]
}

interface IUserDocument extends Document {
    username: string
    email: string
    password: string
    decks: Deck[]
    config: Object
}

interface IUserModel extends Model<IUserDocument> {
    encryptPassword: (password: string) => Promise<string>;
    verifyPassword: (password: string, hash: string) => Promise<boolean>
};

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
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
    decks: [{
        name: String,
        backgroundColor: String,
        backgroundImage: String,
        options: Object,
        cards: [{front: String, back: String}]
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

const User : IUserModel = model<IUserDocument, IUserModel>("User", UserSchema)

export default User;