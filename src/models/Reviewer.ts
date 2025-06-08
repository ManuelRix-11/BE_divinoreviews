import mongoose from "mongoose";

export class Reviewer{
    private _id?: string;
    private _twitterID: string;
    private _name: string;


    constructor(twitterID: string, name: string, id?: string) {
        this._id = id;
        this._twitterID = twitterID;
        this._name = name;
    }

    get twitterID(): string {
        return this._twitterID;
    }

    set twitterID(value: string) {
        this._twitterID = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }
}

const ReviewerSchema = new mongoose.Schema({
     _id: String,
     _twitterID: String,
     _name: String

});

export const ReviewModel = mongoose.model("Review", ReviewerSchema);