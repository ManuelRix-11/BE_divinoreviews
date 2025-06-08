import mongoose from "mongoose";

export class Review{
    private _id?: string;
    private _taster_twitterID: string;
    private _taster_name: string;
    private _wineTitle: string;
    private _wineVariety: string;
    private _winery: string;
    private _points: number;


    constructor(taster_twitterID: string, taster_name: string, wineTitle: string, wineVariety: string, winery: string, points: number, id?: string) {
        this._id = id;
        this._taster_twitterID = taster_twitterID;
        this._taster_name = taster_name;
        this._wineTitle = wineTitle;
        this._wineVariety = wineVariety;
        this._winery = winery;
        this._points = points;
    }


    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }

    get taster_twitterID(): string {
        return this._taster_twitterID;
    }

    set taster_twitterID(value: string) {
        this._taster_twitterID = value;
    }

    get taster_name(): string {
        return this._taster_name;
    }

    set taster_name(value: string) {
        this._taster_name = value;
    }

    get wineTitle(): string {
        return this._wineTitle;
    }

    set wineTitle(value: string) {
        this._wineTitle = value;
    }

    get wineVariety(): string {
        return this._wineVariety;
    }

    set wineVariety(value: string) {
        this._wineVariety = value;
    }

    get winery(): string {
        return this._winery;
    }

    set winery(value: string) {
        this._winery = value;
    }

    get points(): number {
        return this._points;
    }

    set points(value: number) {
        this._points = value;
    }
}

const ReviewSchema = new mongoose.Schema({
    _id: String,
    _taster_twitterID: {type: String, required: false},
    _taster_name:  {type: String, required: true},
    _wineTitle:  {type: String, required: true},
    _wineVariety:  {type: String, required: true},
    _winery:  {type: String, required: true},
    _points:  {type: Number, required: true},
});

export const ReviewModel = mongoose.model("Review", ReviewSchema);