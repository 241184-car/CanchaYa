import { Trophy, LayoutDashboard, Calendar as CalendarIcon, Users, Settings, Tag, LogOut, Plus, Search, Edit, Trash2, Eye, X } from "lucide-react";
import { useState } from "react";
import { userStore } from "../../utils/userStore";

export default function AdminCourts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    price: "",
    location: ""
  });

  const [courts, setCourts] = useState([
    { id: 1, name: "Cancha de Fútbol Premium", sport: "Fútbol", status: "active", price: 50, bookings: 124, location: "Sede Norte" },
    { id: 2, name: "Cancha de Tenis #2", sport: "Tenis", status: "active", price: 35, bookings: 89, location: "Sede Centro" },
    { id: 3, name: "Cancha de Básquet Indoor", sport: "Básquet", status: "active", price: 45, bookings: 156, location: "Sede Oeste" },
    { id: 4, name: "Cancha de Pádel Elite", sport: "Pádel", status: "maintenance", price: 40, bookings: 67, location: "Sede Este" },
    { id: 5, name: "Cancha de Vóley Playa", sport: "Vóley", status: "active", price: 30, bookings: 92, location: "Sede Sur" },
    { id: 6, name: "Cancha de Fútbol 7", sport: "Fútbol", status: "inactive", price: 40, bookings: 203, location: "Sede Norte" }
  ]);

  const handleAddCourt = () => {
    if (!formData.name || !formData.sport || !formData.price || !formData.location) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (editingId) {
      setCourts(courts.map(c => c.id === editingId ? {
        ...c,
        name: formData.name,
        sport: formData.sport,
        price: parseInt(formData.price),
        location: formData.location
      } : c));
    } else {
      const newCourt = {
        id: Math.max(...courts.map(c => c.id), 0) + 1,
        name: formData.name,
        sport: formData.sport,
        price: parseInt(formData.price),
        location: formData.location,
        status: "active",
        bookings: 0
      };
      setCourts([...courts, newCourt]);
    }

    setFormData({ name: "", sport: "", price: "", location: "" });
    setEditingId(null);
    setShowModal(false);
  };

  const handleEdit = (court: any) => {
    setFormData({
      name: court.name,
      sport: court.sport,
      price: court.price.toString(),
      location: court.location
    });
    setEditingId(court.id);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta cancha?")) {
      setCourts(courts.filter(c => c.id !== id));
    }
  };

  const handleLogout = () => {
    userStore.logout();
  };

  const filteredCourts = courts.filter(court =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.sport.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <a href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </a>
            <a href="/admin/courts" className="flex items-center gap-3 px-4 py-3 bg-primary rounded-lg">
              <Trophy className="h-5 w-5" />
              Canchas
            </a>
            <a href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              Reservas
            </a>
            <a href="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Users className="h-5 w-5" />
              Usuarios
            </a>
            <a href="/admin/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              Reportes
            </a>
            <a href="/admin/calendar" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <CalendarIcon className="h-5 w-5" />
              Calendario
            </a>
            <a href="/admin/promotions" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Tag className="h-5 w-5" />
              Promociones
            </a>
            <a href="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 rounded-lg">
              <Settings className="h-5 w-5" />
              Configuración
            </a>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Gestión de Canchas</h1>
              <p className="text-muted-foreground">Administra todas las canchas del sistema</p>
            </div>
            <button onClick={() => {
              setFormData({ name: "", sport: "", price: "", location: "" });
              setEditingId(null);
              setShowModal(true);
            }} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Nueva Cancha
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl p-6 border border-border mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar canchas..."
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4">Nombre</th>
                  <th className="text-left p-4">Deporte</th>
                  <th className="text-left p-4">Ubicación</th>
                  <th className="text-left p-4">Precio/hora</th>
                  <th className="text-left p-4">Reservas</th>
                  <th className="text-left p-4">Estado</th>
                  <th className="text-right p-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredCourts.map((court) => (
                  <tr key={court.id} className="border-t border-border hover:bg-accent">
                    <td className="p-4 font-medium">{court.name}</td>
                    <td className="p-4">{court.sport}</td>
                    <td className="p-4">{court.location}</td>
                    <td className="p-4">S/ {court.price}</td>
                    <td className="p-4">{court.bookings}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        court.status === "active" ? "bg-green-100 text-green-700" :
                        court.status === "maintenance" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {court.status === "active" ? "Activa" : court.status === "maintenance" ? "Mantenimiento" : "Inactiva"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-accent rounded-lg">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleEdit(court)} className="p-2 hover:bg-accent rounded-lg">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(court.id)} className="p-2 hover:bg-destructive/10 rounded-lg text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{editingId ? "Editar Cancha" : "Nueva Cancha"}</h2>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre de la cancha</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej: Cancha Fútbol Premium"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Deporte</label>
                <select
                  value={formData.sport}
                  onChange={(e) => setFormData({...formData, sport: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selecciona un deporte</option>
                  <option value="Fútbol">Fútbol</option>
                  <option value="Tenis">Tenis</option>
                  <option value="Básquet">Básquet</option>
                  <option value="Pádel">Pádel</option>
                  <option value="Vóley">Vóley</option>
                  <option value="Bádminton">Bádminton</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ubicación</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Ej: Sede Norte"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Precio por hora (S/)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="Ej: 50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddCourt}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  {editingId ? "Actualizar" : "Crear"} Cancha
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
