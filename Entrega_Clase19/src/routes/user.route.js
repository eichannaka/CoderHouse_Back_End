import { Router } from "express";
import passport from "passport";

import UserManager from "../dao/mongoManager/UsersManager.js";
const router = Router();
const User = new UserManager();

router.get("/", async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({
      status: "Successfull",
      data: users,
    });
  } catch (error) {
    console.log("ERROR getAllUsers GET", error);
    res.status(500).json({
      status: "Error",
      message: "El archivo no existe o no se puede leer la DB",
    });
  }
});
// router.get("/:uid", async (req, res) => {
//   const { uid } = req.params;
//   try {
//     const user = await User.getUserById(uid);
//     res.status(200).json({
//       status: "Successfull",
//       data: user,
//     });
//   } catch (error) {
//     console.log("ERROR getUserById GET", error);
//     res.status(500).json({
//       status: "Error",
//       message: "El archivo no existe o no se puede leer la DB",
//     });
//   }
// });
router.get("/user/logout", (req, res) => {
  try {
    req.session.destroy((error) => {
      if (error) {
        res.status(400).send({
          status: "Error",
          message: "No se pudo borrar la sesión",
        });
      } else {
        res.status(200).send({
          status: "Successful",
          message: "Se ha borrado la sesión",
        });
      }
    });
  } catch (error) {
    console.log("ERROR EN USER LOGOUNT GET", error);
    res.status(500).send({
      status: "Error",
      message: "Error en destruir la sesion",
    });
  }
});
router.get("/profile", (req, res) => {
  const { user } = req.cookies;
  res.status(200).send({
    status: "Successful",
    data: user,
  });
});
// router.post("/create", async (req, res) => {
//   try {
//     const userCreate = await user.createUser(req.body);
//     if (userCreate === null) {
//       res.status(400).send({
//         status: "Error",
//         message: "Faltan rellenar campos",
//       });
//     } else {
//       res.status(200).send({
//         status: "Successful",
//         data: userCreate,
//       });
//     }
//   } catch (error) {
//     console.log("ERROR createUser POST", error);
//     res.status(500).send("No se pudo crear el usuario");
//   }
// });
//registro con passport
router.post(
  "/registro",
  passport.authenticate("registro", {
    failureRedirect: "/errorRegistro",
    passReqToCallback: true,
  }),
  (req, res) => {
    const { firstName, lastName, email } = req.body;
    (req.session.firstName = firstName),
      (req.session.lastName = lastName),
      (req.session.email = email),
      res.redirect("/home");
  }
);
// Loguea al user con email y password, ademas de verificar el rod del amdministrador del sitio web
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.loginUser(req.body);
    if (user) {
      req.session.email = user.email;
      req.session.firstName = user.firstName;
      req.session.lastName = user.lastName;
      req.session.age = user.age;
      // Verificacion de coed admin
      if (email === "adminCoder@mail.com" && password === "12345") {
        req.session.isAdmin = true;
      } else {
        req.session.isAdmin = false;
      }
      const userData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
      };
      res.cookie("user", userData, { maxAge: 3600000 });
      res.status(200).json({
        status: "Successful",
        data: userData,
      });
    } else {
      res.status(400).json({
        status: "Error",
        message: "Datos incorrectos",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "No se pudo autenticar",
    });
  }
});

export default router;
