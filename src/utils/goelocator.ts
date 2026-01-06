import { BaseLatLong } from '../@types';

/**
 * Calculates the distance between two points on the Earth's surface.
 *
 *
 */
export class GeoDistance {
  origin: BaseLatLong;
  destination: BaseLatLong;
  kilometers: number = 0;
  miles: number = 0;
  constructor(origin: BaseLatLong, destination: BaseLatLong) {
    this.origin = origin;
    this.destination = destination;
    this.kilometers = this.calculateDistance(this.origin, this.destination);
    this.miles = this.kilometers * 0.621371;
  }

  calculateDistance(origin: BaseLatLong, destination: BaseLatLong) {
    // Convert latitudes and longitudes to radians
    const radLat1 = (origin.latitude * Math.PI) / 180;
    const radLon1 = (origin.longitude * Math.PI) / 180;
    const radLat2 = (destination.latitude * Math.PI) / 180;
    const radLon2 = (destination.longitude * Math.PI) / 180;

    // Differences in coordinates
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;

    // Haversine formula
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Radius of the Earth in kilometers
    const earthRadius = 6371;

    // Calculate distance
    const distance = earthRadius * c;

    return distance;
  }
}
export function getDistance(origin: BaseLatLong, destination: BaseLatLong) {
  return new GeoDistance(origin, destination);
}
