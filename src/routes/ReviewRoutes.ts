import { Router } from "express";
import { ReviewController } from "../controller/reviewController";

const router = Router();
const recensioneController = new ReviewController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reviewer:
 *       type: object
 *       required:
 *         - taster_name
 *         - taster_twitter_handle
 *       properties:
 *         taster_name:
 *           type: string
 *           description: Nome del degustatore
 *           example: "Kern O'Keefe"
 *         taster_twitter_handle:
 *           type: string
 *           description: Handle Twitter del degustatore
 *           example: "@kerinokeefe"
 *
 *     Wine:
 *       type: object
 *       required:
 *         - title
 *         - variety
 *         - winery
 *       properties:
 *         title:
 *           type: string
 *           description: Titolo del vino
 *           example: "Nicosia 2013 Vulkà Bianco (Etna)"
 *         variety:
 *           type: string
 *           description: Varietà del vino
 *           example: "White Blend"
 *         winery:
 *           type: string
 *           description: Cantina produttrice
 *           example: "Nicosia"
 *
 *     Review:
 *       type: object
 *       required:
 *         - points
 *         - taster
 *         - wine
 *       properties:
 *         id:
 *           type: string
 *           description: ID univoco della recensione
 *         points:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Punteggio della recensione
 *           example: 87
 *         taster:
 *           $ref: '#/components/schemas/Reviewer'
 *         wine:
 *           $ref: '#/components/schemas/Wine'
 *
 *     RecensioneRequest:
 *       type: object
 *       required:
 *         - points
 *         - taster
 *         - wine
 *       properties:
 *         points:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *           description: Punteggio della recensione
 *           example: 87
 *         taster:
 *           $ref: '#/components/schemas/Reviewer'
 *         wine:
 *           $ref: '#/components/schemas/Wine'
 *
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Messaggio di errore
 *         details:
 *           type: string
 *           description: Dettagli dell'errore
 */

/**
 * @swagger
 * /review:
 *   post:
 *     summary: Crea una nuova recensione
 *     tags: [Recensioni]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecensioneRequest'
 *     responses:
 *       201:
 *         description: Recensione creata con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Dati di input non validi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", recensioneController.createRecensione);

/**
 * @swagger
 * /review:
 *   get:
 *     summary: Recupera tutte le recensioni con paginazione
 *     tags: [Recensioni]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Numero della pagina (default: 1)"
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Numero di elementi per pagina (default: 10)"
 *     responses:
 *       200:
 *         description: Lista di tutte le recensioni
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", recensioneController.getAllRecensioni);

/**
 * @swagger
 * /review/{id}:
 *   get:
 *     summary: Recupera una recensione per ID
 *     tags: [Recensioni]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID univoco della recensione
 *     responses:
 *       200:
 *         description: Recensione trovata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       404:
 *         description: Recensione non trovata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", recensioneController.getRecensioneById);

/**
 * @swagger
 * /review/{id}:
 *   put:
 *     summary: Aggiorna una recensione
 *     tags: [Recensioni]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID univoco della recensione
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               points:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               taster:
 *                 $ref: '#/components/schemas/Reviewer'
 *               wine:
 *                 $ref: '#/components/schemas/Wine'
 *     responses:
 *       200:
 *         description: Recensione aggiornata con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Dati di input non validi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Recensione non trovata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", recensioneController.updateRecensione);

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     summary: Elimina una recensione
 *     tags: [Recensioni]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID univoco della recensione
 *     responses:
 *       204:
 *         description: Recensione eliminata con successo
 *       404:
 *         description: Recensione non trovata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", recensioneController.deleteRecensione);

/**
 * @swagger
 * /review/winery/{winery}:
 *   get:
 *     summary: Recupera tutte le recensioni per una cantina specifica con paginazione
 *     tags: [Recensioni]
 *     parameters:
 *       - in: path
 *         name: winery
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome della cantina
 *         example: "Nicosia"
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Numero della pagina (default: 1)"
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Numero di elementi per pagina (default: 10)"
 *     responses:
 *       200:
 *         description: Lista delle recensioni per la cantina
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/winery/:winery", recensioneController.getRecensioniByWinery);

/**
 * @swagger
 * /review/taster/{tasterName}:
 *   get:
 *     summary: Recupera tutte le recensioni per un degustatore specifico con paginazione
 *     tags: [Recensioni]
 *     parameters:
 *       - in: path
 *         name: tasterName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome del degustatore
 *         example: "Kern O'Keefe"
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Numero della pagina (default: 1)"
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: "Numero di elementi per pagina (default: 10)"
 *     responses:
 *       200:
 *         description: Lista delle recensioni per il degustatore
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       500:
 *         description: Errore interno del server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/taster/:tasterName", recensioneController.getRecensioniByTaster);

export default router;
