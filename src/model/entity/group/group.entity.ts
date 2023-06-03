export class Group {
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  constructor(
    private readonly _id: string,
    private _title: string,
    private _order: number,
  ) {
    this._id = _id;
    this._title = _title;
    this._order = _order;
  }
}
