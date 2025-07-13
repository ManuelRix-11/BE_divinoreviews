import mongoose from "mongoose";
import {Reviewer, ReviewerModel, ReviewerSchema} from "./Reviewer";

export class Review {
    private _id?: string;
    private _points: number;
    private _taster: Reviewer;
    private _wine: {
        title: string;
        variety: string;
        winery: string;
    };

    constructor(
        points: number,
        taster: Reviewer,
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

    get taster(): Reviewer {
        return this._taster;
    }
    set taster(value: Reviewer) {
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

    toJSON() {
        return {
            id: this._id,
            points: this._points,
            taster: this._taster.toJSON(),
            wine: this._wine
        };
    }
}

const ReviewSchema = new mongoose.Schema({
    points: { type: Number, required: true },
    taster: { type: ReviewerSchema, required: true },
    wine: {
        title: { type: String, required: true },
        variety: { type: String, required: true },
        winery: { type: String, required: true }
    }
});

export const ReviewModel = mongoose.model("Recensioni", ReviewSchema, "Recensioni");