import { Injectable } from '@nestjs/common';

export class Friend {
  constructor(
    private readonly _id: string,
    private _title: string,
    private _url: string | null,
    private _description: string | null,
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

  get url(): string | null {
    return this._url;
  }

  set url(value: string | null) {
    this._url = value;
  }

  get description(): string | null {
    return this._description;
  }

  set description(value: string | null) {
    this._description = value;
  }
}
