import { useState } from "react";
import { uploadReport } from "../api";
import MapPicker from "./MapPicker";

export default function UploadForm() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  const submit = async () => {
    const data = new FormData();
    data.append("image", image);
    data.append("lat", location.lat);
    data.append("lng", location.lng);

    await uploadReport(data);
    alert("🐾 Rescue request submitted!");
  };

  return (
    <div className="card">
      <h3>Upload Injured Animal</h3>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <MapPicker setLocation={setLocation} />
      <button onClick={submit}>Send Rescue Alert</button>
    </div>
  );
}
