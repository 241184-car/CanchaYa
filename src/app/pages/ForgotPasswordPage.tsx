import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Mail, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Trophy className="h-10 w-10 text-primary" />
            <span className="font-bold text-2xl">SportBook</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Recuperar contraseña</h1>
          <p className="text-muted-foreground">
            Te enviaremos instrucciones para restablecer tu contraseña
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-border">
          {!submitted ? (
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
                    placeholder="tu@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium"
              >
                Enviar instrucciones
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-2">¡Correo enviado!</h3>
              <p className="text-muted-foreground mb-6">
                Hemos enviado las instrucciones a <strong>{email}</strong>. Revisa tu bandeja de entrada y sigue los pasos.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-primary hover:underline text-sm"
              >
                ¿No recibiste el correo? Reenviar
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Volver a iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
