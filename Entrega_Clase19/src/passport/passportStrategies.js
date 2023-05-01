import passport from "passport";
import UserManager from "../dao/mongoManager/UsersManager.js";
import { userModel } from "../dao/models/user.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { hashPassword } from "../utils.js";
const userManager = new UserManager();
passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password", // Propiedades de logueo
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const user = await userModel.findOne({ email });
      if (user) {
        return done(null, false);
      }
      const hashNewPassword = await hashPassword(password);
      const newUser = { ...req.body, password: hashNewPassword };
      const newuserBD = await userManager.createUser(newUser);
      done(null, newuserBD);
    }
  )
);

// Funciones obligatorias para que passport pueda encontrar y autenticar el user
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
