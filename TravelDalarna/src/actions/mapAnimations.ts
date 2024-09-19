
export const animateToRegion = (lat:number,long:number,latdelta:number, longdelta:number,ref) => {

    let region = {
            latitude: lat,
            longitude: long,
            latitudeDelta: latdelta,
            longitudeDelta: longdelta,
        };

        ref.current.animateToRegion(region, 2000);
    };

