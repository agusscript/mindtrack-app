import { useState, useEffect } from "react";
import * as Location from "expo-location";

interface ILocationCoords {
  latitude: number;
  longitude: number;
}

interface IUseLocationResult {
  coords: ILocationCoords | null;
  loading: boolean;
  error: string | null;
  isUsingDefault: boolean;
  locationName: string | null;
}

// Buenos Aires (default fallback)
const DEFAULT_COORDS: ILocationCoords = {
  latitude: -34.61,
  longitude: -58.38,
};

export const useLocation = (): IUseLocationResult => {
  const [coords, setCoords] = useState<ILocationCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingDefault, setIsUsingDefault] = useState(false);
  const [locationName, setLocationName] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true);

        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setCoords(DEFAULT_COORDS);
          setIsUsingDefault(true);
          setLocationName("Buenos Aires");
          return;
        }

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const userCoords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setCoords(userCoords);
        setIsUsingDefault(false);

        try {
          const [address] = await Location.reverseGeocodeAsync(userCoords);
          if (address) {
            const city = address.city || address.subregion || address.region;
            setLocationName(city || "Tu ubicación");
          }
        } catch {
          setLocationName("Tu ubicación");
        }
      } catch (err) {
        console.error("Error getting location:", err);
        setError("No se pudo obtener la ubicación");
        setCoords(DEFAULT_COORDS);
        setIsUsingDefault(true);
        setLocationName("Buenos Aires");
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  return {
    coords,
    loading,
    error,
    isUsingDefault,
    locationName,
  };
};
