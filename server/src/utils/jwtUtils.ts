import jwt from 'jsonwebtoken';

export const createJWT = async (id: number, email: string, is_admin: boolean) =>
  jwt.sign({ id, email, is_admin }, process.env.JWT_TOKEN!, {
    expiresIn: '7d',
  });

export const decodeJWT = async (token: string) => jwt.decode(token);

export const verifyJWT = (token: string) =>
  jwt.verify(token, process.env.JWT_TOKEN!);
