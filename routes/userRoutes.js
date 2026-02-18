import express from "express";
import { getAllUsers, userLogin, userRegistration } from "../controllers/userController.js";

const router = express.Router();


router.post("/registration", userRegistration)
router.post("/login", userLogin)
router.get("/allUsers", getAllUsers)

export default router;