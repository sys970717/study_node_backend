import { Router } from "express";
const router = Router();

router.get("/", (req, res, next) => {
  return res.send('HIHIh');
});

export default router;