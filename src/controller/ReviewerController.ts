import { Request, Response } from "express";
import { ReviewerService } from "../services/ReviewerService";
import { Reviewer } from "../models/Reviewer";

const reviewerService = new ReviewerService();

export const getAllReviewers = async (req: Request, res: Response) => {
    try {
        const reviewers = await reviewerService.getAll();
        res.status(200).json(reviewers);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero dei reviewers" });
    }
};

export const addReviewer = async (req: Request, res: Response) => {
    try {
        const { twitterID, name } = req.body;
        const reviewer = new Reviewer(twitterID, name);
        const saved = await reviewerService.add(reviewer);
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione del reviewer" });
    }
};
