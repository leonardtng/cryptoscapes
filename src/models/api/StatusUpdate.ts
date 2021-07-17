import { GenericState } from "..";

export type StatusUpdateCategory =
  'general'
  | 'milestone'
  | 'partnership'
  | 'exchangeListing'
  | 'softwareRelease'
  | 'fundMovement'
  | 'newListings'
  | 'event'

export interface StatusUpdateCategoryMenuItem {
  categoryId: StatusUpdateCategory,
  label: string;
}

export interface StatusUpdateQueryParams {
  page: number;
  perPage: number;
  category: StatusUpdateCategory;
}

export interface StatusUpdateImage {
  thumb: string;
  small: string;
  large: string;
}

export interface StatusUpdateProject {
  type: string;
  id: string;
  name: string;
  image: StatusUpdateImage;
  symbol: string;
}

export interface StatusUpdate {
  description: string;
  category: string;
  createdAt: string;
  user: string;
  userTitle: string;
  pin: boolean;
  project: StatusUpdateProject;
}

export interface StatusUpdateRootObject {
  statusUpdates: StatusUpdate[];
}

export interface StatusUpdateListState extends GenericState<StatusUpdate[]> {
  statusUpdateQueryParams: StatusUpdateQueryParams;
  hasMore: boolean;
}
