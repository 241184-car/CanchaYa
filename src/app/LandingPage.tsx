import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  MapPin,
  ShieldCheck,
  Smartphone,
  Star,
  Trophy,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { userStore } from "./utils/userStore";

const courts = [
  {
    name: "Cancha Fútbol 7 Premium",
    location: "Abancay - Centro Deportivo",
    price: "S/ 50/hora",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cancha Sintética Pro",
    location: "Abancay - Avenida Pachacútec",
    price: "S/ 45/hora",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cancha Multideporte",
    location: "Abancay - Zona Sur",
    price: "S/ 40/hora",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cancha Tenis Elite",
    location: "Abancay - Club Deportivo",
    price: "S/ 55/hora",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1554224311-beee415c15c7?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cancha Básquet Indoor",
    location: "Abancay - Polideportivo Municipal",
    price: "S/ 45/hora",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1546519638-68711109e9e6?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Cancha Pádel Supreme",
    location: "Abancay - Sector Este",
    price: "S/ 60/hora",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1554224311-beee415c15c7?auto=format&fit=crop&w=900&q=80",
  },
];

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const hours = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export default function LandingPage() {
  const navigate = useNavigate();
  const user = userStore.getUser();

  const handleVerCanchas = () => {
    if (!user) {
      navigate("/login");
    } else {
      switch (user.role) {
        case "customer":
          navigate("/map");
          break;
        case "owner":
          navigate("/courts");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/login");
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/30">
              <Trophy className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight">
                CanchaYa
              </h1>
              <p className="text-xs text-slate-400">
                Reservas deportivas
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <a
              href="#beneficios"
              className="hover:text-orange-400"
            >
              Beneficios
            </a>
            <a
              href="#canchas"
              className="hover:text-orange-400"
            >
              Canchas
            </a>
            <a
              href="#horarios"
              className="hover:text-orange-400"
            >
              Horarios
            </a>
            <a
              href="#contacto"
              className="hover:text-orange-400"
            >
              Contacto
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to={user ? (user.role === "customer" ? "/dashboard" : user.role === "owner" ? "/courts" : "/admin/dashboard") : "/login"}
              className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
            >
              {user ? "Mi Dashboard" : "Iniciar sesión"}
            </Link>
            {user && (
              <button
                onClick={() => {
                  userStore.logout();
                }}
                className="rounded-full border border-orange-400 px-6 py-3 text-sm font-bold text-orange-400 transition hover:bg-orange-500/10"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.28),transparent_35%),radial-gradient(circle_at_top_left,rgba(37,99,235,0.32),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-300">
              <ShieldCheck className="h-4 w-4" />
              Reserva segura y rápida
            </div>

            <h2 className="max-w-2xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
              Reserva tu cancha en minutos
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Encuentra canchas disponibles, compara horarios y
              confirma tu reserva desde cualquier dispositivo.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleVerCanchas}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-bold text-white transition hover:bg-orange-600"
              >
                Ver canchas
                <ArrowRight className="h-5 w-5" />
              </button>

              <a
                href="#horarios"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10"
              >
                Ver horarios
              </a>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-black text-orange-400">
                  24/7
                </p>
                <p className="text-sm text-slate-400">
                  Reservas online
                </p>
              </div>

              <div>
                <p className="text-3xl font-black text-orange-400">
                  +35
                </p>
                <p className="text-sm text-slate-400">
                  Canchas activas
                </p>
              </div>

              <div>
                <p className="text-3xl font-black text-orange-400">
                  4.8
                </p>
                <p className="text-sm text-slate-400">
                  Valoración
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-3 shadow-2xl shadow-blue-950/60 backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80"
                alt="Cancha deportiva iluminada"
                className="h-[520px] w-full rounded-[1.5rem] object-cover"
              />

              <div className="absolute bottom-8 left-8 max-w-xs rounded-3xl border border-white/10 bg-slate-950/85 p-5 text-white shadow-xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-orange-500 p-3">
                    <CalendarDays className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-bold">Próximo horario</p>
                    <p className="text-sm text-slate-300">
                      Hoy, 8:00 PM disponible
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section
        id="beneficios"
        className="bg-white py-20 text-slate-950"
      >
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 font-bold uppercase tracking-[0.25em] text-orange-500">
            Beneficios
          </p>

          <h2 className="mb-12 text-4xl font-black tracking-tight md:text-5xl">
            Todo listo para jugar sin complicaciones
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <BenefitCard
              icon={<Smartphone className="h-7 w-7" />}
              title="Reserva desde tu celular"
              text="Consulta disponibilidad, elige sede y confirma tu horario en pocos pasos."
            />

            <BenefitCard
              icon={<Clock className="h-7 w-7" />}
              title="Horarios en tiempo real"
              text="Evita cruces y llamadas. Mira los espacios libres antes de reservar."
            />

            <BenefitCard
              icon={<Users className="h-7 w-7" />}
              title="Ideal para equipos"
              text="Organiza partidos, torneos o entrenamientos de forma rápida."
            />
          </div>
        </div>
      </section>

      {/* CANCHAS */}
      <section
        id="canchas"
        className="bg-slate-100 py-20 text-slate-950"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-bold uppercase tracking-[0.25em] text-orange-500">
                Canchas
              </p>

              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Elige tu cancha favorita
              </h2>
            </div>

            <Link
              to="/courts"
              className="rounded-full bg-slate-950 px-7 py-3 text-center font-bold text-white transition hover:bg-slate-800"
            >
              Ver todas
            </Link>
          </div>

          <div className="grid gap-7 md:grid-cols-3">
            {courts.map((court) => (
              <article
                key={court.name}
                className="overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={court.image}
                    alt={court.name}
                    className="h-56 w-full object-cover"
                  />

                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-bold text-slate-950 shadow-lg">
                    <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                    {court.rating}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black">
                    {court.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-slate-600">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    {court.location}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-2xl font-black text-slate-950">
                      {court.price}
                    </p>

                    <button
                      onClick={handleVerCanchas}
                      className="rounded-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600 cursor-pointer"
                    >
                      Reservar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* HORARIOS */}
      <section
        id="horarios"
        className="bg-slate-950 py-20 text-white"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-3 font-bold uppercase tracking-[0.25em] text-orange-400">
              Calendario
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              Reserva el horario ideal
            </h2>

            <p className="mt-5 leading-8 text-slate-300">
              Selecciona día y hora disponible. Los horarios se
              organizan de forma clara para confirmar tu
              reserva.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                Reserva recomendada
              </p>

              <p className="mt-2 text-3xl font-black text-orange-400">
                Viernes · 18:00
              </p>

              <button
                onClick={handleVerCanchas}
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-6 py-4 text-base font-bold text-white transition hover:bg-orange-600 cursor-pointer"
              >
                Confirmar reserva
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur md:p-8">
            <div className="mb-6 grid grid-cols-6 gap-3">
              {days.map((day) => (
                <button
                  key={day}
                  className={`rounded-2xl px-3 py-4 text-sm font-black transition ${
                    day === "Vie"
                      ? "bg-orange-500 text-white"
                      : "bg-white/10 text-slate-300 hover:bg-white/20"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {hours.map((hour, index) => {
                const busy = index === 1 || index === 3;
                const selected = hour === "18:00";

                return (
                  <button
                    key={hour}
                    disabled={busy}
                    className={`rounded-2xl border px-4 py-5 text-center font-black transition ${
                      busy
                        ? "cursor-not-allowed border-white/5 bg-white/5 text-slate-600"
                        : selected
                          ? "border-orange-400 bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                          : "border-white/10 bg-white/10 text-slate-200 hover:border-orange-400/70 hover:bg-orange-500/20"
                    }`}
                  >
                    <Clock className="mx-auto mb-2 h-4 w-4" />
                    {hour}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle className="h-4 w-4 text-orange-400" />
              Los horarios en naranja están listos para
              reservar.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orange-500 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-4xl font-black tracking-tight">
              ¿Listo para jugar?
            </h2>
            <p className="mt-3 text-lg text-orange-50">
              Reserva tu cancha, reúne a tu equipo y entra a la
              cancha sin perder tiempo.
            </p>
          </div>

          <button
            onClick={handleVerCanchas}
            className="rounded-full bg-slate-950 px-9 py-4 text-base font-bold text-white transition hover:bg-slate-900 cursor-pointer"
          >
            Reservar ahora
          </button>
        </div>
      </section>

      <footer
        id="contacto"
        className="bg-slate-950 py-10 text-slate-400"
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500 text-white">
              <Trophy className="h-5 w-5" />
            </div>

            <div>
              <p className="font-black text-white">CanchaYa</p>
              <p className="text-sm">
                Reservas deportivas modernas
              </p>
            </div>
          </div>

          <p className="text-sm">
            © 2026 CanchaYa. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}

function BenefitCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-orange-400">
        {icon}
      </div>

      <h3 className="text-xl font-black">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </article>
  );
}