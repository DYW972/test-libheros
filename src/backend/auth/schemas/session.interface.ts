export type SaveSession = {
  userId: string;
  hashedToken: string;
  role: string;
  ip: string;
  userAgent: string;
  expiresAt: Date;
};
