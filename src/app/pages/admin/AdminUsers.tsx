import React from "react";
import { Link } from "react-router-dom";
import { Trophy, LayoutDashboard, Calendar as CalendarIcon, Users, Settings, Tag, LogOut, Search, UserPlus } from "lucide-react";

export default function AdminUsers() {
  const users = [
    { id: 1, name: "Carlos Méndez", email: "carlos@email.com", phone: "+1 234 567 890", bookings: 24, joined: "2025-01-15" },
    { id: 2, name: "María Torres", email: "maria@email.com", phone: "+1 234 567 891", bookings: 18, joined: "2025-02-20" },
    { id: 3, name: "Luis Ramírez", email: "luis@email.com", phone: "+1 234 567 892", bookings: 32, joined: "2024-11-10" },
    { id: 4, name: "Ana García", email: "ana@email.com", phone: "+1 234 567 893", bookings: 15, joined: "2025-03-05" },
    { id: 5, name: "Pedro López", email: "pedro@email.com", phone: "+1 234 567 894", bookings: 28, joined: "2025-01-28" },
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
            <Link to="/admin/bookings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              Reservas
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 bg-primary rounded-lg">
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
              <p className="text-muted-foreground">Administra todos los usuarios del sistema</p>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Nuevo Usuario
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl p-6 border border-border mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4">Nombre</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Teléfono</th>
                  <th className="text-left p-4">Reservas</th>
                  <th className="text-left p-4">Fecha de registro</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-border hover:bg-accent">
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.phone}</td>
                    <td className="p-4">{user.bookings}</td>
                    <td className="p-4">{new Date(user.joined).toLocaleDateString('es-ES')}</td>
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
