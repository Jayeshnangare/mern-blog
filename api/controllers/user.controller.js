
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js'

export const test = (req,res) => {
    res.json({message:'API is working'});
    };

export const updateUser = async (req,res,next) => {
    // console.log(req.user);
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'you are not allowed to do that'));
    }

    if(req.body.password){
        if(req.body.password < 6){
            return next(errorHandler(400,'password must br=e at least 6 characters.'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    

    if(req.body.username){
        if(req.body.username < 7 || req.body.username.length > 20){
            return next(errorHandler(400, 'username must between 7 and 20 characters'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400, 'username cannot contain spaces.'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(400, 'username must be lowercase.'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400, 'username can only contain letters and numbers.'));
        }
    }
   

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.userId,{
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
            },
        },{new: true });
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    }
    catch(err){
        next(err);
    }

};

export const deleteUser = async (req,res,next) =>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403, 'you are not allowed to do that'));
    }
    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted.')
    }
    catch(err){
        next(error);
    }
}