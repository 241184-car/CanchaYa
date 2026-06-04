import React from "react";
import { Link } from "react-router-dom";
import { Trophy, Bell, User, LogOut, Calendar, DollarSign, Star, Trash2, Check } from "lucide-react";

export default function Notifications() {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const notifications = [
    {
      id: 1,
      type: "booking",
      icon: Calendar,
      title: "Reserva confirmada",
      message: "Tu reserva para Cancha de Fútbol Premium el 28 de mayo ha sido confirmada.",
      time: "Hace 2 horas",
      read: false
    },
    {
      id: 2,
      type: "promo",
      icon: DollarSign,
      title: "Nueva promoción disponible",
      message: "¡15% de descuento en reservas de fin de semana! Usa el código WEEKEND15",
      time: "Hace 5 horas",
      read: false
    },
    {
      id: 3,
      type: "reminder",
      icon: Bell,
      title: "Recordatorio de partido",
      message: "Tu partido en Cancha de Tenis #2 es mañana a las 10:00",
      time: "Hace 1 día",
      read: true
    },
    {
      id: 4,
      type: "review",
      icon: Star,
      title: "Deja una reseña",
      message: "¿Cómo estuvo tu experiencia en Cancha de Básquet Indoor?",
      time: "Hace 2 días",
      read: true
    },
    {
      id: 5,
      type: "booking",
      icon: Calendar,
      title: "Pago procesado",
      message: "Hemos recibido tu pago de $50 por tu reserva.",
      time: "Hace 3 días",
      read: true
    }
  ];

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
              <Link to="/my-bookings" className="text-foreground/80 hover:text-foreground">Mis Reservas</Link>
              <Link to="/map" className="text-foreground/80 hover:text-foreground">Mapa</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/notifications" className="p-2 bg-accent rounded-lg relative">
                <Bell className="h-5 w-5 text-primary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notificaciones</h1>
            <p className="text-muted-foreground">
              {notifications.filter(n => !n.read).length} notificaciones sin leer
            </p>
          </div>
          <button className="text-primary hover:underline text-sm flex items-center gap-2">
            <Check className="h-4 w-4" />
            Marcar todas como leídas
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl p-5 border border-border hover:border-primary/50 transition-colors ${
                !notification.read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  notification.type === "booking" ? "bg-blue-100" :
                  notification.type === "promo" ? "bg-orange-100" :
                  notification.type === "reminder" ? "bg-purple-100" :
                  "bg-yellow-100"
                }`}>
                  <notification.icon className={`h-6 w-6 ${
                    notification.type === "booking" ? "text-blue-600" :
                    notification.type === "promo" ? "text-orange-600" :
                    notification.type === "reminder" ? "text-purple-600" :
                    "text-yellow-600"
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                    <button className="text-destructive hover:bg-destructive/10 p-1.5 rounded">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-border text-center">
            <Bell className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-bold mb-2">No tienes notificaciones</h3>
            <p className="text-muted-foreground">
              Te avisaremos cuando haya novedades
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
