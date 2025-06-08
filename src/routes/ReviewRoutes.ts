import {Router} from "express";
import {loadAllReviews} from "../controller/loadReviews";

const router = Router();

router.get('/reviews/getAll', loadAllReviews);

export default router;