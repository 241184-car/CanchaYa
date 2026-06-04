import { Link } from "react-router";
import { Trophy, LayoutDashboard, Calendar as CalendarIcon, Users, Settings, Tag, LogOut } from "lucide-react";

export default function AdminCalendar() {
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
            <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Users className="h-5 w-5" />
              Usuarios
            </Link>
            <Link to="/admin/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              Reportes
            </Link>
            <Link to="/admin/calendar" className="flex items-center gap-3 px-4 py-3 bg-primary rounded-lg">
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
          <h1 className="text-2xl font-bold">Calendario General</h1>
          <p className="text-muted-foreground">Vista general de todas las reservas</p>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl p-8 border border-border text-center">
            <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-bold mb-2">Vista de Calendario</h3>
            <p className="text-muted-foreground">
              Calendario interactivo con todas las reservas del sistema
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
