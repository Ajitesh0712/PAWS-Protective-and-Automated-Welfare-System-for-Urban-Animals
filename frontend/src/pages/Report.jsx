import UploadForm from "../components/UploadForm";
import "./Report.css";

export default function Report() {
  return (
    <div className="report-page">
      <div className="report-header">
        <h1>🚑 Report Injured Animal</h1>
        <p className="report-description">
          Your quick action can save a life. Report injured or distressed animals 
          in your area and help our rescue team respond faster.
        </p>
      </div>
      <div className="container">
        <UploadForm />
      </div>
    </div>
  );
}
