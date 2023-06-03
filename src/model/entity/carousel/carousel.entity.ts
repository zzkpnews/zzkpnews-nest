export class Carousel {
  get id(): string {
    return this._id;
  }

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  constructor(private readonly _id: string, private _order: number) {}
}
