import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Trophy } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <Trophy className="h-20 w-20 text-primary mx-auto mb-4 opacity-50" />
          <div className="text-9xl font-bold text-primary mb-4">404</div>
          <h1 className="text-3xl font-bold mb-2">Página no encontrada</h1>
          <p className="text-muted-foreground mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
          >
            <Home className="h-5 w-5" />
            Ir al inicio
          </Link>
          <Link
            to="/courts"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent"
          >
            <Search className="h-5 w-5" />
            Buscar canchas
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            ¿Necesitas ayuda?{" "}
            <a href="#" className="text-primary hover:underline">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
