import 'express';

declare module 'express' {
  interface Request {
    requestId: string;
    user?: {
      userId: number;
      email?: string;
    };
  }
}

export {};
