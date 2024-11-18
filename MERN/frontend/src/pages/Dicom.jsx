import React, { useState, useEffect } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';
import cornerstoneTools from 'cornerstone-tools';
import cornerstoneMath from 'cornerstone-math';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';

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
            initializeCodecsOnStartup: true 
        }
    }
});

const Dicom = () => {
    const location = useLocation();
    const { paciente } = location.state || {};
    const [file, setFile] = useState(null);
    const [dicomData, setDicomData] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [sepia, setSepia] = useState(0);
    const [invert, setInvert] = useState(0);
    const [hueRotate, setHueRotate] = useState(0);
    const [image, setImage] = useState(null);

    // Estados para arrastrar la imagen
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);

    const onFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const url = URL.createObjectURL(selectedFile);
        setFile(url);
    };

    const onFileUpload = async () => {
        if (!file) {
            console.error("Por favor selecciona un archivo");
            return;
        }

        const formData = new FormData();
        formData.append('archivo', file);
        formData.append('pacienteId', paciente._id); 

        try {
            const response = await axios.post('/api/pacientes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Archivo subido:', response.data);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
        } 

        cornerstone.loadImage('wadouri:' + file).then((loadedImage) => {
            const metadatos = {
                patientName: loadedImage.data.string('x00100010'),
                patientID: loadedImage.data.string('x00100020'),
                patientBirthDate: loadedImage.data.string('x00100030'),
                patientSex: loadedImage.data.string('x00100040'),
                studyInstanceUID: loadedImage.data.string('x0020000D'),
                studyDate: loadedImage.data.string('x00080020'),
                institutionName: loadedImage.data.string('x00080080'),
                modality: loadedImage.data.string('x00080060'),
                imageNumber: loadedImage.data.string('x00200013')
            };

            setDicomData(metadatos);
            setImage(loadedImage);

            const element = document.getElementById('dicomImage');
            cornerstone.enable(element);
            cornerstone.displayImage(element, loadedImage);
            updateViewport(); // Actualizamos la vista inicial
        }).catch(error => {
            console.error('Error al cargar la imagen DICOM: ', error);
        });
    };

    const updateViewport = () => {
        if (image) {
            const element = document.getElementById('dicomImage');
            const viewport = cornerstone.getViewport(element);
            viewport.scale = zoom;
            viewport.rotation = rotation;
            cornerstone.setViewport(element, viewport);
        }
    };

    useEffect(() => {
        updateViewport();
    }, [zoom, rotation, image]);

    // Manejadores para arrastrar la imagen
    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setStartY(e.clientY);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;

        const element = document.getElementById('dicomImage');
        const viewport = cornerstone.getViewport(element);
        
        // Calculamos el desplazamiento
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        // Invertir la dirección del movimiento
        viewport.translation.x += dx;
        viewport.translation.y += dy;

        cornerstone.setViewport(element, viewport);

        // Actualizamos la posición inicial
        setStartX(e.clientX);
        setStartY(e.clientY);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    // Manejador para el zoom con la rueda del mouse
    const onWheel = (e) => {
        e.preventDefault(); // Evitar el scroll de la página

        const zoomFactor = 0.1; // Ajusta este valor según lo necesites
        const newZoom = e.deltaY < 0 ? zoom + zoomFactor : zoom - zoomFactor;
        setZoom(Math.max(1, Math.min(newZoom, 3)));
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px' }}>
                {dicomData && (
                    <div style={{ marginRight: '40px', textAlign: 'justify' }}>
                        <h2 style={{ marginBottom: '10px' }}>Metadatos DICOM</h2>
                        <p><strong>Paciente:</strong> {dicomData.patientName} / {paciente.nombre} </p>
                        <p><strong>ID Paciente:</strong> {dicomData.patientID} / {paciente.rut}</p>
                        <p><strong>Fecha Nacimiento:</strong> {dicomData.patientBirthDate}</p>
                        <p><strong>Sexo:</strong> {dicomData.patientSex} / {paciente.sexo} </p>
                        <p><strong>ID del Estudio:</strong> {dicomData.studyInstanceUID} / {paciente._id}</p>
                        <p><strong>Fecha del Estudio:</strong> {dicomData.studyDate}</p>
                        <p><strong>Nombre Institución:</strong> {dicomData.institutionName}</p>
                        <p><strong>Modalidad:</strong> {dicomData.modality}</p>
                        <p><strong>Número de Imagen:</strong> {dicomData.imageNumber}</p>
                    </div>
                )}
                <div>
                    <input type="file" onChange={onFileChange} />
                    <button onClick={onFileUpload}>Enviar Imagen</button>
                    <div 
                        id="dicomImage" 
                        style={{ 
                            width: '512px', 
                            height: '512px', 
                            filter: `brightness(${brightness}%) contrast(${contrast}%) sepia(${sepia}%) invert(${invert}%) hue-rotate(${hueRotate}deg)`, 
                            cursor: isDragging ? 'grabbing' : 'grab'
                        }}
                        onMouseDown={onMouseDown}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp}
                        onWheel={onWheel}
                    ></div>
                    <div>
                        <label>Zoom:</label>
                        <input 
                            type="range" 
                            min="1" 
                            max="5" 
                            step="0.01" 
                            value={zoom} 
                            onChange={(e) => setZoom(Number(e.target.value))} 
                        />
                    </div>
                    <div>
                        <label>Rotación:</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="360" 
                            step="1" 
                            value={rotation} 
                            onChange={(e) => setRotation(Number(e.target.value))} 
                        />
                    </div>
                    <div>
                        <label>Brillo:</label>
                        <input 
                            type="range" 
                            min="20" 
                            max="300" 
                            step="1" 
                            value={brightness} 
                            onChange={(e) => setBrightness(Number(e.target.value))} 
                        />
                    </div>
                    <div>
                        <label>Contraste:</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="250" 
                            step="1" 
                            value={contrast} 
                            onChange={(e) => setContrast(Number(e.target.value))} 
                        />
                    </div>
                    <div>
                        <label>Sepia:</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="1" 
                            value={sepia} 
                            onChange={(e) => setSepia(Number(e.target.value))} 
                        />
                    </div>
                    <div>
                        <label>Invertir:</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="1" 
                            value={invert} 
                            onChange={(e) => setInvert(Number(e.target.value))} 
                        />
                    </div>
                    <div>
                        <label>Hue-Rotate:</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="360" 
                            step="1" 
                            value={hueRotate} 
                            onChange={(e) => setHueRotate(Number(e.target.value))} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dicom;