import * as Location from "expo-location";
import { useCallback, useState } from "react";

interface ILocation {
  longitude: number;
  latitude: number;
}

interface ILocationResult {
  location: ILocation | null;
  loading: boolean;
  error: string | null;
  getLocation: () => Promise<ILocation | null>;
}

export const useCheckLocation = (): ILocationResult => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLocation = useCallback(async (): Promise<ILocation | null> => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Permission check =================
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission not granted");
        return null;
      }

      // ✅ Location fetch ================
      const newLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = newLocation.coords;
      const loc = { latitude, longitude };
      setLocation(loc);
      return loc;
    } catch (err) {
      setError("Failed to get location. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { location, loading, error, getLocation };
};
