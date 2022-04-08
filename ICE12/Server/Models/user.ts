import mongoose, { PassportLocalSchema } from 'mongoose';
const Schema = mongoose.Schema; // alias
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema
({
    DisplayName: String,
    Username: String,
    EmailAddress: String,
    Created:
    {
        type: Date,
        default: Date.now()
    },
    Updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: "users"
});

UserSchema.plugin(passportLocalMongoose);
const Model = mongoose.model("User", UserSchema as PassportLocalSchema);

declare global
{
    export type UserDocument = mongoose.Document &
    {
        Username: String,
        EmailAddress: String,
        DisplayName: String
    }
}

export default Model;