type Format = 'json' | 'xml';
type FormatVersion = 1 | 2;

/** 小説 */
export const GENRE_BOOK = '001';
export const GENRE_SHOSETSU = '001004';
export const GENRE_BUNKO = '001019';
export const GENRE_SHINSHO = '001020';

/** すべて */
export const SIZE_ALL = 0;
/** すべて */
export type All = typeof SIZE_ALL;
/** 単行本 */
export const SIZE_TANKOBON = 1;
/** 単行本 */
export type Tankobon = typeof SIZE_TANKOBON;
/** 文庫 */
export const SIZE_BUNKO = 2;
/** 文庫 */
export type Bunko = typeof SIZE_BUNKO;
/** 新書 */
export const SIZE_SHINSHO = 3;
/** 新書 */
export type Shinsho = typeof SIZE_SHINSHO;
/** 全集・双書 */
export const SIZE_ZENSHU = 4;
/** 全集・双書 */
export type Zenshu = typeof SIZE_ZENSHU;
/** 事・辞典 */
export const SIZE_JITEN = 5;
/** 事・辞典 */
export type Jiten = typeof SIZE_JITEN;
/** 図鑑 */
export const SIZE_ZUKAN = 6;
/** 図鑑 */
export type Zukan = typeof SIZE_ZUKAN;
/** 絵本 */
export const SIZE_EHON = 7;
/** 絵本 */
export type Ehon = typeof SIZE_EHON;
/** カセット,CDなど */
export const SIZE_CD = 8;
/** カセット,CDなど */
export type CD = typeof SIZE_CD;
/** コミック */
export const SIZE_COMMIC = 9;
/** コミック */
export type Commic = typeof SIZE_COMMIC;
/** ムックその他 */
export const SIZE_MOOK = 10;
/** ムックその他 */
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

/** 在庫なし */
export const AVAIL_OUT_OF_STOCK = 0;
/** 在庫なし */
type OutOfStock = typeof AVAIL_OUT_OF_STOCK;
/** 在庫あり */
export const AVAIL_IN_STOCK = 1;
/** 在庫あり */
type InStock = typeof AVAIL_IN_STOCK;
/** 限定在庫 */
export const AVAIL_LIMITED = 2;
/** 限定在庫 */
type LimitedStock = typeof AVAIL_LIMITED;
/** 予約受付中 */
export const AVAIL_PRE_ORDER = 3;
/** 予約受付中 */
type PreOrder = typeof AVAIL_PRE_ORDER;
/** 絶版 */
export const AVAIL_OUT_OF_PRINT = 4;
/** 絶版 */
type OutOfPrint = typeof AVAIL_OUT_OF_PRINT;
type AvailabilityKey =
  | InStock
  | OutOfStock
  | LimitedStock
  | PreOrder
  | OutOfPrint;

export const availabilityMap = {
  [AVAIL_OUT_OF_STOCK]: '在庫なし',
  [AVAIL_IN_STOCK]: '在庫あり',
  [AVAIL_LIMITED]: '限定在庫',
  [AVAIL_PRE_ORDER]: '予約受付中',
  [AVAIL_OUT_OF_PRINT]: '絶版',
} as const;

export type Availability = (typeof availabilityMap)[AvailabilityKey];

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
  availability?: AvailabilityKey; // デフォルト: 0
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
  availability: AvailabilityKey;
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
