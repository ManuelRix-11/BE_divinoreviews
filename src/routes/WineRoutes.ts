import { Router } from 'express';
import { WineController } from '../controller/wineController';

const router = Router();
const wineController = new WineController();

/**
 * @swagger
 * tags:
 *   name: Wines
 *   description: API per la gestione dei vini
 */

/**
 * @swagger
 * /wines:
 *   get:
 *     summary: Ottiene tutti i vini con paginazione
 *     tags: [Wines]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Numero della pagina
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Numero di elementi per pagina
 *     responses:
 *       200:
 *         description: Lista dei vini
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Wine'
 *       500:
 *         description: Errore del server
 *
 *   post:
 *     summary: Aggiunge un nuovo vino
 *     tags: [Wines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WineInput'
 *     responses:
 *       201:
 *         description: Vino creato con successo
 *       400:
 *         description: Richiesta non valida
 *       500:
 *         description: Errore del server
 */
router.get('/', async (req, res) => {
    await wineController.getAll(req, res);
});

router.post('/', async (req, res) => {
    await wineController.add(req, res);
});

/**
 * @swagger
 * /wines/{id}:
 *   get:
 *     summary: Ottiene un vino tramite ID
 *     tags: [Wines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dettagli del vino
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Wine'
 *       404:
 *         description: Vino non trovato
 *       500:
 *         description: Errore del server
 *
 *   put:
 *     summary: Aggiorna un vino esistente
 *     tags: [Wines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WineInput'
 *     responses:
 *       200:
 *         description: Vino aggiornato con successo
 *       400:
 *         description: Richiesta non valida
 *       404:
 *         description: Vino non trovato
 *       500:
 *         description: Errore del server
 *
 *   delete:
 *     summary: Elimina un vino
 *     tags: [Wines]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Vino eliminato con successo
 *       404:
 *         description: Vino non trovato
 *       500:
 *         description: Errore del server
 */
router.get('/:id', async (req, res) => {
    await wineController.getById(req, res);
});

router.put('/:id', async (req, res) => {
    await wineController.update(req, res);
});

router.delete('/:id', async (req, res) => {
    await wineController.delete(req, res);
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
 *         title:
 *           type: string
 *         variety:
 *           type: string
 *         winery:
 *           type: string
 *         points:
 *           type: integer
 *         taster_name:
 *           type: string
 *         taster_twitterID:
 *           type: string
 *     WineInput:
 *       type: object
 *       required:
 *         - title
 *         - variety
 *         - winery
 *       properties:
 *         title:
 *           type: string
 *         variety:
 *           type: string
 *         winery:
 *           type: string
 *         points:
 *           type: integer
 *         taster_name:
 *           type: string
 *         taster_twitterID:
 *           type: string
 */
