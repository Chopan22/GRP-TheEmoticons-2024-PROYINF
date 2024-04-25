import React, { useState } from 'react'

function SubirImagen () {

    const [imagen, setImagen] = useState('')

    function handleImage(e) {
        console.log(e.target.files)
        setImagen(e.target.files[0])
    }

    return (
        <div>
            <input type="file" name="file" onChange={handleImage} />
            <button> Subir Imagen </button>
        </div>
    );
}

export default SubirImagen;
