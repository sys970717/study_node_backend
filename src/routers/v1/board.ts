import { Router } from "express";
import { asyncHandler } from "../../util/asyncHandler";


const appRouter = Router();

appRouter.get('/', asyncHandler(async (req, res, next) => {
  console.log(req.query);
  const data = {
    'name': 'test',
    'point': 0
  };
  return res.json(data);
}));

export default appRouter;