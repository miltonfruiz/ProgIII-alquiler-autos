import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Arreglar iconos por defecto de Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Coordenadas de los lugares
const ubicaciones = {
  airport: {
    coords: [-32.9036, -60.785],
    nombre: 'Aeropuerto de Rosario "Islas Malvinas"',
  },
  downtown: {
    coords: [-32.9468, -60.6393],
    nombre: "Centro de Rosario - Sucursal Principal",
  },
  busStation: {
    coords: [-32.9575, -60.6397],
    nombre: "Terminal de Ómnibus Mariano Moreno",
  },
  other: {
    coords: [-32.9468, -60.6393],
    nombre: "Otra ubicación",
  },
};

function MapComponent({ location, height = "200px" }) {
  const lugar = ubicaciones[location] || ubicaciones.airport;
  const position = lugar.coords;

  return (
    <div
      style={{ height, width: "100%", borderRadius: "8px", overflow: "hidden" }}
    >
      <MapContainer
        center={position}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{lugar.nombre}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapComponent;
