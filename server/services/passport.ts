import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import mongoose from "mongoose";
const GoogleStrategy = passportGoogle.Strategy;
import { googleClientID, googleClientSecret } from "../config/keys";
import { IUser, UserSchema } from "../models/User";

const User = mongoose.model<IUser>("users", UserSchema);

export const passportConfig = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((existingUser) => {
          if (existingUser) {
            done(null, existingUser);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then((user) => done(null, user));
          }
        });
      }
    )
  );
};
