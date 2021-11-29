export interface User {
    _id?: string,
    name?: string,
    country?: string,
    profilePic?: string,
    userName: string,
    passwordHash: string
}

export interface Visit {
    UserId: string,
    _id: string,
    name: string,
    dateCreated: string,
    visited: boolean,
    comments?: {comment: string}[],
    tags?: object [],
    category: string,
    pictureLink?: object [],
    coordinates: {
        lat: string,
        lon: string,
    }
}

export interface Route {
    params: {
        userInformation: User,
        userLocations: Visit[],
        locationInformation: Visit
    }
}

export interface Navigation {
    goBack(): unknown;
    navigate(view?: string, data?: object): unknown;
}
