import { useEffect, useState } from "react";
import { getReports } from "../api";

export default function Dashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    getReports().then(res => setReports(res.data));
  }, []);

  return (
    <div className="container">
      <h2>🚑 Live Rescue Requests</h2>

      {reports.map((r, i) => (
        <div key={i} className="card">
          <h4>{r.animal}</h4>
          <p>Severity: {r.severity}</p>
          <p>Status: {r.status}</p>
        </div>
      ))}
    </div>
  );
}
