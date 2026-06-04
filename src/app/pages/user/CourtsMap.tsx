import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Trophy, Bell, User, LogOut, MapPin, Navigation, Search } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { userStore } from "../../utils/userStore";

export default function CourtsMap() {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.CircleMarker>>(new Map());
  const [selectedCourt, setSelectedCourt] = React.useState<number | null>(null);
  const [searchLocation, setSearchLocation] = React.useState("");
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const courts = [
    { id: 1, name: "Cancha de Fútbol Premium", sport: "Fútbol", lat: -13.6339, lng: -72.8788, distance: "0.5 km", price: 50 },
    { id: 2, name: "Cancha de Tenis #2", sport: "Tenis", lat: -13.6355, lng: -72.8805, distance: "0.8 km", price: 35 },
    { id: 3, name: "Cancha de Básquet Indoor", sport: "Básquet", lat: -13.6320, lng: -72.8770, distance: "0.4 km", price: 45 },
    { id: 4, name: "Cancha de Pádel Elite", sport: "Pádel", lat: -13.6360, lng: -72.8750, distance: "1.2 km", price: 40 },
    { id: 5, name: "Cancha de Vóley Playa", sport: "Vóley", lat: -13.6310, lng: -72.8820, distance: "1.5 km", price: 30 }
  ];

  useEffect(() => {
    // Inicializar mapa - Abancay, Apurímac, Perú
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([-13.6339, -72.8788], 14);
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapRef.current);

      // Agregar marcadores para cada cancha
      courts.forEach((court) => {
        const marker = L.circleMarker([court.lat, court.lng], {
          radius: 8,
          fillColor: "#3b82f6",
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        });

        marker.bindPopup(`
          <div class="p-2">
            <h4 class="font-bold">${court.name}</h4>
            <p class="text-sm text-gray-600">${court.sport}</p>
            <p class="text-sm font-semibold">$${court.price}/hora</p>
          </div>
        `);

        marker.on("click", () => setSelectedCourt(court.id));
        marker.addTo(mapRef.current!);
        markersRef.current.set(court.id, marker);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
  }, []);

  // Actualizar color del marcador cuando cambia la selección
  useEffect(() => {
    markersRef.current.forEach((marker, courtId) => {
      marker.setStyle({
        fillColor: selectedCourt === courtId ? "#EA580C" : "#3b82f6",
      });
    });
  }, [selectedCourt]);

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 14);
            // Agregar marcador de ubicación del usuario
            L.circleMarker([latitude, longitude], {
              radius: 10,
              fillColor: "#10b981",
              color: "#fff",
              weight: 3,
              opacity: 1,
              fillOpacity: 0.8,
            }).addTo(mapRef.current).bindPopup("Tu ubicación");
          }
          setSearchLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Si falla, usa la ubicación por defecto de Abancay
          if (mapRef.current) {
            mapRef.current.setView([-13.6339, -72.8788], 14);
            L.circleMarker([-13.6339, -72.8788], {
              radius: 10,
              fillColor: "#10b981",
              color: "#fff",
              weight: 3,
              opacity: 1,
              fillOpacity: 0.8,
            }).addTo(mapRef.current).bindPopup("Ubicación predeterminada - Abancay");
          }
          setSearchLocation("-13.6339, -72.8788");
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }
  };

  const handleLogout = () => {
    userStore.logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">SportBook</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-foreground/80 hover:text-foreground">Dashboard</Link>
              <Link to="/map" className="text-primary font-medium">Mapa</Link>
              <Link to="/my-bookings" className="text-foreground/80 hover:text-foreground">Mis Reservas</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/notifications" className="p-2 hover:bg-accent rounded-lg relative">
                <Bell className="h-5 w-5" />
              </Link>
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" />
                  </div>
                </button>
                <div className={`absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-10 ${showUserMenu ? 'block' : 'hidden'}`}>
                  <Link 
                    to="/profile" 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    Mi Perfil
                  </Link>
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-accent text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex">
        <div className="w-96 bg-white border-r border-border p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Mapa de Canchas</h1>
            <p className="text-muted-foreground text-sm">Encuentra canchas cerca de ti</p>
          </div>

          <div className="mb-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar ubicación..."
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button 
              onClick={handleUseLocation}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
            >
              <Navigation className="h-5 w-5" />
              Usar mi ubicación
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold mb-3">Canchas cercanas ({courts.length})</h3>
            {courts.map((court) => (
              <button
                key={court.id}
                onClick={() => {
                  setSelectedCourt(court.id);
                  if (mapRef.current) {
                    mapRef.current.setView([court.lat, court.lng], 15);
                  }
                }}
                className={`w-full text-left p-4 border rounded-lg transition-colors ${
                  selectedCourt === court.id
                    ? "border-primary bg-orange-50"
                    : "border-border hover:border-primary/50 hover:bg-accent"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{court.name}</h4>
                    <p className="text-xs text-muted-foreground">{court.sport}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">${court.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{court.distance}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div id="map" className="flex-1 relative bg-gray-100" style={{ height: "calc(100vh - 64px)" }} />
      </div>
    </div>
  );
}
