export class Book {
  get id(): string {
    return this._id;
  }

  get creatorId(): string {
    return this._creatorId;
  }

  set creatorId(value: string) {
    this._creatorId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get citation(): string | null {
    return this._citation;
  }

  set citation(value: string | null) {
    this._citation = value;
  }

  get keywords() {
    return this._keywords;
  }

  set keywords(value: string | null) {
    this._keywords = value;
  }

  get coverImage(): string | null {
    return this._coverImage;
  }

  set coverImage(value: string | null) {
    this._coverImage = value;
  }

  get timestamp(): number {
    return this._timestamp;
  }

  get closed(): boolean {
    return this._closed;
  }

  set closed(value: boolean) {
    this._closed = value;
  }

  constructor(
    private readonly _id: string,
    private _creatorId: string,
    private _title: string,
    private _citation: string | null,
    private _keywords: string | null,
    private _coverImage: string | null,
    private readonly _timestamp: number,
    private _closed: boolean,
  ) {}
}
