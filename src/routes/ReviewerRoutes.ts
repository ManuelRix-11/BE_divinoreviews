import { Router, Request, Response } from "express";
import { Reviewer } from "../models/Reviewer";
import { ReviewerService } from "../services/ReviewerService";

const router = Router();
const reviewerService = new ReviewerService();

/**
 * @swagger
 * tags:
 *   name: Reviewers
 *   description: API per gestire i recensori
 */

/**
 * @swagger
 * /reviewers:
 *   get:
 *     summary: Ottieni tutti i recensori
 *     tags: [Reviewers]
 *     responses:
 *       200:
 *         description: Lista di recensori
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reviewer'
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const reviewers = await reviewerService.getAll();
        res.json(reviewers);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero dei recensori" });
    }
});

/**
 * @swagger
 * /reviewers:
 *   post:
 *     summary: Crea un nuovo recensore
 *     tags: [Reviewers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewerInput'
 *     responses:
 *       201:
 *         description: Recensore creato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reviewer'
 *       400:
 *         description: Dati di input non validi
 */
router.post("/", async (req: Request, res: Response) => {
    try {
        const reviewer = new Reviewer(
            req.body._twitterID,
            req.body._name
        );
        const createdReviewer = await reviewerService.add(reviewer);
        res.status(201).json(createdReviewer);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione del recensore" });
    }
});

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Reviewer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID univoco del recensore
 *         _twitterID:
 *           type: string
 *           description: Twitter ID del recensore
 *         _name:
 *           type: string
 *           description: Nome del recensore
 *       required:
 *         - _twitterID
 *         - _name
 *     ReviewerInput:
 *       type: object
 *       properties:
 *         _twitterID:
 *           type: string
 *         _name:
 *           type: string
 *       required:
 *         - _twitterID
 *         - _name
 */
