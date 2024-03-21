import { notificationTypes, submitStatus } from "../constants/constants";

export type TNotificationType =
  (typeof notificationTypes)[keyof typeof notificationTypes];

export type TSubmitStatus = (typeof submitStatus)[keyof typeof submitStatus];
