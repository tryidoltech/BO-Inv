import React, { useState } from 'react'
import Papa from "papaparse";
const CsvUpload = () => {
    const [jsonData, setJsonData] = useState(null);
    const [csvFile, setCsvFile] = useState(null);
  
    // Handle CSV file upload and parse
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      setCsvFile(file);
  
      if (file) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: function (result) {
            setJsonData(result.data);
            console.log("Parsed JSON data:", result.data);
          },
          error: function (error) {
            console.error("Error parsing CSV: ", error);
          }
        });
      }
    };

  const handleDownloadJson = () => {
    if (!jsonData) return;

    const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(jsonBlob);
    link.download = "data.json";
    link.click();
  };

  return (
    <div>
    <h1>CSV to JSON Converter</h1>
    <input
      type="file"
      accept=".csv"
      onChange={handleFileUpload}
    />
    {csvFile && <p>Selected file: {csvFile.name}</p>}

    {jsonData && (
      <div>
        <h2>Converted JSON Data</h2>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>

        {/* Button to download JSON */}
        <button onClick={handleDownloadJson}>Download JSON</button>
      </div>
    )}
  </div>
  )
}

export default CsvUpload