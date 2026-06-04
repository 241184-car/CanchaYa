import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Trophy, Mail, Lock, User, Phone, AlertCircle, CheckCircle } from "lucide-react";
import { userStore, User as UserType } from "../utils/userStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [role, setRole] = useState<"customer" | "owner" | "admin">("customer");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Acepta formatos: +34 912 345 678, 912345678, +34912345678
    const phoneRegex = /^[\d\s\-\+()]{9,}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "role") {
      setRole(value as "customer" | "owner" | "admin");
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Validaciones
      if (!formData.name.trim()) {
        setError("Por favor ingresa tu nombre completo");
        setIsLoading(false);
        return;
      }

      if (formData.name.trim().length < 3) {
        setError("El nombre debe tener al menos 3 caracteres");
        setIsLoading(false);
        return;
      }

      if (!formData.email.trim()) {
        setError("Por favor ingresa tu email");
        setIsLoading(false);
        return;
      }

      if (!validateEmail(formData.email)) {
        setError("Por favor ingresa un email válido");
        setIsLoading(false);
        return;
      }

      if (!formData.phone.trim()) {
        setError("Por favor ingresa tu teléfono");
        setIsLoading(false);
        return;
      }

      if (!validatePhone(formData.phone)) {
        setError("Por favor ingresa un teléfono válido");
        setIsLoading(false);
        return;
      }

      if (!formData.password.trim()) {
        setError("Por favor ingresa una contraseña");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden");
        setIsLoading(false);
        return;
      }

      // Crear usuario
      const newUser: UserType = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        role: role,
      };

      // Guardar en userStore
      userStore.setUser(newUser);

      // Mostrar éxito
      setSuccess("¡Registro exitoso! Redirigiendo...");

      // Esperar un poco para simular latencia
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirigir a completar perfil (mismo para todos los roles)
      navigate("/complete-profile");
    } catch (err) {
      setError("Ocurrió un error durante el registro. Intenta de nuevo.");
      console.error("Error en registro:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const roleInfo = {
    customer: {
      title: "Cliente",
      description: "Reserva canchas deportivas y gestiona tus reservas",
      color: "blue",
    },
    owner: {
      title: "Dueño de Cancha",
      description: "Administra tus canchas y recibe reservas",
      color: "orange",
    },
    admin: {
      title: "Administrador",
      description: "Gestiona el sistema completo",
      color: "red",
    },
  };

  const currentRole = roleInfo[role];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-3">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sistema de Reservas</h1>
          <p className="text-blue-100">Crea tu cuenta para comenzar</p>
        </div>

        {/* Tarjeta de Registro */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Selección de Rol */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {Object.entries(roleInfo).map(([roleValue, roleData]) => (
                <button
                  key={roleValue}
                  type="button"
                  onClick={() => setRole(roleValue as "customer" | "owner" | "admin")}
                  className={`p-4 rounded-lg border-2 transition ${
                    role === roleValue
                      ? `border-${roleData.color}-500 bg-${roleData.color}-50`
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-semibold text-sm">{roleData.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{roleData.description}</div>
                </button>
              ))}
            </div>

            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-semibold">
                Nombre Completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Juan García López"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700 font-semibold">
                Teléfono
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+34 912 345 678"
                  value={formData.phone}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-semibold">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Mensajes de Error */}
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            {/* Mensajes de Éxito */}
            {success && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{success}</AlertDescription>
              </Alert>
            )}

            {/* Botón Registrar */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </form>

          {/* Link a Login */}
          <div className="mt-6 text-center text-gray-700">
            <p>
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Link a Home */}
        <div className="text-center text-blue-100">
          <Link to="/" className="hover:text-white hover:underline">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
