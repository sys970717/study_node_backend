import { Router } from "express";
import { asyncHandler } from "../../util/async";
const router = Router();

router.get("/", async (req, res)=> {
  return res.json(req.query);
});

export default router;