import jwt from 'jsonwebtoken';
import UserEntity from '../../libs/entities/user.entity';

export const createAccessToken = (user: UserEntity, accessTokenSecret: string, expiration: string ) => {
    const token = jwt.sign({ user }, accessTokenSecret, {
        expiresIn: expiration, 
    });
    return token;
};

export const createRefreshToken = (user: UserEntity, refreshTokenSecret: string, expiration: string ) => {
    return jwt.sign({ user }, refreshTokenSecret, { 
        expiresIn: expiration 
    });
};