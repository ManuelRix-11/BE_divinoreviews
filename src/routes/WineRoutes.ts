import { Router, Request, Response } from "express";
import { Wine } from "../models/Wine";
import { WineService } from "../services/WineService";

const router = Router();
const wineService = new WineService();

/**
 * @swagger
 * tags:
 *   name: Wines
 *   description: API per gestire i vini
 */

/**
 * @swagger
 * /wines:
 *   get:
 *     summary: Ottieni tutti i vini
 *     tags: [Wines]
 *     responses:
 *       200:
 *         description: Lista di vini
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wine'
 */
router.get("/", async (req: Request, res: Response) => {
    try {
        const wines = await wineService.getAll();
        res.json(wines);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero dei vini" });
    }
});

/**
 * @swagger
 * /wines:
 *   post:
 *     summary: Crea un nuovo vino
 *     tags: [Wines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WineInput'
 *     responses:
 *       201:
 *         description: Vino creato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wine'
 *       400:
 *         description: Dati di input non validi
 */
router.post("/", async (req: Request, res: Response) => {
    try {
        const wine = new Wine(
            req.body._title,
            req.body._variety,
            req.body._winery,
            req.body._country,
            req.body._province,
            req.body._description,
            req.body._region_1,
            req.body._region_2,
            req.body._designation,
            req.body._price
        );
        const createdWine = await wineService.add(wine);
        res.status(201).json(createdWine);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione del vino" });
    }
});

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Wine:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID univoco del vino
 *         _title:
 *           type: string
 *           description: Titolo del vino
 *         _variety:
 *           type: string
 *           description: Varietà del vino
 *         _winery:
 *           type: string
 *           description: Cantina
 *         _country:
 *           type: string
 *           description: Paese di origine
 *         _province:
 *           type: string
 *           description: Provincia
 *         _description:
 *           type: string
 *           description: Descrizione del vino
 *         _region_1:
 *           type: string
 *           description: Regione 1
 *         _region_2:
 *           type: string
 *           description: Regione 2
 *         _designation:
 *           type: string
 *           description: Designazione
 *         _price:
 *           type: number
 *           description: Prezzo
 *       required:
 *         - _title
 *         - _variety
 *         - _winery
 *         - _country
 *         - _province
 *         - _description
 *         - _region_1
 *         - _region_2
 *         - _designation
 *         - _price
 *     WineInput:
 *       type: object
 *       properties:
 *         _title:
 *           type: string
 *         _variety:
 *           type: string
 *         _winery:
 *           type: string
 *         _country:
 *           type: string
 *         _province:
 *           type: string
 *         _description:
 *           type: string
 *         _region_1:
 *           type: string
 *         _region_2:
 *           type: string
 *         _designation:
 *           type: string
 *         _price:
 *           type: number
 *       required:
 *         - _title
 *         - _variety
 *         - _winery
 *         - _country
 *         - _province
 *         - _description
 *         - _region_1
 *         - _region_2
 *         - _designation
 *         - _price
 */
