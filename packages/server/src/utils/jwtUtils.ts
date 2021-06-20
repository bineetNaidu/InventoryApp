import jwt from 'jsonwebtoken';

type Token = {
  id: string;
  email: string;
  is_admin: boolean;
  iat: number;
  exp: number;
};

export const createJWT = async (id: number, email: string, is_admin: boolean) =>
  jwt.sign({ id, email, is_admin }, process.env.JWT_TOKEN!, {
    expiresIn: '7d',
  });

export const decodeJWT = async (token: string): Promise<Token> =>
  jwt.decode(token) as Token;

export const verifyJWT = (token: string) =>
  jwt.verify(token, process.env.JWT_TOKEN!);
