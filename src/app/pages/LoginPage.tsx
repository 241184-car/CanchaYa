import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trophy, Mail, Lock, AlertCircle } from "lucide-react";
import { userStore, User } from "../utils/userStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";

// Datos simulados para pruebas
const MOCK_USERS = {
  customer: {
    email: "customer@example.com",
    password: "customer123",
    name: "Juan García",
    phone: "+34 912 345 678",
    role: "customer" as const,
  },
  owner: {
    email: "owner@example.com",
    password: "owner123",
    name: "María López",
    phone: "+34 987 654 321",
    role: "owner" as const,
  },
  admin: {
    email: "admin@example.com",
    password: "admin123",
    name: "Carlos Admin",
    phone: "+34 555 123 456",
    role: "admin" as const,
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validaciones
      if (!email.trim()) {
        setError("Por favor ingresa tu email");
        setIsLoading(false);
        return;
      }

      if (!validateEmail(email)) {
        setError("Por favor ingresa un email válido");
        setIsLoading(false);
        return;
      }

      if (!password.trim()) {
        setError("Por favor ingresa tu contraseña");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        setIsLoading(false);
        return;
      }

      // Simulación de autenticación (buscar en MOCK_USERS)
      let authenticatedUser: User | null = null;

      for (const mockUser of Object.values(MOCK_USERS)) {
        if (mockUser.email === email && mockUser.password === password) {
          authenticatedUser = {
            name: mockUser.name,
            email: mockUser.email,
            phone: mockUser.phone,
            role: mockUser.role,
          };
          break;
        }
      }

      if (!authenticatedUser) {
        setError("Email o contraseña incorrectos. Intenta con los datos de prueba.");
        setIsLoading(false);
        return;
      }

      // Guardar usuario en store
      userStore.setUser(authenticatedUser);

      // Esperar un poco para simular latencia de red
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirigir según el rol
      switch (authenticatedUser.role) {
        case "customer":
          navigate("/dashboard");
          break;
        case "owner":
          navigate("/courts");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError("Ocurrió un error durante el login. Intenta de nuevo.");
      console.error("Error en login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sistema de Reservas</h1>
          <p className="text-blue-100">Inicia sesión para continuar</p>
        </div>

        {/* Tarjeta de Login */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-6">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-semibold">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Mensaje de Error */}
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {/* Botón Login */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-gray-500 text-sm">O prueba con</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Botones de Prueba Rápida */}
          <div className="space-y-2">
            <p className="text-xs text-gray-600 text-center font-semibold">
              Credenciales de prueba:
            </p>
            <button
              type="button"
              onClick={() => {
                setEmail(MOCK_USERS.customer.email);
                setPassword(MOCK_USERS.customer.password);
              }}
              className="w-full text-sm px-3 py-2 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition"
              disabled={isLoading}
            >
              Cliente: {MOCK_USERS.customer.email}
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail(MOCK_USERS.owner.email);
                setPassword(MOCK_USERS.owner.password);
              }}
              className="w-full text-sm px-3 py-2 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition"
              disabled={isLoading}
            >
              Dueño: {MOCK_USERS.owner.email}
            </button>
            <button
              type="button"
              onClick={() => {
                setEmail(MOCK_USERS.admin.email);
                setPassword(MOCK_USERS.admin.password);
              }}
              className="w-full text-sm px-3 py-2 border-2 border-red-200 rounded-lg hover:bg-red-50 transition"
              disabled={isLoading}
            >
              Admin: {MOCK_USERS.admin.email}
            </button>
          </div>
        </div>

        {/* Link a Register */}
        <div className="text-center text-blue-100">
          <p>
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-white font-semibold hover:underline">
              Regístrate aquí
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/forgot-password" className="text-blue-200 hover:text-white hover:underline text-sm">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}