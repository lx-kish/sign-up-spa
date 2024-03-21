export const timeouts = {
  SUCCESS_MESSAGE_TIMEOUT: 7,
  ERROR_MESSAGE_TIMEOUT: 5,
} as const;

export const submitStatus = {
  fulfilled: "fulfilled",
  pending: "pending",
  rejected: "rejected",
} as const;

export const notificationTypes = {
  error: "error",
  success: "success",
  none: "",
} as const;
