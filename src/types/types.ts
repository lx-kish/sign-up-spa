import {
  notificationTypes,
  submitStatus,
  routes,
  navigationLinks,
  formFieldExpressions,
} from "../constants/constants";

export type TNotificationType =
  (typeof notificationTypes)[keyof typeof notificationTypes];

export type TSubmitStatus = (typeof submitStatus)[keyof typeof submitStatus];

export type TRoutes = (typeof routes)[keyof typeof routes];

export type TNavigationLinks =
  (typeof navigationLinks)[keyof typeof navigationLinks];

export type TFormFieldExpressions =
  (typeof formFieldExpressions)[keyof typeof formFieldExpressions];
