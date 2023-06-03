export class Topic {
  constructor(
    private readonly _id: string,
    private _title: string,
    private _logo: string,
    private _coverImage: string,
    private _description: string,
    private _order: number,
  ) {
    this._id = _id;
    this._title = _title;
    this._logo = _logo;
    this._coverImage = _coverImage;
    this._description = _description;
    this._order = _order;
  }
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get logo(): string {
    return this._logo;
  }

  set logo(value: string) {
    this._logo = value;
  }

  get coverImage(): string {
    return this._coverImage;
  }

  set coverImage(value: string) {
    this._coverImage = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }
}
