import { useEffect, useState } from "react";

export default function MapPicker({ setLocation }) {
  const [locationStatus, setLocationStatus] = useState("detecting");

  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus("detecting");
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          setLocation(loc);
          setLocationStatus("success");
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationStatus("error");
          // Set a default location or allow manual input
          // For now, we'll set a default (can be changed)
          setLocation({
            lat: 28.5355, // Default to a common location
            lng: 77.3910
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationStatus("error");
      setLocation({
        lat: 28.5355,
        lng: 77.3910
      });
    }
  }, [setLocation]);

  return (
    <div className="map-picker">
      {locationStatus === "detecting" && (
        <p className="location-status detecting">
          <span className="spinner">📍</span> Detecting your location...
        </p>
      )}
      {locationStatus === "success" && (
        <p className="location-status success">
          ✅ Location detected successfully
        </p>
      )}
      {locationStatus === "error" && (
        <p className="location-status error">
          ⚠️ Could not detect location automatically. Using default location.
        </p>
      )}
    </div>
  );
}
