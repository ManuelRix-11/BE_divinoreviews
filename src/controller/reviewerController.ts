import { Request, Response } from 'express';
import { ReviewerService } from '../services/reviewerService';

export class ReviewerController {
    private service = new ReviewerService();

    async getAll(req: Request, res: Response) {
        try {
            const reviewers = await this.service.getAll();
            res.json(reviewers);
        } catch (err) {
            res.status(500).json({ error: 'Errore durante il recupero dei recensori' });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const reviewer = await this.service.getById(req.params.id);
            if (!reviewer) return res.status(404).json({ error: 'Recensore non trovato' });
            res.json(reviewer);
        } catch (err) {
            res.status(500).json({ error: 'Errore durante il recupero del recensore' });
        }
    }

    async add(req: Request, res: Response) {
        try {
            const reviewer = await this.service.add(req.body);
            res.status(201).json(reviewer);
        } catch (err) {
            res.status(400).json({ error: 'Errore durante la creazione del recensore' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const reviewer = await this.service.update(req.params.id, req.body);
            if (!reviewer) return res.status(404).json({ error: 'Recensore non trovato' });
            res.json(reviewer);
        } catch (err) {
            res.status(400).json({ error: 'Errore durante l\'aggiornamento del recensore' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result = await this.service.delete(req.params.id);
            if (!result) return res.status(404).json({ error: 'Recensore non trovato' });
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'Errore durante l\'eliminazione del recensore' });
        }
    }
}
