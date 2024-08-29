import express from "express";
import { login, logout, signup, create, deleteUser, getAll, getOne, update } from "../controller/userController.js";
//import { authMiddleware } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/signup", signup)
route.post("/login", login)
route.get("/logout", logout)

route.post("/create", create);
route.get("/getall", getAll);
route.get("/getone/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

//route.put("/update/:id", authMiddleware, update)
//route.delete("/delete/:id", authMiddleware, deleteUser);

export default route;