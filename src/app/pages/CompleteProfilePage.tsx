import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trophy, MapPin, Clock, FileText, AlertCircle } from "lucide-react";
import { userStore } from "../utils/userStore";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const user = userStore.getUser();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    zipCode: "",
    bio: "",
    website: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirigir si no hay usuario logueado
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validar campos mínimos
      if (!formData.address.trim()) {
        setError("Por favor ingresa tu dirección");
        setIsLoading(false);
        return;
      }

      if (!formData.city.trim()) {
        setError("Por favor ingresa tu ciudad");
        setIsLoading(false);
        return;
      }

      if (!formData.zipCode.trim()) {
        setError("Por favor ingresa tu código postal");
        setIsLoading(false);
        return;
      }

      // Actualizar usuario con datos adicionales
      if (user) {
        const updatedUser = {
          ...user,
          address: formData.address.trim(),
          city: formData.city.trim(),
          zipCode: formData.zipCode.trim(),
          bio: formData.bio.trim(),
          website: formData.website.trim(),
        };
        userStore.setUser(updatedUser);
      }

      // Esperar un poco para simular
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirigir al dashboard según el rol
      if (user) {
        switch (user.role) {
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
      }
    } catch (err) {
      setError("Ocurrió un error. Intenta de nuevo.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  const roleInfo: Record<string, { title: string; description: string; color: string }> = {
    customer: {
      title: "Completa tu Perfil - Cliente",
      description: "Ayúdanos a conocerte mejor para personalizar tu experiencia",
      color: "blue",
    },
    owner: {
      title: "Completa tu Perfil - Dueño de Cancha",
      description: "Proporciona detalles sobre tu ubicación y negocio",
      color: "orange",
    },
    admin: {
      title: "Completa tu Perfil - Administrador",
      description: "Finaliza la configuración de tu cuenta",
      color: "red",
    },
  };

  const current = roleInfo[user.role] || roleInfo.customer;

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
          <h1 className="text-3xl font-bold text-white mb-2">{current.title}</h1>
          <p className="text-blue-100">{current.description}</p>
          <div className="mt-3 text-sm text-blue-200">
            Usuario: <span className="font-semibold">{user.name}</span> ({user.role})
          </div>
        </div>

        {/* Tarjeta de Formulario */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Dirección */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-700 font-semibold">
                Dirección *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Calle Principal 123"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Ciudad */}
            <div className="space-y-2">
              <Label htmlFor="city" className="text-gray-700 font-semibold">
                Ciudad *
              </Label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="Madrid"
                value={formData.city}
                onChange={handleChange}
                disabled={isLoading}
                className="bg-gray-50 border-gray-200"
              />
            </div>

            {/* Código Postal */}
            <div className="space-y-2">
              <Label htmlFor="zipCode" className="text-gray-700 font-semibold">
                Código Postal *
              </Label>
              <Input
                id="zipCode"
                name="zipCode"
                type="text"
                placeholder="28001"
                value={formData.zipCode}
                onChange={handleChange}
                disabled={isLoading}
                className="bg-gray-50 border-gray-200"
              />
            </div>

            {/* Bio / Descripción */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-gray-700 font-semibold">
                Biografía (Opcional)
              </Label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Cuéntanos sobre ti..."
                value={formData.bio}
                onChange={handleChange}
                disabled={isLoading}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Sitio Web */}
            <div className="space-y-2">
              <Label htmlFor="website" className="text-gray-700 font-semibold">
                Sitio Web (Opcional)
              </Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://ejemplo.com"
                  value={formData.website}
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

            {/* Botón Continuar */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition"
            >
              {isLoading ? "Guardando..." : "Continuar al Dashboard"}
            </Button>
          </form>

          {/* Nota */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <Clock className="w-4 h-4 inline mr-2" />
              Los campos marcados con * son obligatorios
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
