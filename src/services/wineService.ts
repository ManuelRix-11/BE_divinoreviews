import { Wine } from "../models/Wine";
import { WineModel } from "../models/Wine";

export class WineService {
    /**
     * Ottiene tutti i vini con paginazione
     * @param page Numero di pagina
     * @param limit Numero di elementi per pagina
     * @returns Array di vini
     */
    async getAll(page: number = 1, limit: number = 50) {
        try {
            const skip = (page - 1) * limit;
            const wines = await WineModel.find()
                .skip(skip)
                .limit(limit);
            return wines;
        } catch (error) {
            console.error("Errore nel recupero dei vini:", error);
            throw error;
        }
    }

    /**
     * Ottiene un vino tramite ID
     * @param id ID del vino
     * @returns Il vino trovato o null
     */
    async getById(id: string) {
        try {
            const wine = await WineModel.findById(id);
            return wine;
        } catch (error) {
            console.error("Errore nel recupero del vino:", error);
            throw error;
        }
    }

    /**
     * Aggiunge un nuovo vino
     * @param wine Il vino da aggiungere
     * @returns Il vino creato
     */
    async add(wine: Wine) {
        try {
            const wineData = {
                title: wine.title,
                variety: wine.variety,
                winery: wine.winery,
                country: wine.country,
                description: wine.description,
                designation: wine.designation,
                price: wine.price,
                province: wine.province,
                region_1: wine.region_1,
                region_2: wine.region_2
            };

            const newWine = new WineModel(wineData);
            const savedWine = await newWine.save();
            return savedWine;
        } catch (error) {
            console.error("Errore nella creazione del vino:", error);
            throw error;
        }
    }

    /**
     * Aggiorna un vino esistente
     * @param id ID del vino da aggiornare
     * @param wineData Dati aggiornati del vino
     * @returns Il vino aggiornato o null
     */
    async update(id: string, wineData: Partial<Wine>) {
        try {
            const updatedWine = await WineModel.findByIdAndUpdate(
                id,
                wineData,
                { new: true }
            );
            return updatedWine;
        } catch (error) {
            console.error("Errore nell'aggiornamento del vino:", error);
            throw error;
        }
    }

    /**
     * Elimina un vino
     * @param id ID del vino da eliminare
     * @returns true se eliminato, false altrimenti
     */
    async delete(id: string) {
        try {
            const result = await WineModel.findByIdAndDelete(id);
            return !!result;
        } catch (error) {
            console.error("Errore nell'eliminazione del vino:", error);
            throw error;
        }
    }

    /**
     * Recupera un vino in base a titolo, varietà e cantina
     * @param title Il titolo del vino
     * @param variety La varietà del vino
     * @param winery La cantina del vino
     * @returns Il vino trovato o null
     */
    async getWineByDetails(title: string, variety: string, winery: string) {
        try {
            const wine = await WineModel.findOne({
                title: title,
                variety: variety,
                winery: winery
            });
            return wine;
        } catch (error) {
            console.error("Errore durante il recupero del vino:", error);
            throw error;
        }
    }

    /**
     * Conta il numero totale di vini
     * @returns Il numero totale di vini
     */
    async countWines() {
        try {
            const count = await WineModel.countDocuments();
            return count;
        } catch (error) {
            console.error("Errore nel conteggio dei vini:", error);
            throw error;
        }
    }
}