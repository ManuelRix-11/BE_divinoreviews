// controllers/WineController.ts
import { Request, Response } from "express";
import { WineService } from "../services/WineService";
import { Wine } from "../models/Wine";

const wineService = new WineService();

export const getAllWines = async (req: Request, res: Response) => {
    try {
        const wines = await wineService.getAll();
        res.status(200).json(wines);
    } catch (error) {
        res.status(500).json({ message: "Errore nel recupero dei vini" });
    }
};

export const addWine = async (req: Request, res: Response) => {
    try {
        const {
            title, variety, winery, country, province,
            description, region_1, region_2, designation, price
        } = req.body;

        const wine = new Wine(
            title, variety, winery, country, province,
            description, region_1, region_2, designation, price
        );

        const saved = await wineService.add(wine);
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: "Errore nella creazione del vino" });
    }
};
