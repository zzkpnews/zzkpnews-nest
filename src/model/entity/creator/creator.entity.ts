export class Creator {
  constructor(
    private readonly _id: string,
    private _title: string,
    private _phone: string,
    private _email: string,
    private _description: string | null,
    private _address: string | null,
    private _qq: string | null,
    private _wechat: string | null,
    private _weibo: string | null,
    private _url: string | null,
    private _logo: string | null,
    private _salt: string,
    private _passwordHash: string,
    private _closed: boolean,
  ) {}

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get email(): string {
    return this._email;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string | null) {
    this._description = value;
  }

  get address(): string {
    return this._address;
  }

  set address(value: string | null) {
    this._address = value;
  }

  get qq(): string | null {
    return this._qq;
  }

  set qq(value: string | null) {
    this._qq = value;
  }

  get wechat(): string | null {
    return this._wechat;
  }

  set wechat(value: string | null) {
    this._wechat = value;
  }

  get weibo(): string | null {
    return this._weibo;
  }

  set weibo(value: string | null) {
    this._weibo = value;
  }

  get url(): string | null {
    return this._url;
  }

  set url(value: string | null) {
    this._url = value;
  }

  get logo(): string | null {
    return this._logo;
  }

  set logo(value: string | null) {
    this._logo = value;
  }

  get salt(): string {
    return this._salt;
  }

  set salt(value: string) {
    this._salt = value;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  set passwordHash(value: string) {
    this._passwordHash = value;
  }

  get closed(): boolean {
    return this._closed;
  }

  set closed(value: boolean) {
    this._closed = value;
  }
}
