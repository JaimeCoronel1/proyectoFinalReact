import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, DrawingManager } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: 20.6736,
  lng: -103.344,
};

const MapaConRuta = () => {
  const [coordenadas, setCoordenadas] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const drawingRef = useRef(null);

  const handlePolygonComplete = (polygon) => {
    const path = polygon.getPath().getArray().map(coord => ({
      lat: coord.lat(),
      lng: coord.lng()
    }));
    setCoordenadas(path);
    drawingRef.current = { overlay: polygon };
  };

  const handleClear = () => {
    if (drawingRef.current) {
      drawingRef.current.overlay.setMap(null);
      setCoordenadas([]);
    }
  };

  const handleApiLoad = useCallback(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ flex: 3 }}>
        <h1>Mapa con Dibujo</h1>
        <LoadScript
          googleMapsApiKey="AIzaSyA2674Sx0vZp7lagDbIwwAK-1HyDLiGJQU" // Reemplaza con tu clave
          libraries={['drawing']}
          onLoad={handleApiLoad}
        >
          {mapLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
            >
              <DrawingManager
                onPolygonComplete={handlePolygonComplete}
                options={{
                  drawingControl: true,
                  drawingControlOptions: {
                    position: window.google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: ['polygon', 'rectangle', 'polyline'],
                  },
                }}
              />
            </GoogleMap>
          )}
        </LoadScript>
      </div>

      <div style={{ flex: 1, marginLeft: '20px', background: '#f4f4f4', padding: '10px' }}>
        <h3>Coordenadas Dibujadas</h3>
        <button onClick={handleClear}>Eliminar Formas</button>
        <ul>
          {coordenadas.map((coord, index) => (
            <li key={index}>{coord.lat}, {coord.lng}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapaConRuta;
