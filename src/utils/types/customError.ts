export interface customError {
  status?: number;
  data?: any;
}

export interface CustomError {
  status: number;
  data: {
    ip: string;
    message: string;
    method: string;
    path: string;
    statusCode: number;
    timestamp: string;
  };
}
