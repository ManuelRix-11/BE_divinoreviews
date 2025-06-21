import { Router, Request, Response } from "express";
import { Review } from "../models/Review";
import { ReviewService } from "../services/ReviewService";

const router = Router();
const reviewService = new ReviewService();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API per gestire le recensioni
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Ottieni tutte le recensioni
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Lista di recensioni
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getAll();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero delle recensioni" });
    }
});

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Crea una nuova recensione
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Recensione creata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Dati di input non validi
 */
router.post("/", async (req: Request, res: Response) => {
    try {
        // creo un oggetto Review con i dati ricevuti (senza id)
        const review = new Review(
            req.body._taster_twitterID,
            req.body._taster_name,
            req.body._wineTitle,
            req.body._wineVariety,
            req.body._winery,
            req.body._points
        );
        const createdReview = await reviewService.add(review);
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione della recensione" });
    }
});

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID univoco della recensione
 *         _taster_twitterID:
 *           type: string
 *           description: Twitter ID del recensore
 *         _taster_name:
 *           type: string
 *           description: Nome del recensore
 *         _wineTitle:
 *           type: string
 *           description: Titolo del vino
 *         _wineVariety:
 *           type: string
 *           description: Varietà del vino
 *         _winery:
 *           type: string
 *           description: Cantina
 *         _points:
 *           type: integer
 *           description: Punteggio dato al vino
 *       required:
 *         - _taster_twitterID
 *         - _taster_name
 *         - _wineTitle
 *         - _wineVariety
 *         - _winery
 *         - _points
 *     ReviewInput:
 *       type: object
 *       properties:
 *         _taster_twitterID:
 *           type: string
 *         _taster_name:
 *           type: string
 *         _wineTitle:
 *           type: string
 *         _wineVariety:
 *           type: string
 *         _winery:
 *           type: string
 *         _points:
 *           type: integer
 *       required:
 *         - _taster_twitterID
 *         - _taster_name
 *         - _wineTitle
 *         - _wineVariety
 *         - _winery
 *         - _points
 */
