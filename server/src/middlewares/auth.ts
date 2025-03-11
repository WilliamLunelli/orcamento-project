import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Estendendo o tipo Request para incluir o usuario
declare global {
  namespace Express {
    interface Request {
      usuario?: any;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res
        .status(401)
        .json({ msg: "Token não fornecido, autorização negada" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.usuario = (decoded as any).usuario;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token inválido" });
  }
};

export default authMiddleware;
