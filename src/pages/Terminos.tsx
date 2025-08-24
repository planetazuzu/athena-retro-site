import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, AlertTriangle, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Terminos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --terms</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow font-terminal mb-6">
            TÉRMINOS Y CONDICIONES
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal mb-8">
            Última actualización: 15 de enero de 2024
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border">
              <div className="space-y-8 text-muted-foreground font-terminal leading-relaxed">
                
                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">1. ACEPTACIÓN DE LOS TÉRMINOS</h2>
                  <p>
                    Al descargar, instalar o usar la aplicación Athena Pocket ("la Aplicación"), aceptas estar 
                    sujeto a estos Términos y Condiciones ("Términos"). Si no estás de acuerdo con estos términos, 
                    no debes usar la Aplicación.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">2. DESCRIPCIÓN DEL SERVICIO</h2>
                  <p>
                    Athena Pocket es una aplicación móvil de supervivencia que proporciona:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Guías de supervivencia y primeros auxilios</li>
                    <li>Mapas offline y navegación</li>
                    <li>Asistente de inteligencia artificial</li>
                    <li>Sistema de alertas SOS</li>
                    <li>Comunidad de usuarios</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">3. USO RESPONSABLE</h2>
                  <p>
                    La Aplicación está diseñada para proporcionar información educativa y de emergencia. 
                    Los usuarios deben:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Usar la información de manera responsable</li>
                    <li>Buscar atención médica profesional cuando sea necesario</li>
                    <li>No depender únicamente de la Aplicación en situaciones críticas</li>
                    <li>Contactar servicios de emergencia locales en emergencias reales</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">4. LIMITACIÓN DE RESPONSABILIDAD</h2>
                  <p>
                    Athena Pocket se proporciona "tal como está" sin garantías de ningún tipo. No nos hacemos 
                    responsables de:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Daños directos o indirectos por el uso de la Aplicación</li>
                    <li>Pérdidas o lesiones resultantes de seguir consejos de la Aplicación</li>
                    <li>Interrupciones del servicio o fallos técnicos</li>
                    <li>Acciones de terceros o servicios externos</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">5. PRIVACIDAD Y DATOS</h2>
                  <p>
                    Tu privacidad es importante. Recopilamos y procesamos datos según nuestra 
                    <Link to="/privacidad" className="text-primary hover:underline"> Política de Privacidad</Link>. 
                    Los datos de ubicación solo se comparten cuando activas manualmente una alerta SOS.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">6. PROPIEDAD INTELECTUAL</h2>
                  <p>
                    Athena Pocket y todo su contenido son propiedad de Athena Technologies S.L. o sus licenciantes. 
                    No se permite la reproducción, distribución o modificación sin autorización expresa.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">7. USO ACEPTABLE</h2>
                  <p>
                    Los usuarios se comprometen a:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Usar la Aplicación solo para fines legales</li>
                    <li>No intentar acceder a sistemas o datos no autorizados</li>
                    <li>No interferir con el funcionamiento de la Aplicación</li>
                    <li>Respetar los derechos de otros usuarios</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">8. MODIFICACIONES</h2>
                  <p>
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
                    serán notificados a través de la Aplicación o nuestro sitio web. El uso continuado 
                    constituye aceptación de los nuevos términos.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">9. TERMINACIÓN</h2>
                  <p>
                    Podemos suspender o terminar tu acceso a la Aplicación en cualquier momento por 
                    violación de estos términos o por cualquier otra razón a nuestra discreción.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">10. LEY APLICABLE</h2>
                  <p>
                    Estos términos se rigen por las leyes de España. Cualquier disputa será resuelta 
                    en los tribunales de Madrid, España.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">11. CONTACTO</h2>
                  <p>
                    Para preguntas sobre estos términos, contacta con nosotros en:
                  </p>
                  <div className="mt-2">
                    <p>Email: legal@athenapocket.com</p>
                    <p>Dirección: Calle Innovación 123, 28001 Madrid, España</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background border border-primary/30 rounded-sm p-8 terminal-border">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-8 w-8 text-yellow-500 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-primary font-terminal mb-4">Aviso Importante</h3>
                  <p className="text-muted-foreground font-terminal mb-4">
                    Athena Pocket es una herramienta educativa y de apoyo. En situaciones de emergencia real, 
                    siempre contacta con los servicios de emergencia locales (112 en España, 911 en otros países).
                  </p>
                  <p className="text-muted-foreground font-terminal">
                    La información proporcionada no sustituye la formación profesional en supervivencia o 
                    primeros auxilios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background-secondary border border-primary/30 rounded-sm p-8 terminal-border">
            <h2 className="text-2xl font-bold text-primary font-terminal mb-4">
              ¿Tienes preguntas sobre estos términos?
            </h2>
            <p className="text-muted-foreground font-terminal mb-6">
              Nuestro equipo legal está aquí para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <Link to="/contacto">Contactar Soporte</Link>
              </Button>
              <Button asChild variant="terminal" size="lg">
                <Link to="/privacidad">Ver Política de Privacidad</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terminos; 