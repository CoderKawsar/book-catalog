export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews?: [{ reviewerEmail?: string; rating?: number; comment?: string }];
  addedBy: string;
};

export interface Review {
  reviewerEmail?: string;
  rating: number;
  comment: string;
}

export type IBooksResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: IBook;
};
