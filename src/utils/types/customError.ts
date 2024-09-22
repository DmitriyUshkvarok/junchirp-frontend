export interface customError {
  status?: number;
  data?: any;
}

export interface CustomError {
  status: number;
  data: {
    message: string;
  };
}
