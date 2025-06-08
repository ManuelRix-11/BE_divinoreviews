import {Request, Response} from "express";
import {ReviewService} from "../services/ReviewService";

const reviewService = new ReviewService();

export const loadAllReviews = async(req: Request, res: Response) => {
    try {
        const reviewsList = await reviewService.getAll();
        res.status(200).json(reviewsList);
    } catch (error) {
        console.error('Errore durante il caricamento delle reviews:', error);
        res.status(500).json({
            success: false,
            message: "Errore interno del server"
        });
    }
}
