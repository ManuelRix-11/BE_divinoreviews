import mongoose from "mongoose";

export class Review {
    private _id?: string;
    private _points: number;
    private _taster: {
        taster_name: string;
        taster_twitter_handle: string;
    };
    private _wine: {
        title: string;
        variety: string;
        winery: string;
    };

    constructor(
        points: number,
        taster: {
            taster_name: string;
            taster_twitter_handle: string;
        },
        wine: {
            title: string;
            variety: string;
            winery: string;
        },
        id?: string
    ) {
        this._id = id;
        this._points = points;
        this._taster = taster;
        this._wine = wine;
    }

    get id(): string | undefined {
        return this._id;
    }
    set id(value: string | undefined) {
        this._id = value;
    }

    get points(): number {
        return this._points;
    }
    set points(value: number) {
        this._points = value;
    }

    get taster(): {
        taster_name: string;
        taster_twitter_handle: string;
    } {
        return this._taster;
    }
    set taster(value: {
        taster_name: string;
        taster_twitter_handle: string;
    }) {
        this._taster = value;
    }

    get wine(): {
        title: string;
        variety: string;
        winery: string;
    } {
        return this._wine;
    }
    set wine(value: {
        title: string;
        variety: string;
        winery: string;
    }) {
        this._wine = value;
    }
}

const ReviewSchema = new mongoose.Schema({
    points: { type: Number, required: true },
    taster: {
        taster_name: { type: String, required: true },
        taster_twitter_handle: { type: String, required: true }
    },
    wine: {
        title: { type: String, required: true },
        variety: { type: String, required: true },
        winery: { type: String, required: true }
    }
});

export const ReviewModel = mongoose.model("Recensioni", ReviewSchema, "Recensioni");