import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Bell, User, LogOut, Calendar, Clock, MapPin, Filter, Download, X } from "lucide-react";

export default function MyBookings() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      courtName: "Cancha de Fútbol Premium",
      sport: "Fútbol",
      date: "2026-05-28",
      time: "18:00 - 19:30",
      location: "Centro Deportivo Norte",
      status: "confirmed",
      price: 50,
      bookingNumber: "BK-2026-001"
    },
    {
      id: 2,
      courtName: "Cancha de Tenis #2",
      sport: "Tenis",
      date: "2026-05-30",
      time: "10:00 - 11:00",
      location: "Club Las Palmas",
      status: "confirmed",
      price: 35,
      bookingNumber: "BK-2026-002"
    },
    {
      id: 3,
      courtName: "Cancha de Básquet Indoor",
      sport: "Básquet",
      date: "2026-05-22",
      time: "16:00 - 17:00",
      location: "Polideportivo Sur",
      status: "completed",
      price: 45,
      bookingNumber: "BK-2026-003"
    },
    {
      id: 4,
      courtName: "Cancha de Pádel Elite",
      sport: "Pádel",
      date: "2026-05-15",
      time: "14:00 - 15:00",
      location: "Club Deportivo Este",
      status: "cancelled",
      price: 40,
      bookingNumber: "BK-2026-004"
    }
  ]);

  // Handlers para botones
  const handleDownloadVoucher = (booking: any) => {
    const voucherContent = `
COMPROBANTE DE RESERVA
${'='.repeat(50)}
Reserva #: ${booking.bookingNumber}
Cancha: ${booking.courtName}
Deporte: ${booking.sport}
Fecha: ${booking.date}
Hora: ${booking.time}
Ubicación: ${booking.location}
Monto: $${booking.price}
Estado: Confirmada
${'='.repeat(50)}
Fecha de descarga: ${new Date().toLocaleDateString('es-ES')}
    `;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(voucherContent));
    element.setAttribute('download', `comprobante_${booking.bookingNumber}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert('✅ Comprobante descargado: ' + `comprobante_${booking.bookingNumber}.txt`);
  };

  const handleCancelBooking = (id: number) => {
    if (confirm('¿Seguro que deseas cancelar esta reserva?')) {
      setBookings(bookings.map(b => 
        b.id === id ? { ...b, status: 'cancelled' } : b
      ));
      alert('✅ Reserva cancelada exitosamente');
    }
  };

  const handleBookAgain = (booking: any) => {
    alert('📅 Abriendo formulario de nueva reserva para: ' + booking.courtName);
  };

  const handleLeaveReview = (booking: any) => {
    alert('⭐ Abriendo formulario de reseña para: ' + booking.courtName);
  };

  const handleViewDetails = (booking: any) => {
    alert('📋 Detalles de reserva #' + booking.bookingNumber);
  };

  const bookingsData = [
    {
      id: 1,
      courtName: "Cancha de Fútbol Premium",
      sport: "Fútbol",
      date: "2026-05-28",
      time: "18:00 - 19:30",
      location: "Centro Deportivo Norte",
      status: "confirmed",
      price: 50,
      bookingNumber: "BK-2026-001"
    },
    {
      id: 2,
      courtName: "Cancha de Tenis #2",
      sport: "Tenis",
      date: "2026-05-30",
      time: "10:00 - 11:00",
      location: "Club Las Palmas",
      status: "confirmed",
      price: 35,
      bookingNumber: "BK-2026-002"
    },
    {
      id: 3,
      courtName: "Cancha de Básquet Indoor",
      sport: "Básquet",
      date: "2026-05-22",
      time: "16:00 - 17:00",
      location: "Polideportivo Sur",
      status: "completed",
      price: 45,
      bookingNumber: "BK-2026-003"
    },
    {
      id: 4,
      courtName: "Cancha de Pádel Elite",
      sport: "Pádel",
      date: "2026-05-15",
      time: "14:00 - 15:00",
      location: "Club Deportivo Este",
      status: "cancelled",
      price: 40,
      bookingNumber: "BK-2026-004"
    }
  ];

  const filteredBookings = bookingsData.filter(booking => {
    if (filterStatus === "all") return true;
    return booking.status === filterStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      confirmed: "bg-green-100 text-green-700",
      completed: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700"
    };
    const labels = {
      confirmed: "Confirmada",
      completed: "Completada",
      cancelled: "Cancelada"
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
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
              <Link to="/courts" className="text-foreground/80 hover:text-foreground">Canchas</Link>
              <Link to="/my-bookings" className="text-primary font-medium">Mis Reservas</Link>
              <Link to="/map" className="text-foreground/80 hover:text-foreground">Mapa</Link>
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
                  <Link 
                    to="/" 
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-accent text-destructive"
                  >
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mis Reservas</h1>
          <p className="text-muted-foreground">Gestiona todas tus reservas de canchas</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filterStatus === "all"
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Todas ({bookings.length})
                </button>
                <button
                  onClick={() => setFilterStatus("confirmed")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filterStatus === "confirmed"
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Activas ({bookings.filter(b => b.status === "confirmed").length})
                </button>
                <button
                  onClick={() => setFilterStatus("completed")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    filterStatus === "completed"
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
                >
                  Historial ({bookings.filter(b => b.status === "completed").length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">{booking.courtName}</h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {booking.sport} • {booking.bookingNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${booking.price}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(booking.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {booking.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {booking.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {booking.status === "confirmed" && (
                    <>
                      <button onClick={() => handleViewDetails(booking)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm">
                        Ver detalles
                      </button>
                      <button onClick={() => handleDownloadVoucher(booking)} className="px-4 py-2 border border-border rounded-lg hover:bg-accent text-sm flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Descargar comprobante
                      </button>
                      <button onClick={() => handleCancelBooking(booking.id)} className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 text-sm flex items-center gap-2">
                        <X className="h-4 w-4" />
                        Cancelar reserva
                      </button>
                    </>
                  )}
                  {booking.status === "completed" && (
                    <>
                      <button onClick={() => handleBookAgain(booking)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm">
                        Reservar de nuevo
                      </button>
                      <button onClick={() => handleLeaveReview(booking)} className="px-4 py-2 border border-border rounded-lg hover:bg-accent text-sm">
                        Dejar reseña
                      </button>
                      <button onClick={() => handleDownloadVoucher(booking)} className="px-4 py-2 border border-border rounded-lg hover:bg-accent text-sm flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Descargar recibo
                      </button>
                    </>
                  )}
                  {booking.status === "cancelled" && (
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm">
                      Ver cancha
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 border border-border text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-bold mb-2">No hay reservas en esta categoría</h3>
            <p className="text-muted-foreground mb-6">
              Prueba con otro filtro o explora canchas disponibles
            </p>
            <Link to="/courts" className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Explorar canchas
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
