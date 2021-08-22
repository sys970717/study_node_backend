import { Router } from 'express';
import Board from './board';

const router = Router();

router.use("/board", Board);

export default router;