import React from "react";
import { Link } from "react-router-dom";
import { Trophy, LayoutDashboard, Calendar as CalendarIcon, Users, Settings, Tag, LogOut, TrendingUp, DollarSign, Activity } from "lucide-react";
import { userStore } from "../../utils/userStore";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const handleLogout = () => {
    userStore.logout();
  };
  const stats = [
    { label: "Ingresos del mes", value: "$12,450", change: "+12%", icon: DollarSign, color: "text-green-600", bg: "bg-green-100" },
    { label: "Total reservas", value: "324", change: "+8%", icon: CalendarIcon, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Usuarios activos", value: "1,247", change: "+23%", icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "Tasa ocupación", value: "78%", change: "+5%", icon: Activity, color: "text-orange-600", bg: "bg-orange-100" }
  ];

  const monthlyRevenue = [
    { month: "Ene", revenue: 8500 },
    { month: "Feb", revenue: 9200 },
    { month: "Mar", revenue: 10800 },
    { month: "Abr", revenue: 11500 },
    { month: "May", revenue: 12450 }
  ];

  const bookingsByDay = [
    { day: "Lun", bookings: 45 },
    { day: "Mar", bookings: 52 },
    { day: "Mié", bookings: 61 },
    { day: "Jue", bookings: 58 },
    { day: "Vie", bookings: 70 },
    { day: "Sáb", bookings: 85 },
    { day: "Dom", bookings: 78 }
  ];

  const sportDistribution = [
    { name: "Fútbol", value: 45, color: "#2563eb" },
    { name: "Tenis", value: 25, color: "#f97316" },
    { name: "Básquet", value: 20, color: "#10b981" },
    { name: "Otros", value: 10, color: "#8b5cf6" }
  ];

  const recentBookings = [
    { id: 1, user: "Carlos Méndez", court: "Cancha Fútbol Premium", time: "18:00 - 19:30", status: "confirmed" },
    { id: 2, user: "María Torres", court: "Cancha Tenis #2", time: "10:00 - 11:00", status: "confirmed" },
    { id: 3, user: "Luis Ramírez", court: "Cancha Básquet Indoor", time: "16:00 - 17:00", status: "pending" },
    { id: 4, user: "Ana García", court: "Cancha Pádel Elite", time: "14:00 - 15:00", status: "confirmed" }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl">SportBook</span>
          </div>
          <p className="text-sm text-gray-400">Panel Admin</p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary rounded-lg">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/admin/courts" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Trophy className="h-5 w-5" />
              Canchas
            </Link>
            <Link to="/admin/bookings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              Reservas
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Users className="h-5 w-5" />
              Usuarios
            </Link>
            <Link to="/admin/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <TrendingUp className="h-5 w-5" />
              Reportes
            </Link>
            <Link to="/admin/calendar" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              Calendario
            </Link>
            <Link to="/admin/promotions" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Tag className="h-5 w-5" />
              Promociones
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Settings className="h-5 w-5" />
              Configuración
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg text-red-400">
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="bg-white border-b border-border p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Resumen general del sistema</p>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold mb-4">Ingresos Mensuales</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold mb-4">Reservas por Día</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={bookingsByDay}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold mb-4">Distribución por Deporte</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={sportDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sportDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {sportDistribution.map((sport, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sport.color }} />
                      <span>{sport.name}</span>
                    </div>
                    <span className="font-medium">{sport.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-border">
              <h3 className="font-bold mb-4">Reservas Recientes</h3>
              <div className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <p className="font-medium">{booking.user}</p>
                      <p className="text-sm text-muted-foreground">{booking.court} • {booking.time}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {booking.status === "confirmed" ? "Confirmada" : "Pendiente"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
