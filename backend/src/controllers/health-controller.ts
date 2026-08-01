import type { NextFunction, Request, Response } from "express";

export const getHealth = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(200).json({
        success: true,
        message: "ok"
    });
}