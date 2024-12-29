type Format = 'json' | 'xml';
type FormatVersion = 1 | 2;

/** 小説 */
export const GENRE_BOOK = '001';
export const GENRE_SHOSETSU = '001004';
export const GENRE_BUNKO = '001019';
export const GENRE_SHINSHO = '001020';

/** すべて */
export const SIZE_ALL = 0;
export type All = typeof SIZE_ALL;
/** 単行本 */
export const SIZE_TANKOBON = 1;
export type Tankobon = typeof SIZE_TANKOBON;
/** 文庫 */
export const SIZE_BUNKO = 2;
export type Bunko = typeof SIZE_BUNKO;
/** 新書 */
export const SIZE_SHINSHO = 3;
export type Shinsho = typeof SIZE_SHINSHO;
/** 全集・双書 */
export const SIZE_ZENSHU = 4;
export type Zenshu = typeof SIZE_ZENSHU;
/** 事・辞典 */
export const SIZE_JITEN = 5;
export type Jiten = typeof SIZE_JITEN;
/** 図鑑 */
export const SIZE_ZUKAN = 6;
export type Zukan = typeof SIZE_ZUKAN;
/** 絵本 */
export const SIZE_EHON = 7;
export type Ehon = typeof SIZE_EHON;
/** カセット,CDなど */
export const SIZE_CD = 8;
export type CD = typeof SIZE_CD;
/** コミック */
export const SIZE_COMMIC = 9;
export type Commic = typeof SIZE_COMMIC;
/** ムックその他 */
export const SIZE_MOOK = 10;
export type Mook = typeof SIZE_MOOK;

export type SizeKey =
  | All
  | Tankobon
  | Shinsho
  | Bunko
  | Zenshu
  | Jiten
  | Zukan
  | Ehon
  | CD
  | Commic
  | Mook;

export const sizeMap = {
  [SIZE_ALL]: '全て',
  [SIZE_TANKOBON]: '単行本',
  [SIZE_BUNKO]: '文庫',
  [SIZE_SHINSHO]: '新書',
  [SIZE_ZENSHU]: '全集・双書',
  [SIZE_JITEN]: '事・辞典',
  [SIZE_ZUKAN]: '図鑑',
  [SIZE_EHON]: '絵本',
  [SIZE_CD]: 'カセット,CDなど',
  [SIZE_COMMIC]: 'コミック',
  [SIZE_MOOK]: 'ムックその他',
} as const;

export type Size = (typeof sizeMap)[SizeKey];

/** 在庫あり */
type InStock = 1;
/** 在庫なし */
type OutOfStock = 0;
/** 限定在庫 */
type LimitedStock = 2;
/** 予約受付中 */
type PreOrder = 3;
/** 絶版 */
type OutOfPrint = 4;
type Availability = InStock | OutOfStock | LimitedStock | PreOrder | OutOfPrint;

/** 在庫なしの商品表示フラグ */
type OutOfStockFlag = 0 | 1;
/** チラよみ対応商品フラグ */
type ChirayomiFlag = 0 | 1;
type Sort =
  | 'standard' // 標準
  | 'sales' // 売上順
  | '+releaseDate' // 発売日昇順
  | '-releaseDate' // 発売日降順
  | '+itemPrice' // 価格の安い順
  | '-itemPrice' // 価格の高い順
  | 'reviewCount' // レビュー件数順
  | 'reviewAverage'; // レビュー平均順
type LimitedFlag = 0 | 1;
type Carrier = 0 | 1;
type GenreInformationFlag = 0 | 1;

/**
 * 入力パラメーター
 */
export interface RakutenBooksSearchApiParams {
  // 共通パラメーター
  applicationId: string; // 必須
  affiliateId?: string;
  format?: Format; // デフォルト: 'json'
  callback?: string;
  elements?: string;
  formatVersion?: FormatVersion;

  // サービス固有パラメーター
  title?: string; // (*1)
  author?: string; // (*1)
  publisherName?: string; // (*1)
  size?: SizeKey; // (*1)
  isbn?: string; // (*1)
  booksGenreId?: string; // (*1)
  hits?: number; // デフォルト: 30 (1〜30)
  page?: number; // デフォルト: 1 (1〜100)
  availability?: Availability; // デフォルト: 0
  outOfStockFlag?: OutOfStockFlag; // デフォルト: 0
  chirayomiFlag?: ChirayomiFlag; // デフォルト: 0
  sort?: Sort; // デフォルト: 'standard'
  limitedFlag?: LimitedFlag; // デフォルト: 0
  carrier?: Carrier; // デフォルト: 0
  genreInformationFlag?: GenreInformationFlag; // デフォルト: 0
}

/**
 * 出力パラメーター
 */
export interface RakutenBooksSearchApiResponse {
  count: number;
  page: number;
  first: number;
  last: number;
  hits: number;
  carrier: Carrier;
  pageCount: number;
  Items: Book[];
  genreInformation?: Genre[];
}

/**
 * 本
 */
export interface Book {
  title: string;
  titleKana?: string;
  subTitle?: string;
  subTitleKana?: string;
  seriesName?: string;
  seriesNameKana?: string;
  contents?: string;
  contentsKana?: string;
  author: string;
  authorKana?: string;
  publisherName: string;
  size: Size;
  isbn: string;
  itemCaption?: string;
  salesDate?: string;
  itemPrice: number;
  listPrice?: number;
  discountRate?: number;
  discountPrice?: number;
  itemUrl: string;
  affiliateUrl?: string;
  smallImageUrl: string;
  mediumImageUrl: string;
  largeImageUrl: string;
  chirayomiUrl?: string;
  availability: Availability;
  postageFlag: 0 | 1 | 2;
  limitedFlag: LimitedFlag;
  reviewCount?: number;
  reviewAverage?: number;
  booksGenreId: string;
}

/**
 * ジャンル情報
 */
export interface Genre {
  parent?: {
    booksGenreId: string;
    booksGenreName: string;
    genreLevel: number;
    itemCount?: number;
  };
  current?: {
    booksGenreId: string;
    booksGenreName: string;
    genreLevel: number;
    itemCount?: number;
  };
  children?: Array<{
    booksGenreId: string;
    booksGenreName: string;
    genreLevel: number;
    itemCount?: number;
  }>;
}
