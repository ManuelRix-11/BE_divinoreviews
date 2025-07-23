import { ReviewModel } from "../models/Review";
import { Reviewer } from "../models/Reviewer";
import { Review } from "../models/Review";

export class ReviewService {
    async createRecensione(recensioneData: {
        points: number;
        taster: {
            taster_name: string;
            taster_twitter_handle: string;
        };
        wine: {
            title: string;
            variety: string;
            winery: string;
        };
    }): Promise<Review> {
        try {
            const reviewer = new Reviewer(
                recensioneData.taster.taster_twitter_handle,
                recensioneData.taster.taster_name
            );

            const newRecensione = new ReviewModel({
                points: recensioneData.points,
                taster: reviewer.toObject(),
                wine: recensioneData.wine
            });

            const savedRecensione = await newRecensione.save();

            if (!savedRecensione.wine) {
                throw new Error('Dati del vino mancanti nella recensione salvata');
            }

            const taster = new Reviewer(
                savedRecensione.taster.taster_twitter_handle,
                savedRecensione.taster.taster_name
            );

            return new Review(
                savedRecensione.points,
                taster,
                savedRecensione.wine,
                savedRecensione._id?.toString()
            );
        } catch (error) {
            throw new Error(`Errore nella creazione della recensione: ${error}`);
        }
    }

    async getAllRecensioni(page = 1, limit = 10): Promise<Review[]> {
        try {
            const skip = (page - 1) * limit;
            const recensioni = await ReviewModel.find().skip(skip).limit(limit);
            return recensioni
                .filter(rec => rec.wine)
                .map(rec => new Review(
                    rec.points,
                    new Reviewer(rec.taster.taster_twitter_handle, rec.taster.taster_name),
                    rec.wine!,
                    rec._id?.toString()
                ));
        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni: ${error}`);
        }
    }

    async getRecensioneById(id: string): Promise<Review | null> {
        try {
            const recensione = await ReviewModel.findById(id);
            if (!recensione) return null;

            if (!recensione.wine) {
                throw new Error('Dati del vino mancanti nella recensione');
            }

            const taster = new Reviewer(
                recensione.taster.taster_twitter_handle,
                recensione.taster.taster_name
            );

            return new Review(
                recensione.points,
                taster,
                recensione.wine,
                recensione._id?.toString()
            );
        } catch (error) {
            throw new Error(`Errore nel recupero della recensione: ${error}`);
        }
    }

    async updateRecensione(id: string, updates: Partial<{
        points: number;
        taster: {
            taster_name: string;
            taster_twitter_handle: string;
        };
        wine: {
            title: string;
            variety: string;
            winery: string;
        };
    }>): Promise<Review | null> {
        try {
            const updatedRecensione = await ReviewModel.findByIdAndUpdate(id, updates, { new: true });
            if (!updatedRecensione) return null;

            if (!updatedRecensione.wine) {
                throw new Error('Dati del vino mancanti nella recensione aggiornata');
            }

            const taster = new Reviewer(
                updatedRecensione.taster.taster_twitter_handle,
                updatedRecensione.taster.taster_name
            );

            return new Review(
                updatedRecensione.points,
                taster,
                updatedRecensione.wine,
                updatedRecensione._id?.toString()
            );
        } catch (error) {
            throw new Error(`Errore nell'aggiornamento della recensione: ${error}`);
        }
    }

    async deleteRecensione(id: string): Promise<boolean> {
        try {
            const result = await ReviewModel.findByIdAndDelete(id);
            return result !== null;
        } catch (error) {
            throw new Error(`Errore nella cancellazione della recensione: ${error}`);
        }
    }

    async getRecensioniByWinery(winery: string, page = 1, limit = 10): Promise<Review[]> {
        try {
            const skip = (page - 1) * limit;
            const recensioni = await ReviewModel.find({ "wine.winery": winery }).skip(skip).limit(limit);
            return recensioni
                .filter(rec => rec.wine)
                .map(rec => new Review(
                    rec.points,
                    new Reviewer(rec.taster.taster_twitter_handle, rec.taster.taster_name),
                    rec.wine!,
                    rec._id?.toString()
                ));
        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni per winery: ${error}`);
        }
    }

    async getRecensioniByTaster(tasterName: string, page = 1, limit = 10): Promise<Review[]> {
        try {
            const skip = (page - 1) * limit;
            const recensioni = await ReviewModel.find({ "taster.taster_name": tasterName }).skip(skip).limit(limit);
            return recensioni
                .filter(rec => rec.wine)
                .map(rec => new Review(
                    rec.points,
                    new Reviewer(rec.taster.taster_twitter_handle, rec.taster.taster_name),
                    rec.wine!,
                    rec._id?.toString()
                ));
        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni per taster: ${error}`);
        }
    }

    async getRecensioniByPointsRange(minPoints: number, maxPoints: number, page = 1, limit = 10): Promise<Review[]> {
        try {
            const skip = (page - 1) * limit;
            const recensioni = await ReviewModel.find({
                points: { $gte: minPoints, $lte: maxPoints }
            }).skip(skip).limit(limit);

            return recensioni
                .filter(rec => rec.wine)
                .map(rec => new Review(
                    rec.points,
                    new Reviewer(rec.taster.taster_twitter_handle, rec.taster.taster_name),
                    rec.wine!,
                    rec._id?.toString()
                ));
        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni per range di punti: ${error}`);
        }
    }

    async getRecensioniByVariety(variety: string, page = 1, limit = 15): Promise<Review[]> {
        try {
            const skip = (page - 1) * limit;

            let regexConditions: any[] = [];

            switch (variety.toLowerCase()) {
                case 'red':
                    regexConditions = [
                        { "wine.title" : { $regex: /red/i } },
                        { "wine.title" : { $regex: /rosso/i } }
                    ];
                    break;
                case 'white':
                    regexConditions = [
                        { "wine.title" : { $regex: /white/i } },
                        { "wine.title" : { $regex: /bianco/i } }
                    ];
                    break;
                case 'rose':
                case 'rosé':
                    regexConditions = [
                        { "wine.title" : { $regex: /ros[eè]/i } }
                    ];
                    break;
                default:
                    throw new Error('Categoria varietà non valida. Usa red, white o rose.');
            }

            const recensioni = await ReviewModel.find({ $or: regexConditions })
                .skip(skip)
                .limit(limit);

            return recensioni
                .filter(rec => rec.wine)
                .map(rec => new Review(
                    rec.points,
                    new Reviewer(rec.taster?.taster_twitter_handle, rec.taster?.taster_name),
                    rec.wine!,
                    rec._id?.toString()
                ));

        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni per varietà: ${error}`);
        }
    }

}
