import { Link } from "react-router";
import { Trophy, LayoutDashboard, Calendar as CalendarIcon, Users, Settings, Tag, LogOut, Save } from "lucide-react";

export default function AdminSettings() {
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
            <Link to="/admin/calendar" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              Calendario
            </Link>
            <Link to="/admin/promotions" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Tag className="h-5 w-5" />
              Promociones
            </Link>
            <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 bg-primary rounded-lg">
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
          <h1 className="text-2xl font-bold">Configuración del Sistema</h1>
          <p className="text-muted-foreground">Ajustes generales de la plataforma</p>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl p-6 border border-border space-y-6">
            <div>
              <h3 className="font-bold mb-4">Información General</h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Nombre del negocio</label>
                  <input
                    type="text"
                    defaultValue="SportBook"
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block mb-2">Correo de contacto</label>
                  <input
                    type="email"
                    defaultValue="contacto@sportbook.com"
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block mb-2">Teléfono</label>
                  <input
                    type="tel"
                    defaultValue="+1 800 123 4567"
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="font-bold mb-4">Horarios de operación</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Lunes a Viernes</span>
                  <div className="flex gap-2">
                    <input type="time" defaultValue="06:00" className="px-3 py-1 border border-border rounded" />
                    <span>-</span>
                    <input type="time" defaultValue="23:00" className="px-3 py-1 border border-border rounded" />
                  </div>
                </label>
                <label className="flex items-center justify-between">
                  <span>Sábado y Domingo</span>
                  <div className="flex gap-2">
                    <input type="time" defaultValue="07:00" className="px-3 py-1 border border-border rounded" />
                    <span>-</span>
                    <input type="time" defaultValue="22:00" className="px-3 py-1 border border-border rounded" />
                  </div>
                </label>
              </div>
            </div>

            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
              <Save className="h-5 w-5" />
              Guardar cambios
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
