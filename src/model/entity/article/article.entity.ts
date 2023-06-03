import { Newsbase } from '../utils/newsbase.entity';

export class Article implements Newsbase {
  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
  get timestamp(): number {
    return this._timestamp;
  }

  get subtitle(): string | null {
    return this._subtitle;
  }

  set subtitle(value: string | null) {
    this._subtitle = value;
  }

  get leadTitle(): string | null {
    return this._leadTitle;
  }

  set leadTitle(value: string | null) {
    this._leadTitle = value;
  }

  get citation(): string | null {
    return this._citation;
  }

  set citation(value: string | null) {
    this._citation = value;
  }

  get coverImage(): string | null {
    return this._coverImage;
  }

  set coverImage(value: string | null) {
    this._coverImage = value;
  }

  get keywords(): string | null {
    return this._keywords;
  }

  set keywords(value: string | null) {
    this._keywords = value;
  }

  get creatorId(): string {
    return this._creatorId;
  }

  set creatorId(value: string) {
    this._creatorId = value;
  }

  get closed(): boolean {
    return this._closed;
  }

  set closed(value: boolean) {
    this._closed = value;
  }

  get homeHotMark(): boolean {
    return this._homeHotMark;
  }

  set homeHotMark(value: boolean) {
    this._homeHotMark = value;
  }

  get sectionHotMark(): boolean {
    return this._sectionHotMark;
  }

  set sectionHotMark(value: boolean) {
    this._sectionHotMark = value;
  }

  get creatorHotMark(): boolean {
    return this._creatorHotMark;
  }

  set creatorHotMark(value: boolean) {
    this._creatorHotMark = value;
  }

  get belongingSectionId(): string {
    return this._belongingSectionId;
  }

  set belongingSectionId(value: string) {
    this._belongingSectionId = value;
  }

  get belongingTopicId(): string {
    return this._belongingTopicId;
  }

  set belongingTopicId(value: string) {
    this._belongingTopicId = value;
  }

  get author(): string | null {
    return this._author;
  }

  set author(value: string | null) {
    this._author = value;
  }

  get editor(): string | null {
    return this._editor;
  }

  set editor(value: string | null) {
    this._editor = value;
  }

  get origin(): string | null {
    return this._origin;
  }

  set origin(value: string | null) {
    this._origin = value;
  }

  get originUrl(): string | null {
    return this._originUrl;
  }

  set originUrl(value: string | null) {
    this._originUrl = value;
  }

  constructor(
    private readonly _id: string,
    private readonly _timestamp: number,
    private _title: string,
    private _subtitle: string | null,
    private _leadTitle: string | null,
    private _citation: string | null,
    private _coverImage: string | null,
    private _keywords: string | null,
    private _creatorId: string,
    private _closed: boolean,
    private _homeHotMark: boolean,
    private _sectionHotMark: boolean,
    private _creatorHotMark: boolean,
    private _belongingSectionId: string,
    private _belongingTopicId: string | null,
    private _author: string | null,
    private _editor: string | null,
    private _origin: string | null,
    private _originUrl: string | null,
  ) {
    this._id = _id;
    this._timestamp = _timestamp;
    this._title = _title;
    this._subtitle = _subtitle;
    this._leadTitle = _leadTitle;
    this._citation = _citation;
    this._coverImage = _coverImage;
    this._keywords = _keywords;
    this._creatorId = _creatorId;
    this._closed = _closed;
    this._homeHotMark = _homeHotMark;
    this._sectionHotMark = _sectionHotMark;
    this._creatorHotMark = _creatorHotMark;
    this._belongingSectionId = _belongingSectionId;
    this._belongingTopicId = _belongingTopicId;
    this._author = _author;
    this._editor = _editor;
    this._origin = _origin;
    this._originUrl = _originUrl;
  }
}
