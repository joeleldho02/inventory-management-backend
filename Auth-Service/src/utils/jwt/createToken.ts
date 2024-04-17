import jwt from 'jsonwebtoken';

export const createAccessToken = (user: any, accessTokenSecret: string, expiration: string ) => {
    const token = jwt.sign({ user }, accessTokenSecret, {
        expiresIn: expiration, 
    });
    return token;
};

export const createRefreshToken = (user: any, refreshTokenSecret: string, expiration: string ) => {
    return jwt.sign({ user }, refreshTokenSecret, { 
        expiresIn: expiration 
    });
};