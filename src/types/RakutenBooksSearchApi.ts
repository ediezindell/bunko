type Format = 'json' | 'xml';
type FormatVersion = 1 | 2;

/** すべて */
export type All = 0;
/** 単行本 */
export type Tankobon = 1;
/** 新書 */
export type Shinsho = 2;
/** 文庫 */
export type Bunko = 3;
/** 全集・双書 */
export type Zenshu = 4;
/** 事・辞典 */
export type Jiten = 5;
/** 図鑑 */
export type Zukan = 6;
/** 絵本 */
export type Ehon = 7;
/** カセット,CDなど */
export type CD = 8;
/** コミック */
export type Commic = 9;
/** ムックその他 */
export type Mook = 10;

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
  0: '全て',
  1: '単行本',
  2: '文庫',
  3: '新書',
  4: '全集・双書',
  5: '事・辞典',
  6: '図鑑',
  7: '絵本',
  8: 'カセット,CDなど',
  9: 'コミック',
  10: 'ムックその他',
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
