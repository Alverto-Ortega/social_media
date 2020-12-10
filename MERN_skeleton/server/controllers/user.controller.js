//callbacks to be executed whena route request is received by the server
import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from './error.controller';

//when express app gets a POST request at'api/users' it calls: 
const create = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!"
        });
    }catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};
//when express app gets  a GET request at 'api/users', executes:
const list = async (req,res) => {
    try{
        let users = await User.find().select('name email updated created');
        res.json(users);
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};
//retrieve user in database by id, the next() middleware propagates control in next relevant controller function for example moving on to read controller fn
const userById = async (req, res, next, id) => {
    try{
        let user = await User.findById(id);
        if (!user){
            return res.status('400').json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    } catch (err){
        return res.status('400').json({
            error: "Could not retrieve user"
        });
    }
};
//these operations require retrieving a spec user by ID first
const read = (req, res) => {
    //removes sensitive info before sending the user objvet in respo.
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};
const update = async (req, res) => {
    try{
        let user = req.profile;
        user = extend(user, req.body);
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err){
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};
const remove = async (req, res) => {
    try{
        let user = req.profile;
        let deletedUser = await user.remove(); //remove query deletes user from database
        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;
        res.json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, userById, read, list, remove,update};