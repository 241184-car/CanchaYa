import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Trophy, Calendar, Clock, CreditCard, Check, MapPin, ChevronRight } from "lucide-react";

export default function BookingFlow() {
  const { courtId } = useParams();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const court = {
    id: courtId,
    name: "Cancha de Fútbol Premium",
    location: "Centro Deportivo Norte, Ciudad",
    date: "Jueves, 28 de mayo de 2026",
    time: "18:00 - 19:30",
    duration: "1.5 horas",
    price: 50
  };

  const handleConfirmBooking = () => {
    setStep(4);
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">¡Reserva confirmada!</h1>
          <p className="text-muted-foreground mb-8">
            Hemos enviado la confirmación a tu correo electrónico
          </p>

          <div className="bg-white rounded-xl p-6 border border-border mb-8 text-left">
            <h3 className="font-bold mb-4">Detalles de tu reserva</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Cancha</div>
                <div className="font-medium">{court.name}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Fecha y hora</div>
                <div className="font-medium">{court.date} • {court.time}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Ubicación</div>
                <div className="font-medium">{court.location}</div>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total pagado</span>
                  <span className="text-2xl font-bold text-primary">${court.price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/my-bookings" className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
              Ver mis reservas
            </Link>
            <Link to="/courts" className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-accent">
              Reservar otra cancha
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">SportBook</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step >= s
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className={step >= 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}>Detalles</span>
            <span className={step >= 2 ? 'text-foreground font-medium' : 'text-muted-foreground'}>Información</span>
            <span className={step >= 3 ? 'text-foreground font-medium' : 'text-muted-foreground'}>Pago</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-2xl font-bold mb-6">Confirma los detalles</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Fecha</div>
                      <div className="font-medium">{court.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Horario</div>
                      <div className="font-medium">{court.time} ({court.duration})</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-accent rounded-lg">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="text-sm text-muted-foreground">Ubicación</div>
                      <div className="font-medium">{court.location}</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2"
                >
                  Continuar
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>

                <form className="space-y-4 mb-6">
                  <div>
                    <label className="block mb-2">Nombre completo</label>
                    <input
                      type="text"
                      defaultValue="Juan Pérez"
                      className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Correo electrónico</label>
                    <input
                      type="email"
                      defaultValue="juan@email.com"
                      className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Teléfono</label>
                    <input
                      type="tel"
                      defaultValue="+1 234 567 890"
                      className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Notas adicionales (opcional)</label>
                    <textarea
                      rows={3}
                      placeholder="Ej: Necesito dos balones adicionales"
                      className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </form>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-border rounded-lg hover:bg-accent"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-xl p-6 border border-border">
                <h2 className="text-2xl font-bold mb-6">Método de pago</h2>

                <div className="space-y-4 mb-6">
                  <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary/50">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span className="flex-1 font-medium">Tarjeta de crédito/débito</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary/50">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === "transfer"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span className="flex-1 font-medium">Transferencia bancaria</span>
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block mb-2">Número de tarjeta</label>
                      <input
                        type="text"
                        name="number"
                        value={cardData.number}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">Nombre en la tarjeta</label>
                      <input
                        type="text"
                        name="name"
                        value={cardData.name}
                        onChange={handleCardChange}
                        placeholder="Juan Pérez"
                        className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2">Vencimiento</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardData.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/AA"
                          className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardData.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 border border-border rounded-lg hover:bg-accent"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                  >
                    Pagar ${court.price}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 border border-border sticky top-24">
              <h3 className="font-bold mb-4">Resumen de reserva</h3>

              <div className="space-y-3 mb-4 pb-4 border-b border-border">
                <div>
                  <div className="text-sm text-muted-foreground">Cancha</div>
                  <div className="font-medium">{court.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Fecha</div>
                  <div className="font-medium">{court.date}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Horario</div>
                  <div className="font-medium">{court.time}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Duración</div>
                  <div className="font-medium">{court.duration}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${court.price}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Servicio</span>
                  <span>$0</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold">Total</span>
                  <span className="text-2xl font-bold text-primary">${court.price}</span>
                </div>
              </div>

              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                <Check className="h-4 w-4 inline mr-1" />
                Cancelación gratuita hasta 24h antes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
