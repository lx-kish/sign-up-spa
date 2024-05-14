type User = {
  email: string;
  password: string;
};

type Result =
  | {
      result: "success";
      data: User;
    }
  | {
      result: "error";
      error: string;
    };

export const apiClient = {
  signUp: async (user: User): Promise<Result> => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      result: "success",
      data: user,
    };
  },
};
