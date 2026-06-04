import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, Mail, Lock, Shield } from "lucide-react";
import { userStore } from "../../utils/userStore";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Guardar sesión de admin
    userStore.setUser({
      name: "Administrador",
      email: email,
      role: "admin"
    });
    window.location.href = "/admin/dashboard";
  };

  const handleBackHome = () => {
    // Limpiar sesión antes de ir al inicio
    userStore.clearUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Administrador</h1>
          <p className="text-gray-300">Ingresa con tus credenciales de admin</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sportbook.com"
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
            >
              Iniciar sesión como administrador
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={handleBackHome} className="text-sm text-muted-foreground hover:text-foreground">
              ← Volver al sitio principal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
