import mongoose from "mongoose";

export class Reviewer {
    private _id?: string;
    private _taster_twitter_handle: string;
    private _taster_name: string;

    constructor(taster_twitter_handle: string, taster_name: string, id?: string) {
        this._id = id;
        this._taster_twitter_handle = taster_twitter_handle;
        this._taster_name = taster_name;
    }

    get taster_twitter_handle(): string {
        return this._taster_twitter_handle;
    }

    set taster_twitter_handle(value: string) {
        this._taster_twitter_handle = value;
    }

    get taster_name(): string {
        return this._taster_name;
    }

    set taster_name(value: string) {
        this._taster_name = value;
    }

    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }
}

export const ReviewerSchema = new mongoose.Schema({
    taster_twitter_handle: { type: String, required: true },
    taster_name: { type: String, required: true }
});

export const ReviewerModel = mongoose.model("Recensori", ReviewerSchema, "Recensori");
