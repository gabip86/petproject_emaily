import passport from "passport";
import passportGoogle from "passport-google-oauth20";
const GoogleStrategy = passportGoogle.Strategy;
import { googleClientID, googleClientSecret } from "../config/keys";

export const passportConfig = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile) => {
        console.log("accessToken: ", accessToken);
        console.log("refreshToken: ", refreshToken);
        console.log("profile: ", profile);
      }
    )
  );
};
