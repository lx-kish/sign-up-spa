import {
  notificationTypes,
  submitStatus,
  routes,
} from "../constants/constants";

export type TNotificationType =
  (typeof notificationTypes)[keyof typeof notificationTypes];

export type TSubmitStatus = (typeof submitStatus)[keyof typeof submitStatus];

export type TRoutes = (typeof routes)[keyof typeof routes];
