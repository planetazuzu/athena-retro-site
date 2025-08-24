import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, MessageCircle, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Contacto = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Para consultas generales y soporte",
      contact: "athenapocket@proton.me",
      response: "Respuesta en 24h"
    },
    {
      icon: Phone,
      title: "Teléfono",
      description: "Para emergencias y soporte técnico",
      contact: "+34 661 80 48 28",
      response: "Lun-Vie 9:00-18:00"
    },
    {
      icon: MessageCircle,
      title: "Chat en Vivo",
      description: "Soporte instantáneo",
      contact: "Disponible en la app",
      response: "24/7"
    }
  ];

  const faqs = [
    {
      question: "¿Cómo funciona la IA de supervivencia?",
      answer: "Nuestra IA analiza tu situación en tiempo real y proporciona consejos personalizados basados en tu ubicación, condiciones climáticas y recursos disponibles."
    },
    {
      question: "¿Los mapas funcionan sin internet?",
      answer: "Sí, todos los mapas se descargan previamente y funcionan completamente offline. Solo necesitas conexión para actualizaciones."
    },
    {
      question: "¿Es seguro usar la función SOS?",
      answer: "Absolutamente. Solo enviamos tu ubicación cuando activas manualmente la alerta SOS, y solo a los contactos que hayas predefinido."
    },
    {
      question: "¿Puedo contribuir con contenido?",
      answer: "¡Por supuesto! Aceptamos contribuciones de la comunidad. Contacta con nosotros para más información sobre cómo colaborar."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --contact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow font-terminal mb-6">
            CONTACTO Y SOPORTE
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal mb-8">
            Preguntas, feedback o ayuda: contáctanos y resolveremos tus dudas sobre Athena Pocket.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              FORMAS DE CONTACTAR
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
              Elige el método que mejor se adapte a tu necesidad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border text-center">
                <method.icon className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-primary font-terminal mb-2">{method.title}</h3>
                <p className="text-muted-foreground font-terminal mb-4">{method.description}</p>
                <div className="text-primary font-terminal font-bold mb-2">{method.contact}</div>
                <div className="text-sm text-muted-foreground font-terminal">{method.response}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-background border border-primary/20 rounded-sm p-8 terminal-border">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-6 text-center">
                ENVIAR MENSAJE
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary font-terminal mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 bg-background-secondary border border-primary/20 rounded-sm font-terminal text-primary focus:border-primary focus:outline-none"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary font-terminal mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full p-3 bg-background-secondary border border-primary/20 rounded-sm font-terminal text-primary focus:border-primary focus:outline-none"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary font-terminal mb-2">
                    Asunto *
                  </label>
                  <select className="w-full p-3 bg-background-secondary border border-primary/20 rounded-sm font-terminal text-primary focus:border-primary focus:outline-none">
                    <option value="">Selecciona un asunto</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="feedback">Feedback</option>
                    <option value="colaboracion">Colaboración</option>
                    <option value="emergencia">Emergencia</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-primary font-terminal mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    rows={6}
                    required
                    className="w-full p-3 bg-background-secondary border border-primary/20 rounded-sm font-terminal text-primary focus:border-primary focus:outline-none"
                    placeholder="Describe tu consulta o problema..."
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    required
                    className="rounded border-primary/20 text-primary focus:ring-primary"
                  />
                  <label htmlFor="privacy" className="text-sm text-muted-foreground font-terminal">
                    Acepto la <Link to="/privacidad" className="text-primary hover:underline">política de privacidad</Link>
                  </label>
                </div>
                
                <Button type="submit" className="w-full font-terminal" variant="cta" size="lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Enviar Mensaje
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              PREGUNTAS FRECUENTES
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
              Respuestas a las preguntas más comunes
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border">
                <h3 className="text-lg font-bold text-primary font-terminal mb-3">{faq.question}</h3>
                <p className="text-muted-foreground font-terminal">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background border border-primary/20 rounded-sm p-8 terminal-border">
              <h2 className="text-2xl font-bold text-primary font-terminal mb-6 text-center">
                NUESTRA OFICINA
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-primary font-terminal mb-2">Dirección</h3>
                    <p className="text-muted-foreground font-terminal">
                      Calle Innovación 123<br />
                      28001 Madrid, España
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-bold text-primary font-terminal mb-2">Horario</h3>
                    <p className="text-muted-foreground font-terminal">
                      Lunes - Viernes: 9:00 - 18:00<br />
                      Sábados: 10:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-background-secondary border border-primary/30 rounded-sm p-8 terminal-border text-center">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-primary font-terminal mb-4">
                ¿EMERGENCIA REAL?
              </h2>
              <p className="text-muted-foreground font-terminal mb-6">
                Si estás en una situación de emergencia real, contacta inmediatamente con los servicios de emergencia locales.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground font-terminal">
                <p><strong>España:</strong> 112 (Emergencias)</p>
                <p><strong>México:</strong> 911 (Emergencias)</p>
                <p><strong>Argentina:</strong> 911 (Emergencias)</p>
                <p><strong>Colombia:</strong> 123 (Emergencias)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-8 terminal-border">
            <h2 className="text-2xl font-bold text-primary font-terminal mb-4">
              ¿Necesitas ayuda inmediata?
            </h2>
            <p className="text-muted-foreground font-terminal mb-6">
              Nuestro equipo está aquí para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <Link to="#chat">Chat en Vivo</Link>
              </Button>
              <Button asChild variant="terminal" size="lg">
                <Link to="/comunidad">Unirse a Comunidad</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto; 