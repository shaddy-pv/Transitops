import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string, roleName: string): string => {
  return jwt.sign(
    { id: userId, role: roleName },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRE || '15m' }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
};
