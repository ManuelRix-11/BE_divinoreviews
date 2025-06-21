import { Request, Response } from 'express';
import { ReviewService } from '../services/ReviewService';
import { Review } from '../models/Review';

const reviewService = new ReviewService();

export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getAll();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Errore nel recupero delle recensioni' });
    }
};

export const addReview = async (req: Request, res: Response) => {
    try {
        const { taster_twitterID, taster_name, wineTitle, wineVariety, winery, points } = req.body;

        const review = new Review(
            taster_twitterID,
            taster_name,
            wineTitle,
            wineVariety,
            winery,
            points
        );

        const saved = await reviewService.add(review);
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: 'Errore nella creazione della recensione' });
    }
};