export class Wine{
    private _id?: string;
    private _title: string;
    private _variety: string;
    private _winery: string;
    private _country: string;
    private _province: string;
    private _description: string;
    private _region_1: string;
    private _region_2: string;
    private _designation: string;
    private _price: number;


    constructor(title: string, variety: string, winery: string, country: string, province: string, descriptio: string, region_1: string, region_2: string, designation: string, price: number,id?: string) {
        this._id = id;
        this._title = title;
        this._variety = variety;
        this._winery = winery;
        this._country = country;
        this._province = province;
        this._description = descriptio;
        this._region_1 = region_1;
        this._region_2 = region_2;
        this._designation = designation;
        this._price = price;
    }


    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get variety(): string {
        return this._variety;
    }

    set variety(value: string) {
        this._variety = value;
    }

    get winery(): string {
        return this._winery;
    }

    set winery(value: string) {
        this._winery = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get province(): string {
        return this._province;
    }

    set province(value: string) {
        this._province = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get region_1(): string {
        return this._region_1;
    }

    set region_1(value: string) {
        this._region_1 = value;
    }

    get region_2(): string {
        return this._region_2;
    }

    set region_2(value: string) {
        this._region_2 = value;
    }

    get designation(): string {
        return this._designation;
    }

    set designation(value: string) {
        this._designation = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }
}