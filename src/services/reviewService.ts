import { ReviewModel } from "../models/Review";
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
            const newRecensione = new ReviewModel({
                points: recensioneData.points,
                taster: {
                    taster_name: recensioneData.taster.taster_name,
                    taster_twitter_handle: recensioneData.taster.taster_twitter_handle
                },
                wine: {
                    title: recensioneData.wine.title,
                    variety: recensioneData.wine.variety,
                    winery: recensioneData.wine.winery
                }
            });

            const savedRecensione = await newRecensione.save();

            return new Review(
                savedRecensione.points,
                {
                    taster_name: savedRecensione.taster?.taster_name!,
                    taster_twitter_handle: savedRecensione.taster?.taster_twitter_handle!
                },
                {
                    title: savedRecensione.wine?.title!,
                    variety: savedRecensione.wine?.variety!,
                    winery: savedRecensione.wine?.winery!
                },
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

            return recensioni.map(rec => new Review(
                rec.points,
                {
                    taster_name: rec.taster?.taster_name!,
                    taster_twitter_handle: rec.taster?.taster_twitter_handle!
                },
                {
                    title: rec.wine?.title!,
                    variety: rec.wine?.variety!,
                    winery: rec.wine?.winery!
                },
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

            return new Review(
                recensione.points,
                {
                    taster_name: recensione.taster?.taster_name!,
                    taster_twitter_handle: recensione.taster?.taster_twitter_handle!
                },
                {
                    title: recensione.wine?.title!,
                    variety: recensione.wine?.variety!,
                    winery: recensione.wine?.winery!
                },
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

            return new Review(
                updatedRecensione.points,
                {
                    taster_name: updatedRecensione.taster?.taster_name!,
                    taster_twitter_handle: updatedRecensione.taster?.taster_twitter_handle!
                },
                {
                    title: updatedRecensione.wine?.title!,
                    variety: updatedRecensione.wine?.variety!,
                    winery: updatedRecensione.wine?.winery!
                },
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

            return recensioni.map(rec => new Review(
                rec.points,
                {
                    taster_name: rec.taster?.taster_name!,
                    taster_twitter_handle: rec.taster?.taster_twitter_handle!
                },
                {
                    title: rec.wine?.title!,
                    variety: rec.wine?.variety!,
                    winery: rec.wine?.winery!
                },
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

            return recensioni.map(rec => new Review(
                rec.points,
                {
                    taster_name: rec.taster?.taster_name!,
                    taster_twitter_handle: rec.taster?.taster_twitter_handle!
                },
                {
                    title: rec.wine?.title!,
                    variety: rec.wine?.variety!,
                    winery: rec.wine?.winery!
                },
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

            return recensioni.map(rec => new Review(
                rec.points,
                {
                    taster_name: rec.taster?.taster_name!,
                    taster_twitter_handle: rec.taster?.taster_twitter_handle!
                },
                {
                    title: rec.wine?.title!,
                    variety: rec.wine?.variety!,
                    winery: rec.wine?.winery!
                },
                rec._id?.toString()
            ));
        } catch (error) {
            throw new Error(`Errore nel recupero delle recensioni per range di punti: ${error}`);
        }
    }

    async getRecensioniAndWine(page: number, limit: number) {
        const skip = (page - 1) * limit;

        const result = await ReviewModel.aggregate([
            {
                $lookup: {
                    from: "Vinoh", // Nome della collection Wine
                    let: {
                        reviewTitle: "$wine.title",
                        reviewVariety: "$wine.variety",
                        reviewWinery: "$wine.winery"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$title", "$$reviewTitle"] },
                                        { $eq: ["$variety", "$$reviewVariety"] },
                                        { $eq: ["$winery", "$$reviewWinery"] }
                                    ]
                                }
                            }
                        },
                        {
                            $project: {
                                title: 0,
                                variety: 0,
                                winery: 0
                            }
                        }
                    ],
                    as: "wineDetails"
                }
            },
            {
                $unwind: {
                    path: "$wineDetails",
                    preserveNullAndEmptyArrays: true
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);

        const totalCount = await ReviewModel.countDocuments();

        return {
            data: result,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                totalCount,
                hasNextPage: page < Math.ceil(totalCount / limit),
                hasPrevPage: page > 1
            }
        };
    }
    async getRecensioniByVariety(variety: string, page = 1, limit = 15) {
        try {
            const skip = (page - 1) * limit;

            // Costruzione delle regex per filtrare i titoli in base alla varietà
            let regexConditions: any[] = [];

            switch (variety.toLowerCase()) {
            case 'red':
                regexConditions = [
                { "wine.title": { $regex: /red/i } },
                { "wine.title": { $regex: /rosso/i } }
                ];
                break;
            case 'white':
                regexConditions = [
                { "wine.title": { $regex: /white/i } },
                { "wine.title": { $regex: /bianco/i } }
                ];
                break;
            case 'rose':
            case 'rosé':
                regexConditions = [
                { "wine.title": { $regex: /ros[eè]/i } }
                ];
                break;
            default:
                throw new Error('Categoria varietà non valida. Usa red, white o rose.');
            }

            // Aggregation con filtro e join
            const result = await ReviewModel.aggregate([
            {
                $match: {
                $or: regexConditions
                }
            },
            {
                $lookup: {
                from: "Vinoh",
                let: {
                    reviewTitle: "$wine.title",
                    reviewVariety: "$wine.variety",
                    reviewWinery: "$wine.winery"
                },
                pipeline: [
                    {
                    $match: {
                        $expr: {
                        $and: [
                            { $eq: ["$title", "$$reviewTitle"] },
                            { $eq: ["$variety", "$$reviewVariety"] },
                            { $eq: ["$winery", "$$reviewWinery"] }
                        ]
                        }
                    }
                    },
                    {
                    $project: {
                        title: 1,
                        variety: 1,
                        winery: 1,
                        country: 1,
                        province: 1,
                        region_1: 1,
                        region_2: 1,
                        designation: 1,
                        description: 1,
                        price: 1
                    }
                    }
                ],
                as: "wineDetails"
                }
            },
            {
                $unwind: {
                path: "$wineDetails",
                preserveNullAndEmptyArrays: true
                }
            },
            { $skip: skip },
            { $limit: limit }
            ]);

            const totalCount = await ReviewModel.countDocuments({ $or: regexConditions });
            const totalPages = Math.ceil(totalCount / limit);

            const data = result.map(rec => ({
            _id: rec._id.toString(),
            points: rec.points,
            taster: {
                taster_name: rec.taster?.taster_name || 'N/A',
                taster_twitter_handle: rec.taster?.taster_twitter_handle || 'N/A'
            },
            wine: {
                _id: rec._id.toString(),
                title: rec.wine?.title || 'N/A',
                variety: rec.wine?.variety || 'N/A',
                winery: rec.wine?.winery || 'N/A'
            },
            wineDetails: rec.wineDetails
                ? {
                    _id: rec.wineDetails._id?.toString() || '',
                    title: rec.wineDetails.title,
                    variety: rec.wineDetails.variety,
                    winery: rec.wineDetails.winery,
                    country: rec.wineDetails.country,
                    province: rec.wineDetails.province,
                    description: rec.wineDetails.description,
                    region_1: rec.wineDetails.region_1,
                    region_2: rec.wineDetails.region_2,
                    designation: rec.wineDetails.designation,
                    price: rec.wineDetails.price
                }
                : null
            }));

            return {
            data,
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
            };
        } catch (error) {
            throw new Error(`Errore nel recupero recensioni con join: ${error}`);
        }
    }


}