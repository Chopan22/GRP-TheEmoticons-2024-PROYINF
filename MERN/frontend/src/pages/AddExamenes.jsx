import React, { useState, useEffect } from "react";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneMath from "cornerstone-math";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Configuración de Cornerstone
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;

// Configuración de los web workers
cornerstoneWADOImageLoader.webWorkerManager.initialize({
  maxWebWorkers: navigator.hardwareConcurrency || 1,
  startWebWorkersOnDemand: true,
  taskConfiguration: {
    decodeTask: {
      initializeCodecsOnStartup: true,
    },
  },
});

const AddExamenes = () => {
  const location = useLocation();
  const { paciente } = location.state || {};
  const [file, setFile] = useState(null);
  const [dicomData, setDicomData] = useState(null);
  const [image, setImage] = useState(null);

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setFile(url);
      setDicomData(null); // Resetea los metadatos al cambiar de archivo
      setImage(null); // Resetea la imagen previa
    }
  };

  const onPreview = () => {
    if (!file) {
      alert("Selecciona un archivo antes de previsualizar.");
      return;
    }

    cornerstone
      .loadImage("wadouri:" + file)
      .then((loadedImage) => {
        // Extrae metadatos del archivo
        const metadatos = {
          patientName: loadedImage.data.string("x00100010"),
          patientID: loadedImage.data.string("x00100020"),
          patientBirthDate: loadedImage.data.string("x00100030"),
          patientSex: loadedImage.data.string("x00100040"),
          studyInstanceUID: loadedImage.data.string("x0020000D"),
          modality: loadedImage.data.string("x00080060"),
        };

        setDicomData(metadatos);
        setImage(loadedImage);

        const element = document.getElementById("dicomImage");
        cornerstone.enable(element);
        cornerstone.displayImage(element, loadedImage);
        updateViewport(); // Configuración inicial de la vista
      })
      .catch((error) => {
        console.error("Error al cargar la imagen DICOM: ", error);
      });
  };

  const onUpload = async () => {
    if (!file) {
      alert("Selecciona y previsualiza un archivo antes de subirlo.");
      return;
    }

    const formData = new FormData();
    formData.append("archivo", file);
    formData.append("pacienteId", paciente._id);

    try {
      const response = await axios.post("/api/pacientes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Archivo subido:", response.data);
      alert("Archivo subido exitosamente.");
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      alert("Error al subir el archivo.");
    }
  };



  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
      <input type="file" onChange={onFileChange} />
      <button onClick={onPreview} disabled={!file}>
        Previsualizar Imagen
      </button>

      <div id="dicomImage" style={{ width: "512px", height: "512px", border: "1px solid black" }}></div>

      {dicomData && (
        <div style={{ marginTop: "10px" }}>
          <h3>Metadatos DICOM</h3>
          <p><strong>Paciente:</strong> {dicomData.patientName} / {paciente?.nombre}</p>
          <p><strong>ID Paciente:</strong> {dicomData.patientID} / {paciente?.rut}</p>
          <p><strong>Modalidad:</strong> {dicomData.modality}</p>
        </div>
      )}
      <button onClick={onUpload} disabled={!image}>
        Subir Imagen
      </button>


    </div>
  );
};

export default AddExamenes;
