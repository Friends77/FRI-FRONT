export interface IPaginationParams {
  size?: number;
}

export interface IPaginationResponse {
  hasNext: boolean;
}

export interface IInterestCategoryItem {
  id: number;
  name: string;
  type: string;
  image: string | null;
}
