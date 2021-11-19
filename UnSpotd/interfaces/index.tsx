
export interface User {
    _id: string,
    name?: string,
    country?: string,
    profilePic?: string,
    userName: string,
    passwordHash: string
};

export interface Visits extends Array<Visit> {};

interface Visit {
    UserId: string,
    _id: string,
    name: string,
    dateCreated: string,
    visited: boolean,
    comments?: {comment: string}[],
    tags?: object [],
    category?: string,
    pictureLink?: object [],
    coordinates: {
        lat: string,
        lon: string,
    }
};
