
export interface CoordType {
    accuracy:number,
    altitude:number,
    altitudeAccuracy:number,
    heading:number,
    latitude:number,
    longitude:number,
    speed:number,
}

export interface LocationType {
    coords:CoordType,
    timestamp:number,
}