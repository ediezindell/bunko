// 型エイリアスの定義
type Format = 'json' | 'xml';
type FormatVersion = 1 | 2;
// サイズの型エイリアス
export type Other = 0; // その他
export type Tankobon = 1; // 単行本
export type Shinsho = 2; // 新書
export type Bunko = 3; // 文庫
export type SoftcoverTankobon = 4; // 単行本（ソフトカバー）
export type PictureBook = 5; // 絵本
export type BoxedTankobon = 6; // 単行本（箱入り）
export type CasedTankobon = 7; // 単行本（ケース入り）
export type MusicScore = 8; // 楽譜
export type Card = 9; // カード
export type WithCD = 10; // CDなど付属

export type Size =
  | Other
  | Tankobon
  | Shinsho
  | Bunko
  | SoftcoverTankobon
  | PictureBook
  | BoxedTankobon
  | CasedTankobon
  | MusicScore
  | Card
  | WithCD;

// 在庫状況の型エイリアス
type InStock = 1; // 在庫あり
type OutOfStock = 0; // 在庫なし
type LimitedStock = 2; // 限定在庫
type PreOrder = 3; // 予約受付中
type OutOfPrint = 4; // 絶版
type Availability = InStock | OutOfStock | LimitedStock | PreOrder | OutOfPrint;
type OutOfStockFlag = 0 | 1; // 在庫なしの商品表示フラグ
type ChirayomiFlag = 0 | 1; // チラよみ対応商品フラグ
type Sort =
  | 'standard' // 標準
  | 'sales' // 売上順
  | '+releaseDate' // 発売日昇順
  | '-releaseDate' // 発売日降順
  | '+itemPrice' // 価格の安い順
  | '-itemPrice' // 価格の高い順
  | 'reviewCount' // レビュー件数順
  | 'reviewAverage'; // レビュー平均順
type LimitedFlag = 0 | 1; // 限定フラグ
type Carrier = 0 | 1; // キャリアフラグ
type GenreInformationFlag = 0 | 1; // ジャンル情報取得フラグ

// 入力パラメーター
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
  size?: Size; // (*1)
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

// 出力パラメーター
export interface RakutenBooksSearchApiResponse {
  count: number;
  page: number;
  first: number;
  last: number;
  hits: number;
  carrier: Carrier;
  pageCount: number;
  Items: Item[];
  genreInformation?: GenreInformation[];
}

export interface Item {
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

export interface GenreInformation {
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
