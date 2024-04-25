import React, { useState, useEffect } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import dicomParser from 'dicom-parser';

// Esto sirve para inicializar los lectores de images DICOM, WADO es un alias para referirse a "Web Access to Dicom Objects"
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

// Sin esto simplemente no funciona, pero aqui habría que poner algun tipo de credencial en el caso de usar un servidor
cornerstoneWADOImageLoader.configure({
    useWebWorkers: true,
    decodeConfig: {
      convertFloatPixelDataToInt: false,
    },
});

// Esta configuración optimiza la cantidad de recursos para usar la mayor cantidad de nucleos
// disponibles para renderizar la imagen
var config = {
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: false,
    taskConfiguration: {
      decodeTask: {
        initializeCodecsOnStartup: true,
        strict: false,
      },
    },
};
  
// Aplica la configuración 
cornerstoneWADOImageLoader.webWorkerManager.initialize(config);

function Dicom() {
    const [file, setFile] = useState(null);

    // Cuando subes una imagen a la pagina, transforma la imagen en un url para luego mostrarla, si no hacemos esto
    // entonces en cualquier buscador tirara un error diciendo que por politica CORS no puede funcionar
    const onFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        console.log(url)
        setFile(url);
    };

    // Efectivamente renderiza la imagen DICOM que nosotros subimos en la pagina web
    const onFileUpload = () => {
        cornerstone.loadImage('wadouri:' + file).then((image) => {
        const element = document.getElementById('dicomImage');
        cornerstone.enable(element);
        cornerstone.displayImage(element, image);
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Enviar Imagen</button>
            <div id="dicomImage" style={{width: '512px', height: '512px'}}></div>
        </div>
    );
}

export default Dicom;