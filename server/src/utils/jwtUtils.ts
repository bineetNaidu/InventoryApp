import jwt from 'jsonwebtoken';

export const createJWT = async (id: string | number, email: string) =>
  jwt.sign({ id, email }, process.env.JWT_TOKEN!, {
    expiresIn: '7d',
  });

export const decodeJWT = async (token: string) => jwt.decode(token);

export const verifyJWT = async (
  token: string,
  id?: string | number,
  email?: string
) => jwt.verify(token, process.env.JWT_TOKEN!);
