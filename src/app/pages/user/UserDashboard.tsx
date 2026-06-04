import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Trophy, Bell, User, LogOut, CreditCard } from "lucide-react";
import { userStore } from "../../utils/userStore";

export default function UserDashboard() {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const userName = userStore.getFirstName();
  const fullName = userStore.getUserName();
  const initials = fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const upcomingBookings = [
    {
      id: 1,
      courtName: "Cancha de Fútbol Premium",
      sport: "Fútbol",
      date: "2026-05-28",
      time: "18:00 - 19:30",
      location: "Centro Deportivo Norte",
      status: "confirmed"
    },
    {
      id: 2,
      courtName: "Cancha de Tenis #2",
      sport: "Tenis",
      date: "2026-05-30",
      time: "10:00 - 11:00",
      location: "Club Las Palmas",
      status: "confirmed"
    }
  ];

  const quickStats = [
    { label: "Reservas activas", value: "2", icon: Calendar, color: "text-primary" },
    { label: "Partidos jugados", value: "24", icon: Trophy, color: "text-secondary" },
    { label: "Canchas favoritas", value: "5", icon: MapPin, color: "text-primary" }
  ];

  const handleViewDetails = (booking: any) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleCancelBooking = (bookingId: number) => {
    if (confirm("¿Estás seguro de que deseas cancelar esta reserva?")) {
      alert("Reserva cancelada exitosamente");
    }
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
              <Link to="/dashboard" className="text-primary font-medium">Dashboard</Link>
              <Link to="/courts" className="text-foreground/80 hover:text-foreground">Canchas</Link>
              <Link to="/my-bookings" className="text-foreground/80 hover:text-foreground">Mis Reservas</Link>
              <Link to="/map" className="text-foreground/80 hover:text-foreground">Mapa</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/notifications" className="p-2 hover:bg-accent rounded-lg relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
              </Link>
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg"
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {initials}
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
                      userStore.logout();
                    }} 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-accent text-destructive w-full text-left"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">¡Hola, {userName}! 👋</h1>
          <p className="text-muted-foreground">Aquí está el resumen de tu actividad deportiva</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <span className="text-3xl font-bold">{stat.value}</span>
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 border border-border mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Próximas Reservas</h2>
                <Link to="/my-bookings" className="text-primary hover:underline text-sm">
                  Ver todas
                </Link>
              </div>

              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold mb-1">{booking.courtName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.sport}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Confirmada
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(booking.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {booking.time}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground col-span-2">
                          <MapPin className="h-4 w-4" />
                          {booking.location}
                        </div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button 
                          onClick={() => handleViewDetails(booking)}
                          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm"
                        >
                          Ver detalles
                        </button>
                        <button 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-4 py-2 border border-border rounded-lg hover:bg-accent text-sm"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No tienes reservas próximas</p>
                  <Link to="/courts" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                    Explorar canchas
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-2">¿Listo para tu próximo partido?</h3>
              <p className="mb-4 opacity-90">Descubre las mejores canchas cerca de ti</p>
              <Link to="/courts" className="inline-block px-6 py-2 bg-white text-primary rounded-lg hover:bg-gray-100">
                Buscar canchas
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold mb-4">Accesos Rápidos</h3>
              <div className="space-y-2">
                <Link to="/courts" className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Explorar canchas</p>
                    <p className="text-xs text-muted-foreground">Encuentra tu cancha ideal</p>
                  </div>
                </Link>
                <Link to="/my-bookings" className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Mis reservas</p>
                    <p className="text-xs text-muted-foreground">Ver historial completo</p>
                  </div>
                </Link>
                <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Mi perfil</p>
                    <p className="text-xs text-muted-foreground">Configuración de cuenta</p>
                  </div>
                </Link>
                <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Métodos de pago</p>
                    <p className="text-xs text-muted-foreground">Gestionar tarjetas</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold mb-4">Promociones Activas</h3>
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">15% OFF</p>
                  <p className="text-xs text-orange-700">En reservas de fin de semana</p>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-900">2x1</p>
                  <p className="text-xs text-blue-700">Martes y jueves antes de 12pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showDetailsModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Detalles de la Reserva</h2>
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedBooking(null);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cancha</p>
                  <p className="font-semibold text-lg">{selectedBooking.courtName}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Deporte</p>
                  <p className="font-semibold">{selectedBooking.sport}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha</p>
                    <p className="font-semibold">
                      {new Date(selectedBooking.date).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hora</p>
                    <p className="font-semibold">{selectedBooking.time}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-semibold">{selectedBooking.location}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mt-1">
                    {selectedBooking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    setSelectedBooking(null);
                  }}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
