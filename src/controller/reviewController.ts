import { Request, Response } from "express";
import { ReviewService } from "../services/reviewService";

export class ReviewController {
    private recensioneService = new ReviewService();

    createRecensione = async (req: Request, res: Response): Promise<void> => {
        try {
            const recensione = await this.recensioneService.createRecensione(req.body);
            res.status(201).json(recensione);
        } catch (error) {
            res.status(500).json({
                error: "Errore durante la creazione della recensione",
                details: error instanceof Error ? error.message : "Errore sconosciuto"
            });
        }
    };

    getAllRecensioni = async (req: Request, res: Response): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const recensioni = await this.recensioneService.getAllRecensioni(page, limit);
            res.status(200).json(recensioni);
        } catch (error) {
            res.status(500).json({
                error: "Errore nel recupero delle recensioni",
                details: error instanceof Error ? error.message : "Errore sconosciuto"
            });
        }
    };

    getRecensioneById = async (req: Request, res: Response): Promise<void> => {
        try {
            const recensione = await this.recensioneService.getRecensioneById(req.params.id);
            if (!recensione) {
                res.status(404).json({ error: "Recensione non trovata" });
                return;
            }
            res.status(200).json(recensione);
        } catch (error) {
            res.status(500).json({
                error: "Errore nel recupero della recensione",
                details: error instanceof Error ? error.message : "Errore sconosciuto"
            });
        }
    };

    updateRecensione = async (req: Request, res: Response): Promise<void> => {
        try {
            const recensione = await this.recensioneService.updateRecensione(req.params.id, req.body);
            if (!recensione) {
                res.status(404).json({ error: "Recensione non trovata" });
                return;
            }
            res.status(200).json(recensione);
        } catch (error) {
            res.status(500).json({
                error: "Errore durante l'aggiornamento della recensione",
                details: error instanceof Error ? error.message : "Errore sconosciuto"
            });
        }
    };

    deleteRecensione = async (req: Request, res: Response): Promise<void> => {
        try {
            const success = await this.recensioneService.deleteRecensione(req.params.id);
            if (!success) {
                res.status(404).json({ error: "Recensione non trovata" });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                error: "Errore durante la cancellazione della recensione",
                details: error instanceof Error ? error.message : "Errore sconosciuto"
            });
        }
    };

    getRecensioniByWinery = async (req: Request, res: Response): Promise<void> => {
        try {
            const { winery } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const recensioni = await this.recensioneService.getRecensioniByWinery(winery, page, limit);
            res.status(200).json(recensioni);
        } catch (error) {
            res.status(500).json({
                error: "Errore nel recupero delle recensioni per winery",
                details: error instanceof Error ? error.message : "Errore sconosciuto"
            });
        }
    };

    getRecensioniByTaster = async (req: Request, res: Response): Promise<void> => {
        try {
            const { tasterName } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const recensioni = await this.recensioneService.getRecensioniByTaster(tasterName, page, limit);
            res.status(200).json(recensioni);
        } catch (error) {
            res.status(500).json({
                error: "Errore nel recupero delle recensioni per taster",
                details: error instanceof Error ? error.message : "Errore sconosciuto"
            });
        }
    };

    getRecensioniByPointsRange = async (req: Request, res: Response): Promise<void> => {
        try {
            const { minPoints, maxPoints } = req.query;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;

            const min = parseInt(minPoints as string);
            const max = parseInt(maxPoints as string);

            if (isNaN(min) || isNaN(max)) {
                res.status(400).json({ error: "minPoints e maxPoints devono essere numeri" });
                return;
            }

            if (min < 0 || max > 100 || min > max) {
                res.status(400).json({ error: "Intervallo non valido: min <= max, entrambi tra 0 e 100" });
                return;
            }

            const recensioni = await this.recensioneService.getRecensioniByPointsRange(min, max, page, limit);
            res.status(200).json(recensioni);
        } catch (error) {
            res.status(500).json({
                error: "Errore nel recupero delle recensioni per range punti",
                details: error instanceof Error ? error.message : "Errore sconosciuto"
            });
        }
    };
}
