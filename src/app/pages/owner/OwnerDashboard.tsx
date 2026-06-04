import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  AlertCircle,
  ChevronRight,
  Settings,
  LogOut,
  Plus,
  Bell,
} from "lucide-react";
import { userStore } from "../../utils/userStore";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

interface StatCard {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: string;
}

export default function OwnerDashboard() {
  const user = userStore.getUser();
  const firstName = userStore.getFirstName();

  // Función para mapear colores a clases de Tailwind
  const getStatColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
    };
    return colorMap[color] || { bg: "bg-gray-100", text: "text-gray-600" };
  };

  // Estadísticas simuladas
  const stats: StatCard[] = [
    {
      title: "Ingresos Totales",
      value: "$12,450",
      change: "+12% esta semana",
      icon: <DollarSign className="w-6 h-6" />,
      color: "blue",
    },
    {
      title: "Reservas Activas",
      value: 24,
      change: "+5 nuevas hoy",
      icon: <Calendar className="w-6 h-6" />,
      color: "green",
    },
    {
      title: "Canchas Activas",
      value: 6,
      change: "Todas operativas",
      icon: <Trophy className="w-6 h-6" />,
      color: "orange",
    },
    {
      title: "Clientes Totales",
      value: 342,
      change: "+28 nuevos",
      icon: <Users className="w-6 h-6" />,
      color: "purple",
    },
  ];

  // Datos de ingresos semanales
  const weeklyData = [
    { day: "Lunes", amount: 1800 },
    { day: "Martes", amount: 2100 },
    { day: "Miércoles", amount: 1950 },
    { day: "Jueves", amount: 2300 },
    { day: "Viernes", amount: 2800 },
    { day: "Sábado", amount: 2200 },
    { day: "Domingo", amount: 1300 },
  ];

  const maxAmount = Math.max(...weeklyData.map((d) => d.amount));

  // Canchas recientes
  const recentCourts = [
    {
      id: 1,
      name: "Cancha de Fútbol Premium",
      location: "Centro Deportivo Norte",
      reservations: 8,
      revenue: "$480",
      status: "active",
    },
    {
      id: 2,
      name: "Cancha de Tenis #2",
      location: "Club Las Palmas",
      reservations: 6,
      revenue: "$210",
      status: "active",
    },
    {
      id: 3,
      name: "Cancha de Básquet Indoor",
      location: "Polideportivo Sur",
      reservations: 5,
      revenue: "$225",
      status: "active",
    },
  ];

  // Próximas reservas
  const upcomingBookings = [
    { id: 1, court: "Fútbol Premium", time: "18:00 - 19:00", customer: "Juan García" },
    { id: 2, court: "Tenis #2", time: "14:30 - 15:30", customer: "María López" },
    { id: 3, court: "Básquet Indoor", time: "20:00 - 21:00", customer: "Carlos Rodríguez" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-orange-600" />
              <span className="font-bold text-xl">SportBook Owner</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            ¡Bienvenido, {firstName}! 👋
          </h1>
          <p className="text-gray-600">
            Aquí está el resumen de tu negocio de canchas deportivas
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 bg-white border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-green-600 font-medium">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${getStatColorClasses(stat.color).bg} ${getStatColorClasses(stat.color).text}`}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Revenue Chart */}
          <Card className="lg:col-span-2 p-6 bg-white border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Ingresos Esta Semana
              </h2>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex items-end gap-2 h-48">
              {weeklyData.map((data) => (
                <div key={data.day} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition hover:from-blue-600 hover:to-blue-500 mb-2"
                    style={{ height: `${(data.amount / maxAmount) * 100}%` }}
                    title={`$${data.amount}`}
                  ></div>
                  <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                    {data.day.slice(0, 3)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Total semana: <span className="font-bold text-gray-900">
                  ${weeklyData.reduce((a, b) => a + b.amount, 0).toLocaleString()}
                </span>
              </p>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-white border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Acciones Rápidas
            </h2>
            <div className="space-y-3">
              <Link
                to="/courts"
                className="flex items-center gap-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 font-medium transition"
              >
                <Plus className="w-5 h-5" />
                Nueva Cancha
              </Link>
              <Link
                to="/courts"
                className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition"
              >
                <Trophy className="w-5 h-5" />
                Gestionar Canchas
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition"
              >
                <Settings className="w-5 h-5" />
                Configuración
              </Link>
            </div>
          </Card>
        </div>

        {/* Recent Courts */}
        <Card className="mt-8 p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Tus Canchas Destacadas
            </h2>
            <Link
              to="/courts"
              className="flex items-center gap-1 text-orange-600 hover:text-orange-700 font-medium"
            >
              Ver todas
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentCourts.map((court) => (
              <div
                key={court.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {court.name}
                  </h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                    Activa
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">{court.location}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Reservas hoy</p>
                    <p className="text-lg font-bold text-gray-900">
                      {court.reservations}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Ingresos hoy</p>
                    <p className="text-lg font-bold text-green-600">
                      {court.revenue}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Bookings */}
        <Card className="mt-8 p-6 bg-white border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Próximas Reservas
            </h2>
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
              >
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {booking.court}
                  </p>
                  <p className="text-xs text-gray-600">
                    Cliente: {booking.customer}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">
                    {booking.time}
                  </p>
                  <p className="text-xs text-gray-600">Hoy</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 