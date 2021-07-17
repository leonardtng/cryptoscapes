import { GenericState } from "..";

export interface StatusUpdateQueryParams {
  page: number;
  perPage: number;
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
  createdAt: Date;
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
