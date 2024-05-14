export const timeouts = {
  success: 7,
  error: 5,
  pending: 1,
} as const;

export const submitStatus = {
  fulfilled: "fulfilled",
  pending: "pending",
  rejected: "rejected",
} as const;

export const notificationTypes = {
  error: "error",
  success: "success",
  pending: "pending",
  none: "",
} as const;

export const routes = {
  home: "/sign-up-spa",
  signUp: "/sign-up-spa/sign-up",
  none: "",
} as const;

export const navigationLinks = {
  home: "Home",
  signUp: "Sign Up",
} as const;

export const formFieldExpressions = {
  email:
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{1,1})+[^<>()\.,;:\s@\"]{2,})$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?([^\w\s]|[_])).{8,}$/,
} as const;
