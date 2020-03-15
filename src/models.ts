export interface EventPayload {
  eventName: string;
  detail?: EventDetail;
}

export type EventDetail = CapturedTab;

export interface CapturedTab {
  imgSrc: string;
  width: number;
  height: number;
}
