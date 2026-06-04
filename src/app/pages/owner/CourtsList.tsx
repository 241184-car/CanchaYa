import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  Plus,
  Edit,
  Trash2,
  Bell,
  LogOut,
  Search,
  Filter,
  Power,
  Eye,
  MapPin,
  DollarSign,
} from "lucide-react";
import { userStore } from "../../utils/userStore";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

interface Court {
  id: number;
  name: string;
  sport: string;
  location: string;
  price: number;
  amenities: string[];
  reservations: number;
  active: boolean;
  image?: string;
  description?: string;
}

interface FormData {
  name: string;
  sport: string;
  location: string;
  price: string;
  amenities: string;
  description: string;
}

export default function CourtsList() {
  const [courts, setCourts] = useState<Court[]>([
    {
      id: 1,
      name: "Cancha de Fútbol Premium",
      sport: "Fútbol",
      location: "Centro Deportivo Norte",
      price: 50,
      amenities: ["Iluminación", "Vestuarios", "Estacionamiento"],
      reservations: 8,
      active: true,
      description: "Cancha de fútbol profesional con muy buena iluminación",
    },
    {
      id: 2,
      name: "Cancha de Tenis #2",
      sport: "Tenis",
      location: "Club Las Palmas",
      price: 35,
      amenities: ["Superficie profesional", "Iluminación LED", "Agua"],
      reservations: 6,
      active: true,
      description: "Cancha de tenis con superficie profesional",
    },
    {
      id: 3,
      name: "Cancha de Básquet Indoor",
      sport: "Básquet",
      location: "Polideportivo Sur",
      price: 45,
      amenities: ["Techada", "Aire acondicionado", "Marcador electrónico"],
      reservations: 5,
      active: true,
      description: "Cancha de básquet techada con aire acondicionado",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSport, setFilterSport] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    sport: "Fútbol",
    location: "",
    price: "",
    amenities: "",
    description: "",
  });

  const sports = [
    "Fútbol",
    "Tenis",
    "Básquet",
    "Pádel",
    "Vóley",
    "Badminton",
  ];

  // Filtrar canchas
  const filteredCourts = courts.filter((court) => {
    const matchesSearch =
      court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      court.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = filterSport === "all" || court.sport === filterSport;
    return matchesSearch && matchesSport;
  });

  // Abrir modal para crear
  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      name: "",
      sport: "Fútbol",
      location: "",
      price: "",
      amenities: "",
      description: "",
    });
    setShowModal(true);
  };

  // Abrir modal para editar
  const openEditModal = (court: Court) => {
    setEditingId(court.id);
    setFormData({
      name: court.name,
      sport: court.sport,
      location: court.location,
      price: court.price.toString(),
      amenities: court.amenities.join(", "),
      description: court.description || "",
    });
    setShowModal(true);
  };

  // Guardar (crear o actualizar)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.location ||
      !formData.price ||
      !formData.amenities
    ) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    const amenitiesArray = formData.amenities
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a);

    if (editingId) {
      // Actualizar
      setCourts(
        courts.map((court) =>
          court.id === editingId
            ? {
                ...court,
                name: formData.name,
                sport: formData.sport,
                location: formData.location,
                price: Number(formData.price),
                amenities: amenitiesArray,
                description: formData.description,
              }
            : court
        )
      );
    } else {
      // Crear
      const newCourt: Court = {
        id: Math.max(...courts.map((c) => c.id), 0) + 1,
        name: formData.name,
        sport: formData.sport,
        location: formData.location,
        price: Number(formData.price),
        amenities: amenitiesArray,
        reservations: 0,
        active: true,
        description: formData.description,
      };
      setCourts([...courts, newCourt]);
    }

    setShowModal(false);
  };

  // Eliminar cancha
  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta cancha?")) {
      setCourts(courts.filter((court) => court.id !== id));
    }
  };

  // Activar/Desactivar
  const toggleActive = (id: number) => {
    setCourts(
      courts.map((court) =>
        court.id === id ? { ...court, active: !court.active } : court
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-orange-600" />
              <span className="font-bold text-xl">SportBook Owner</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={() => userStore.logout()}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestionar Canchas
            </h1>
            <p className="text-gray-600 mt-1">
              Tienes {courts.length} cancha{courts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Button
            onClick={openCreateModal}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Nueva Cancha
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="p-4 bg-white border border-gray-200 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Buscar
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Deporte
              </Label>
              <select
                value={filterSport}
                onChange={(e) => setFilterSport(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Todos los deportes</option>
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Courts Grid */}
        {filteredCourts.length === 0 ? (
          <Card className="p-12 bg-white border border-gray-200 text-center">
            <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No hay canchas
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterSport !== "all"
                ? "No se encontraron canchas con los criterios de búsqueda"
                : "Crea tu primera cancha para comenzar"}
            </p>
            {!searchTerm && filterSport === "all" && (
              <Button
                onClick={openCreateModal}
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 px-6 rounded-lg inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Crear Primera Cancha
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts.map((court) => (
              <Card
                key={court.id}
                className={`border ${
                  court.active ? "border-gray-200" : "border-red-200 opacity-75"
                } overflow-hidden hover:shadow-lg transition`}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {court.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {court.sport}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        court.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {court.active ? "Activa" : "Inactiva"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {court.location}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Precio por hora</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ${court.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Reservas</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {court.reservations}
                      </p>
                    </div>
                  </div>

                  {court.description && (
                    <p className="text-sm text-gray-600">
                      {court.description}
                    </p>
                  )}

                  {court.amenities.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">
                        Servicios
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {court.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-2">
                  <Button
                    onClick={() => openEditModal(court)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button
                    onClick={() => toggleActive(court.id)}
                    className="flex-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Power className="w-4 h-4" />
                    {court.active ? "Desactivar" : "Activar"}
                  </Button>
                  <Button
                    onClick={() => handleDelete(court.id)}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? "Editar Cancha" : "Nueva Cancha"}
              </h2>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Nombre */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">
                  Nombre de la Cancha *
                </Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Ej: Cancha de Fútbol Premium"
                  className="w-full"
                />
              </div>

              {/* Deporte */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">
                  Deporte *
                </Label>
                <select
                  value={formData.sport}
                  onChange={(e) =>
                    setFormData({ ...formData, sport: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {sports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ubicación */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">
                  Ubicación *
                </Label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Ej: Centro Deportivo Norte"
                  className="w-full"
                />
              </div>

              {/* Precio */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">
                  Precio por Hora ($) *
                </Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="Ej: 50"
                  className="w-full"
                />
              </div>

              {/* Servicios */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">
                  Servicios (separados por comas) *
                </Label>
                <textarea
                  value={formData.amenities}
                  onChange={(e) =>
                    setFormData({ ...formData, amenities: e.target.value })
                  }
                  placeholder="Ej: Iluminación, Vestuarios, Estacionamiento"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  rows={2}
                />
              </div>

              {/* Descripción */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-1 block">
                  Descripción
                </Label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe detalles especiales de tu cancha..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  rows={2}
                />
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2.5 rounded-lg"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg"
                >
                  {editingId ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

