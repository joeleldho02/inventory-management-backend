import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { createAccessToken } from "../../utils/jwt/createToken";
import UserEntity from "../entities/user.entity";
import { ROLES } from "../../utils/roles.list";

// Extend Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: UserEntity;
            roles?: Array<ROLES>;
        }
    }
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const userAccessToken = req.cookies.userAccessToken;
    const userRefreshToken = req.cookies.userRefreshToken;

    if (!userRefreshToken)
        return res.status(401).json({ status: false, message: "Invalid Refresh Token" });

    jwt.verify( userAccessToken, process.env.ACCESS_SECRET_KEY || "", 
        (err: jwt.VerifyErrors | null, decoded) => {
            if (err) {
                console.log("err.name");
                console.log(err.name);

                if (err.name === "JsonWebTokenError" && userRefreshToken) {
                    jwt.verify( userRefreshToken, process.env.REFRESH_SECRET_KEY || "",
                        (errRefresh: jwt.VerifyErrors | null, decodedRefresh: any) => {
                            if (errRefresh)
                                return res.status(401).json({ status: false, message: "Invalid Refresh Token" });
                            
                            const user = decodedRefresh.user;
                            const newAccessToken = createAccessToken(user,process.env.ACCESS_SECRET_KEY || "", process.env.ACCESS_EXPIRY || "5m" );
                            res.cookie("userAccessToken", newAccessToken, {
                                maxAge: 300000, //5 minutes in milliseconds
                                httpOnly: true,
                                secure: true,
                                sameSite: "strict",
                            });
                            next();
                        }
                    );
                } else
                    return res.status(401).json({ status: false, message: "Unauthorized - No token Provided" });
            } else {
                const decodedUser = decoded.user as UserEntity;
                req.user = decodedUser;
                req.roles = decodedUser?.roles;
                next();
            }
        }
    );
};
