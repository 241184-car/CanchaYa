
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, LayoutDashboard, Calendar as CalendarIcon, Users, Settings, Tag, LogOut, Search, Filter } from "lucide-react";
import { userStore } from "../../utils/userStore";

export default function AdminBookings() {
  const [filterStatus, setFilterStatus] = useState("all");

  const bookings = [
    { id: 1, user: "Carlos Méndez", court: "Cancha Fútbol Premium", date: "2026-05-28", time: "18:00", status: "confirmed", price: 50 },
    { id: 2, user: "María Torres", court: "Cancha Tenis #2", date: "2026-05-30", time: "10:00", status: "confirmed", price: 35 },
    { id: 3, user: "Luis Ramírez", court: "Cancha Básquet Indoor", date: "2026-05-27", time: "16:00", status: "pending", price: 45 },
    { id: 4, user: "Ana García", court: "Cancha Pádel Elite", date: "2026-05-29", time: "14:00", status: "confirmed", price: 40 },
    { id: 5, user: "Pedro López", court: "Cancha Vóley Playa", date: "2026-05-26", time: "11:00", status: "cancelled", price: 30 },
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
            <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/admin/courts" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Trophy className="h-5 w-5" />
              Canchas
            </Link>
            <Link to="/admin/bookings" className="flex items-center gap-3 px-4 py-3 bg-primary rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              Reservas
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Users className="h-5 w-5" />
              Usuarios
            </Link>
            <Link to="/admin/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
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
          <Link to="/admin/login" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg text-red-400">
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="bg-white border-b border-border p-6">
          <h1 className="text-2xl font-bold">Gestión de Reservas</h1>
          <p className="text-muted-foreground">Administra todas las reservas del sistema</p>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl p-6 border border-border mb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por usuario o cancha..."
                  className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <select className="px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="all">Todos los estados</option>
                  <option value="confirmed">Confirmadas</option>
                  <option value="pending">Pendientes</option>
                  <option value="cancelled">Canceladas</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Usuario</th>
                  <th className="text-left p-4">Cancha</th>
                  <th className="text-left p-4">Fecha</th>
                  <th className="text-left p-4">Hora</th>
                  <th className="text-left p-4">Monto</th>
                  <th className="text-left p-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-border hover:bg-accent">
                    <td className="p-4">#{booking.id.toString().padStart(4, '0')}</td>
                    <td className="p-4 font-medium">{booking.user}</td>
                    <td className="p-4">{booking.court}</td>
                    <td className="p-4">{new Date(booking.date).toLocaleDateString('es-ES')}</td>
                    <td className="p-4">{booking.time}</td>
                    <td className="p-4">${booking.price}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "confirmed" ? "bg-green-100 text-green-700" :
                        booking.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {booking.status === "confirmed" ? "Confirmada" : booking.status === "pending" ? "Pendiente" : "Cancelada"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
