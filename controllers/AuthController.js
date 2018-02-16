import User from "../models/User";
import config from "../config/main";
import jwt from "jsonwebtoken";

const AuthController = {
    // get all posts
    register(req, res, next) {
        console.log('register called')
        if(!req.body.email || !req.body.password) {
            res.status(402).json({ success: false, message: 'Please enter email and password.' });
        } else {
            console.log('has email and password')
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });
            console.log(newUser);
            // Attempt to save the user
            newUser.save(function(err) {
                if (err) {
                    return res.status(402).json({ success: false, message: 'That email address already exists.'});
                }
                res.status(200).json({ success: true, message: 'Successfully created new user.' });
            });
        }
    },
    authenticate(req,res,next){
        User.findOne({
            email: req.body.email
        }, function(err, user) {
            if (err) throw err;

            if (!user) {
                res.status(402).send({ success: false, message: 'Authentication failed. User not found.' });
            } else {
                // Check if password matches
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // Create token if the password matched and no error was thrown
                        const token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: 10080 // in seconds
                        });
                        res.status(402).json({ success: true, token: 'JWT ' + token });
                    } else {
                        res.status(200).send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                    }
                });
            }
        });
    }
};

export default AuthController;
