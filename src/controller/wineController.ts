import { Request, Response } from 'express';
import { WineService } from '../services/wineService';
import { Wine } from '../models/Wine';

export class WineController {
    private wineService: WineService;

    constructor() {
        this.wineService = new WineService();
    }

    async getAll(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 50;

            if (page < 1 || limit < 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Page e limit devono essere numeri positivi'
                });
            }

            const wines = await this.wineService.getAll(page, limit);
            const totalCount = await this.wineService.countWines();
            const totalPages = Math.ceil(totalCount / limit);

            return res.status(200).json({
                success: true,
                data: wines,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: totalCount,
                    itemsPerPage: limit,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            });
        } catch (error) {
            console.error('Errore nel recupero dei vini:', error);
            return res.status(500).json({
                success: false,
                message: 'Errore interno del server'
            });
        }
    }

    /**
     * Ottiene un vino tramite ID
     * GET /wines/:id
     */
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID del vino richiesto'
                });
            }

            const wine = await this.wineService.getById(id);

            if (!wine) {
                return res.status(404).json({
                    success: false,
                    message: 'Vino non trovato'
                });
            }

            return res.status(200).json({
                success: true,
                data: wine
            });
        } catch (error) {
            console.error('Errore nel recupero del vino:', error);
            return res.status(500).json({
                success: false,
                message: 'Errore interno del server'
            });
        }
    }

    /**
     * Aggiunge un nuovo vino
     * POST /wines
     */
    async add(req: Request, res: Response) {
        try {
            const wineData: Wine = req.body;

            // Validazione dei campi obbligatori
            if (!wineData.title || !wineData.variety || !wineData.winery) {
                return res.status(400).json({
                    success: false,
                    message: 'Campi obbligatori mancanti: title, variety, winery'
                });
            }

            // Verifica se il vino esiste già
            const existingWine = await this.wineService.getWineByDetails(
                wineData.title,
                wineData.variety,
                wineData.winery
            );

            if (existingWine) {
                return res.status(409).json({
                    success: false,
                    message: 'Vino già esistente con questi dettagli'
                });
            }

            const newWine = await this.wineService.add(wineData);

            return res.status(201).json({
                success: true,
                data: newWine,
                message: 'Vino creato con successo'
            });
        } catch (error) {
            console.error('Errore nella creazione del vino:', error);
            return res.status(500).json({
                success: false,
                message: 'Errore interno del server'
            });
        }
    }

    /**
     * Aggiorna un vino esistente
     * PUT /wines/:id
     */
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const wineData: Partial<Wine> = req.body;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID del vino richiesto'
                });
            }

            if (Object.keys(wineData).length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Nessun dato da aggiornare fornito'
                });
            }

            const updatedWine = await this.wineService.update(id, wineData);

            if (!updatedWine) {
                return res.status(404).json({
                    success: false,
                    message: 'Vino non trovato'
                });
            }

            return res.status(200).json({
                success: true,
                data: updatedWine,
                message: 'Vino aggiornato con successo'
            });
        } catch (error) {
            console.error('Errore nell\'aggiornamento del vino:', error);
            return res.status(500).json({
                success: false,
                message: 'Errore interno del server'
            });
        }
    }

    /**
     * Elimina un vino
     * DELETE /wines/:id
     */
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    success: false,
                    message: 'ID del vino richiesto'
                });
            }

            const deleted = await this.wineService.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Vino non trovato'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Vino eliminato con successo'
            });
        } catch (error) {
            console.error('Errore nell\'eliminazione del vino:', error);
            return res.status(500).json({
                success: false,
                message: 'Errore interno del server'
            });
        }
    }
}