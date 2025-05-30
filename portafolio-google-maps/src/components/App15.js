import React, { useState, useRef, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

// Contenedor del mapa y tamaño
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

// Centro inicial (ejemplo: Ciudad de México)
const center = {
  lat: 19.4326,
  lng: -99.1332,
};

// Opciones para modos de transporte
const travelModes = [
  { label: "Conducción", value: "DRIVE" },
  { label: "Caminando", value: "WALK" },
  { label: "Bicicleta", value: "BICYCLE" },
];

export default function App() {
  // Estado para origen, destino y modo de transporte
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [travelMode, setTravelMode] = useState("DRIVE");
  const [directionsResponse, setDirectionsResponse] = useState(null);

  // Refs para inputs de autocompletado
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  // Carga la librería de Google Maps con las APIs necesarias
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA2674Sx0vZp7lagDbIwwAK-1HyDLiGJQU",
    libraries: ["places"],
  });

  // Calcular la ruta con Routes API
  const calculateRoute = useCallback(async () => {
    if (!origin || !destination) {
      alert("Por favor ingresa origen y destino");
      return;
    }

    try {
      // Construimos el request con la nueva Routes API
      const directionsService = new window.google.maps.DirectionsService();

      const result = await directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: travelMode, // "DRIVE" | "WALK" | "BICYCLE"
      });

      if (result.status === "OK") {
        setDirectionsResponse(result);
      } else {
        alert("No se encontró ruta: " + result.status);
      }
    } catch (error) {
      alert("Error calculando la ruta: " + error.message);
    }
  }, [origin, destination, travelMode]);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div>
      {/* Controles de entrada */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 10,
          background: "white",
          padding: 10,
          borderRadius: 8,
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          maxWidth: 320,
        }}
      >
        <h3>Calcula tu ruta</h3>

        <Autocomplete
          onLoad={(autocomplete) => (originRef.current = autocomplete)}
          onPlaceChanged={() => {
            const place = originRef.current.getPlace();
            if (place && place.geometry && place.geometry.location) {
              setOrigin(place.geometry.location);
            } else {
              alert(
                "Por favor selecciona una opción válida del autocompletado para Origen"
              );
            }
          }}
        >
          <input
            type="text"
            placeholder="Origen"
            style={{ width: "100%", marginBottom: 8, padding: 6 }}
          />
        </Autocomplete>

        <Autocomplete
          onLoad={(autocomplete) => (destinationRef.current = autocomplete)}
          onPlaceChanged={() => {
            const place = destinationRef.current.getPlace();
            if (place && place.geometry && place.geometry.location) {
              setDestination(place.geometry.location);
            } else {
              alert(
                "Por favor selecciona una opción válida del autocompletado para Destino"
              );
            }
          }}
        >
          <input
            type="text"
            placeholder="Destino"
            style={{ width: "100%", marginBottom: 8, padding: 6 }}
          />
        </Autocomplete>

        <div style={{ marginBottom: 8 }}>
          {travelModes.map((mode) => (
            <label key={mode.value} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="travelMode"
                value={mode.value}
                checked={travelMode === mode.value}
                onChange={() => setTravelMode(mode.value)}
              />{" "}
              {mode.label}
            </label>
          ))}
        </div>

        <button onClick={calculateRoute} style={{ width: "100%", padding: 8 }}>
          Calcular ruta
        </button>
      </div>

      {/* Mapa */}
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Mostrar la ruta calculada */}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
}
