import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res)=>{
    res.json({
        message:"Api route is working"
    })
};

export const updateUser = async (req, res, next) =>{
   if(req.user.id !== req.params.id) return next (errorHandler(401, 'You are not authenticated!'))

   try{
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        }
    }, {new: true})

    const {password, ...rest} = updatedUser._doc;
    res.status(201).json(rest);
   }
   catch(error){
    next(error)
   }
}

export const updatePassword = async(req, res, next) =>{
    try
    {
        if(req.user.id !== req.params.id) return next (errorHandler(401, 'You are not authenticated!'));
        const newUser = await User.findById({_id: req.params.id})
        const verifyPass = bcryptjs.compareSync(req.body.password, newUser.password);
        console.log(verifyPass)
        if(!verifyPass) return next(errorHandler(400,"Invalid Password"));
         
        if(!(req.body.newPassword === req.body.confirmPassword))
        {
            return next(errorHandler("500","Password mismatch!"))
        }
        const newHasedPassword = bcryptjs.hashSync(req.body.newPassword,10);
        
        const updatePassword = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                password: newHasedPassword
            }
        })
        res.status(201).json("password changed successfully!")
    }
    catch(error){
        return next(errorHandler(error))
    }
}