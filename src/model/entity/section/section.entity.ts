export class Section {
  constructor(
    private readonly _id: string,
    private _title: string,
    private _order: number,
    private _belongingGroupId: string,
  ) {
    this._id = this._id;
    this._title = this._title;
    this._order = this._order;
    this._belongingGroupId = this._belongingGroupId;
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

  get order(): number {
    return this._order;
  }

  set order(value: number) {
    this._order = value;
  }

  get belongingGroupId(): string {
    return this.belongingGroupId;
  }

  set belongingGroupId(value: string) {
    this._belongingGroupId = value;
  }
}
