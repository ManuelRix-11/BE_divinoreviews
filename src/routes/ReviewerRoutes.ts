import express, { Router, Request, Response } from 'express';
import { ReviewerController } from '../controller/reviewerController';

const router = Router();
const reviewerController = new ReviewerController();

/**
 * @swagger
 * tags:
 *   name: Reviewers
 *   description: API per la gestione dei recensori
 */

/**
 * @swagger
 * /reviewers:
 *   get:
 *     summary: Ottiene tutti i recensori
 *     tags: [Reviewers]
 *     responses:
 *       200:
 *         description: Lista dei recensori
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reviewer'
 *       500:
 *         description: Errore del server
 *
 *   post:
 *     summary: Aggiunge un nuovo recensore
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
 *       400:
 *         description: Dati non validi
 */
router.get('/', reviewerController.getAll.bind(reviewerController));
router.post('/', reviewerController.add.bind(reviewerController));

// @ts-ignore
/**
 * @swagger
 * /reviewers/{id}:
 *   get:
 *     summary: Ottiene un recensore per ID
 *     tags: [Reviewers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Recensore trovato
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reviewer'
 *       404:
 *         description: Recensore non trovato
 *       500:
 *         description: Errore del server
 *
 *   put:
 *     summary: Aggiorna un recensore esistente
 *     tags: [Reviewers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewerInput'
 *     responses:
 *       200:
 *         description: Recensore aggiornato
 *       400:
 *         description: Dati non validi
 *       404:
 *         description: Recensore non trovato
 *
 *   delete:
 *     summary: Elimina un recensore
 *     tags: [Reviewers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Recensore eliminato
 *       404:
 *         description: Recensore non trovato
 *       500:
 *         description: Errore del server
 */

// @ts-ignore
router.get('/:id', reviewerController.getById.bind(reviewerController));
// @ts-ignore
router.put('/:id', reviewerController.update.bind(reviewerController));
// @ts-ignore
router.delete('/:id', reviewerController.delete.bind(reviewerController));

/**
 * @swagger
 * components:
 *   schemas:
 *     Reviewer:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         taster_twitter_handle:
 *           type: string
 *         taster_name:
 *           type: string
 *     ReviewerInput:
 *       type: object
 *       required:
 *         - taster_twitter_handle
 *         - taster_name
 *       properties:
 *         taster_twitter_handle:
 *           type: string
 *         taster_name:
 *           type: string
 */


export default router;
