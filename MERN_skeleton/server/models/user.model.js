// USER MODEL IMPLEMENTATION
import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    //stores users name, etc..
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/ , 'Please enter a valid email address'],
        required: 'Email is required'
    },
    //generates timestamps recorded to indicate when user is created and user data is updated:
    created: {
        type: Date,
        default: Date.now
    },
    updated: {type: Date},
    //encrypted user password used for authentication:
    hashed_password: {
        type: String,
        required: "Password is required"
    },
    salt: {type: String}
});
//handle password string as virtual field
userSchema.virtual('password').set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function(){
    return this._password;
});

//BUSINESS LOGIC
//encryption and authentication
userSchema.methods = {
    //verify sign-on attempts
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    //generate encrypted hash from the plain-text password and a unique salt value using crypto module from Node
    encryptPassword: function(password){
        if(!password){
            return '';
        }
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        } catch (err){
            return '';
        }
    },
    //to ensure two users dont end up with same hashed password by using same text passowrd, add a unique salt value before generating the hashed password for each user:
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
};
//password validation associated with hashed_password field in schema:
userSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length <6){
        this.invalidate('password', 'password must be at least 6 characters long.');
    }
    if(this.isNew && !this._password){
        this.invalidate('password', 'Password is required');
    }
}, null);


//user model  exported to be used by the rest of backend code
//now we can use this user model to extend backend functionality...
export default mongoose.model('User', userSchema);

