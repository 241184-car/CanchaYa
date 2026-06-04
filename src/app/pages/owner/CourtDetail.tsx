import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, Star, Clock, Users, Wifi, Car, Shield, ChevronLeft, ChevronRight, Calendar, Trophy, Bell, User as UserIcon, LogOut } from "lucide-react";

export default function CourtDetail() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const court = {
    id: 1,
    name: "Cancha de Fútbol Premium",
    sport: "Fútbol",
    images: [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=1200&q=80",
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=1200&q=80"
    ],
    location: "Centro Deportivo Norte, Av. Principal 123, Ciudad",
    rating: 4.8,
    reviews: 124,
    price: 50,
    capacity: "10-14 jugadores",
    surface: "Césped sintético premium",
    description: "Cancha de fútbol profesional con iluminación LED de última generación y césped sintético de primera calidad. Perfecta para partidos competitivos y recreativos.",
    amenities: [
      { icon: Shield, label: "Iluminación LED" },
      { icon: Users, label: "Vestuarios equipados" },
      { icon: Car, label: "Estacionamiento gratuito" },
      { icon: Wifi, label: "WiFi gratis" },
      { icon: Shield, label: "Seguridad 24/7" },
      { icon: Clock, label: "Disponible 6am-11pm" }
    ],
    availableSlots: [
      { time: "08:00", available: true },
      { time: "09:30", available: true },
      { time: "11:00", available: false },
      { time: "12:30", available: true },
      { time: "14:00", available: true },
      { time: "15:30", available: false },
      { time: "17:00", available: true },
      { time: "18:30", available: true },
      { time: "20:00", available: false }
    ],
    rules: [
      "No fumar dentro de las instalaciones",
      "Respetar los horarios de inicio y fin",
      "Usar calzado deportivo adecuado",
      "Mantener el área limpia"
    ]
  };

  const reviews = [
    {
      id: 1,
      userName: "Carlos Méndez",
      rating: 5,
      date: "Hace 2 días",
      comment: "Excelente cancha, muy bien mantenida. La iluminación es perfecta para partidos nocturnos."
    },
    {
      id: 2,
      userName: "María Torres",
      rating: 4,
      date: "Hace 1 semana",
      comment: "Muy buena ubicación y facilidades. Los vestuarios están limpios."
    },
    {
      id: 3,
      userName: "Luis Ramírez",
      rating: 5,
      date: "Hace 2 semanas",
      comment: "La mejor cancha de la zona. El césped sintético es de primera calidad."
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % court.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + court.images.length) % court.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">SportBook</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-foreground/80 hover:text-foreground">Dashboard</Link>
              <Link to="/courts" className="text-primary font-medium">Canchas</Link>
              <Link to="/my-bookings" className="text-foreground/80 hover:text-foreground">Mis Reservas</Link>
              <Link to="/map" className="text-foreground/80 hover:text-foreground">Mapa</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/notifications" className="p-2 hover:bg-accent rounded-lg relative">
                <Bell className="h-5 w-5" />
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    <UserIcon className="h-5 w-5" />
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg hidden group-hover:block">
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 hover:bg-accent">
                    <UserIcon className="h-4 w-4" />
                    Mi Perfil
                  </Link>
                  <Link to="/" className="flex items-center gap-2 px-4 py-2 hover:bg-accent text-destructive">
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/courts" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4" />
          Volver a canchas
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-96 rounded-xl overflow-hidden bg-gray-200">
              <img
                src={court.images[currentImageIndex]}
                alt={court.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {court.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {court.sport}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold mb-2">{court.name}</h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{court.rating}</span>
                      <span>({court.reviews} reseñas)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{court.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">${court.price}</div>
                  <div className="text-muted-foreground text-sm">por hora</div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{court.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-accent rounded-lg">
                  <div className="text-sm text-muted-foreground">Capacidad</div>
                  <div className="font-medium">{court.capacity}</div>
                </div>
                <div className="p-3 bg-accent rounded-lg">
                  <div className="text-sm text-muted-foreground">Superficie</div>
                  <div className="font-medium">{court.surface}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Servicios e instalaciones</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {court.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <amenity.icon className="h-5 w-5 text-primary" />
                      <span className="text-sm">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold mb-4">Reglas de la cancha</h3>
              <ul className="space-y-2">
                {court.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Reseñas ({reviews.length})</h3>
                <button className="text-primary hover:underline text-sm">
                  Escribir reseña
                </button>
              </div>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-border last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-medium">{review.userName}</div>
                        <div className="text-sm text-muted-foreground">{review.date}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-border sticky top-24">
              <h3 className="font-bold mb-4">Reservar ahora</h3>

              <div className="mb-4">
                <label className="block text-sm mb-2">Selecciona una fecha</label>
                <div className="p-3 bg-accent rounded-lg">
                  <Calendar className="h-5 w-5 text-primary inline mr-2" />
                  <span className="font-medium">
                    {selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2">Horarios disponibles</label>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {court.availableSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        selectedTime === slot.time
                          ? 'bg-primary text-primary-foreground border-primary'
                          : slot.available
                          ? 'border-border hover:border-primary/50'
                          : 'bg-muted text-muted-foreground border-border cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              {selectedTime && (
                <div className="mb-6 p-4 bg-accent rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Resumen de reserva</div>
                  <div className="font-medium mb-2">
                    {selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} - {selectedTime}
                  </div>
                  <div className="text-xl font-bold text-primary">${court.price}</div>
                </div>
              )}

              <Link
                to={`/book/${court.id}`}
                className={`block w-full py-3 rounded-lg text-center font-medium ${
                  selectedTime
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed pointer-events-none'
                }`}
              >
                Continuar con la reserva
              </Link>

              <p className="text-xs text-muted-foreground text-center mt-3">
                Pago seguro • Confirmación instantánea
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
