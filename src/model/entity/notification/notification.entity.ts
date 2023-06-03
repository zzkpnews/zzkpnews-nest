export class Notification {
  constructor(
    private readonly _id: string,
    private readonly _timestamp: number,
    private readonly _receiver: string,
    private _read: boolean,
  ) {}

  get id(): string {
    return this._id;
  }
  get timestamp(): number {
    return this._timestamp;
  }
  get receiver(): string {
    return this._receiver;
  }
  get read(): boolean {
    return this._read;
  }

  set read(value: boolean) {
    this._read = value;
  }
}
