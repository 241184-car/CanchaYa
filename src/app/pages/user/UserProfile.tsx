import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Bell, User, LogOut, Mail, Phone, MapPin, CreditCard, Save, Camera } from "lucide-react";
import { userStore } from "../../utils/userStore";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const savedUser = userStore.getUser();
  const [profileData, setProfileData] = useState({
    name: savedUser?.name || "Juan Pérez",
    email: savedUser?.email || "juan@email.com",
    phone: savedUser?.phone || "+1 234 567 890",
    location: "Ciudad, País"
  });
  const initials = profileData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    userStore.setUser({
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone
    });
    alert('Perfil actualizado correctamente');
  };

  const savedCards = [
    { id: 1, last4: "4242", brand: "Visa", expiry: "12/25" },
    { id: 2, last4: "5555", brand: "Mastercard", expiry: "08/26" }
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
              <Link to="/notifications" className="p-2 hover:bg-accent rounded-lg relative">
                <Bell className="h-5 w-5" />
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
                  <button 
                    onClick={() => {
                      setShowUserMenu(false);
                      userStore.logout();
                    }} 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-accent text-destructive w-full text-left"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
          <p className="text-muted-foreground">Gestiona tu información personal y preferencias</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-3">
                    {initials}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center hover:bg-secondary/90">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="font-bold">{profileData.name}</h3>
                <p className="text-sm text-muted-foreground">{profileData.email}</p>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "profile" ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                >
                  Información personal
                </button>
                <button
                  onClick={() => setActiveTab("payments")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "payments" ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                >
                  Métodos de pago
                </button>
                <button
                  onClick={() => setActiveTab("preferences")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "preferences" ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                >
                  Preferencias
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "security" ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  }`}
                >
                  Seguridad
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-xl font-bold mb-6">Información Personal</h2>

                <form className="space-y-5">
                  <div>
                    <label className="block mb-2">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">
                      Correo electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2">
                      Ubicación
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    onClick={handleSaveProfile}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2"
                  >
                    <Save className="h-5 w-5" />
                    Guardar cambios
                  </button>
                </form>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="bg-white rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Métodos de Pago</h2>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 text-sm">
                    + Agregar tarjeta
                  </button>
                </div>

                <div className="space-y-4">
                  {savedCards.map((card) => (
                    <div key={card.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">{card.brand} •••• {card.last4}</div>
                            <div className="text-sm text-muted-foreground">Vence {card.expiry}</div>
                          </div>
                        </div>
                        <button className="text-destructive hover:underline text-sm">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-xl font-bold mb-6">Preferencias</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Notificaciones</h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span>Recordatorios de reservas</span>
                        <input type="checkbox" className="rounded border-border" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span>Promociones y ofertas</span>
                        <input type="checkbox" className="rounded border-border" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span>Novedades de SportBook</span>
                        <input type="checkbox" className="rounded border-border" />
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h3 className="font-medium mb-3">Deportes favoritos</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Fútbol", "Tenis", "Básquet", "Pádel", "Vóley"].map((sport) => (
                        <button
                          key={sport}
                          className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                        >
                          {sport}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center gap-2">
                    <Save className="h-5 w-5" />
                    Guardar preferencias
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-xl font-bold mb-6">Seguridad</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Cambiar contraseña</h3>
                    <form className="space-y-4">
                      <div>
                        <label className="block mb-2">Contraseña actual</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Nueva contraseña</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block mb-2">Confirmar nueva contraseña</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                        Actualizar contraseña
                      </button>
                    </form>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h3 className="font-medium mb-3 text-destructive">Zona de peligro</h3>
                    <button className="px-6 py-3 border border-destructive text-destructive rounded-lg hover:bg-destructive/10">
                      Eliminar cuenta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
