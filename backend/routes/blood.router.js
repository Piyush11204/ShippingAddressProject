// routes/hotelRoutes.js
import { Router } from "express";
import { addDonor, getBlood,showDonor } from "../controllers/blood.controller.js";

const bloodRouter = Router();

bloodRouter.route("/addDonor").post(addDonor);


bloodRouter.route("/showDonor/:name").get(showDonor)

//search by name
export default bloodRouter;
