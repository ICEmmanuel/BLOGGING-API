const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userRouter = express.Router();

userRouter.post(
 '/signup',
 passport.authenticate('signup', { session: false }), async (req, res, next) => {
  res.json({
      message: "You've successfully signed up",
      user: req.user
    });
});

userRouter.post(    
 '/login',
 async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }
            if (!user) {
                const error = new Error('The Username or password you entered is incorrect');
                return next(error);
            }

            req.login(user, { session: false },
                async (error) => {
                    if (error) return next(error);

                    const body = { _id: user._id, email: user.email };
                    
                    //Added expiration time which once exceeded, the user is logged out and required to refresh the token.
                    
                    //Or the user needs to login again
                    
                    const token = jwt.sign({ user: body }, process.env.JWT_SECRET_key, { expiresIn: '1h' });

                    return res.json({ token });
                }
            );
        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
}
);