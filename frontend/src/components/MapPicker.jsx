import { useEffect } from "react";

export default function MapPicker({ setLocation }) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });
  }, []);

  return <p>📍 Location auto-detected</p>;
}
