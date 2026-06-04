import { Link } from "react-router";
import { Trophy, LayoutDashboard, Calendar as CalendarIcon, Users, Settings, Tag, LogOut, TrendingUp, Download } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminReports() {
  const revenueData = [
    { month: "Ene", revenue: 8500, bookings: 156 },
    { month: "Feb", revenue: 9200, bookings: 172 },
    { month: "Mar", revenue: 10800, bookings: 198 },
    { month: "Abr", revenue: 11500, bookings: 215 },
    { month: "May", revenue: 12450, bookings: 235 }
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
            <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Users className="h-5 w-5" />
              Usuarios
            </Link>
            <Link to="/admin/reports" className="flex items-center gap-3 px-4 py-3 bg-primary rounded-lg">
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
              <h1 className="text-2xl font-bold">Reportes y Estadísticas</h1>
              <p className="text-muted-foreground">Análisis detallado del negocio</p>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
              <Download className="h-5 w-5" />
              Exportar PDF
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="font-bold mb-4">Ingresos Mensuales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} name="Ingresos ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 border border-border">
            <h3 className="font-bold mb-4">Reservas por Mes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#f97316" name="Reservas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
