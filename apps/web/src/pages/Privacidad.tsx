import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Shield, Lock, Eye, Database, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Privacidad = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --privacy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow font-terminal mb-6">
            POLÍTICA DE PRIVACIDAD
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal mb-8">
            Última actualización: 15 de enero de 2024
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border">
              <div className="space-y-8 text-muted-foreground font-terminal leading-relaxed">
                
                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">1. INFORMACIÓN GENERAL</h2>
                  <p>
                    Athena Technologies S.L. ("nosotros", "nuestro", "la Compañía") opera la aplicación 
                    Athena Pocket. Esta política describe cómo recopilamos, usamos y protegemos tu información 
                    personal cuando usas nuestra aplicación.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">2. INFORMACIÓN QUE RECOPILAMOS</h2>
                  <p>Recopilamos los siguientes tipos de información:</p>
                  
                  <h3 className="text-lg font-bold text-primary font-terminal mt-4 mb-2">Información Personal:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nombre y dirección de email (opcional)</li>
                    <li>Información de contacto de emergencia</li>
                    <li>Preferencias de la aplicación</li>
                  </ul>

                  <h3 className="text-lg font-bold text-primary font-terminal mt-4 mb-2">Información de Ubicación:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ubicación GPS (solo cuando activas SOS)</li>
                    <li>Región de descarga de mapas</li>
                    <li>Datos de navegación offline</li>
                  </ul>

                  <h3 className="text-lg font-bold text-primary font-terminal mt-4 mb-2">Información Técnica:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Versión de la aplicación</li>
                    <li>Tipo de dispositivo y sistema operativo</li>
                    <li>Datos de uso y rendimiento</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">3. CÓMO USAMOS TU INFORMACIÓN</h2>
                  <p>Utilizamos tu información para:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Proporcionar servicios de supervivencia y emergencia</li>
                    <li>Mejorar la funcionalidad de la aplicación</li>
                    <li>Enviar alertas SOS cuando las actives</li>
                    <li>Personalizar tu experiencia de usuario</li>
                    <li>Proporcionar soporte técnico</li>
                    <li>Cumplir con obligaciones legales</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">4. COMPARTIR INFORMACIÓN</h2>
                  <p>
                    <strong>NO vendemos, alquilamos o compartimos tu información personal con terceros</strong>, 
                    excepto en las siguientes circunstancias:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>SOS Emergencia:</strong> Solo cuando activas manualmente una alerta SOS</li>
                    <li><strong>Servicios de Emergencia:</strong> Para coordinar rescates cuando sea necesario</li>
                    <li><strong>Contactos de Confianza:</strong> Que hayas predefinido en la aplicación</li>
                    <li><strong>Obligación Legal:</strong> Cuando lo requiera la ley</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">5. SEGURIDAD DE DATOS</h2>
                  <p>
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Encriptación de datos en tránsito y en reposo</li>
                    <li>Acceso restringido a información personal</li>
                    <li>Auditorías regulares de seguridad</li>
                    <li>Cumplimiento con estándares de seguridad internacionales</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">6. ALMACENAMIENTO DE DATOS</h2>
                  <p>
                    La mayoría de tus datos se almacenan localmente en tu dispositivo. Los datos que se 
                    envían a nuestros servidores se almacenan en centros de datos seguros en la Unión Europea, 
                    cumpliendo con el RGPD.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">7. TUS DERECHOS</h2>
                  <p>Tienes los siguientes derechos sobre tus datos personales:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos</li>
                    <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                    <li><strong>Eliminación:</strong> Solicitar la eliminación de tus datos</li>
                    <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                    <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                    <li><strong>Limitación:</strong> Limitar el procesamiento de tus datos</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">8. COOKIES Y TECNOLOGÍAS SIMILARES</h2>
                  <p>
                    Athena Pocket utiliza un mínimo de cookies y tecnologías similares, principalmente para:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Recordar tus preferencias de la aplicación</li>
                    <li>Mejorar el rendimiento y funcionalidad</li>
                    <li>Analizar el uso de la aplicación (anónimamente)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">9. MENORES DE EDAD</h2>
                  <p>
                    Athena Pocket no está dirigida a menores de 13 años. No recopilamos intencionalmente 
                    información personal de menores de 13 años. Si eres padre o tutor y crees que tu hijo 
                    nos ha proporcionado información personal, contacta con nosotros inmediatamente.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">10. CAMBIOS EN ESTA POLÍTICA</h2>
                  <p>
                    Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre 
                    cambios significativos a través de la aplicación o por email. Te recomendamos revisar 
                    esta política periódicamente.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-primary font-terminal mb-4">11. CONTACTO</h2>
                  <p>
                    Para preguntas sobre esta política de privacidad o para ejercer tus derechos, contacta con nosotros:
                  </p>
                  <div className="mt-2">
                    <p>Email: privacy@athenapocket.com</p>
                    <p>Dirección: Calle Innovación 123, 28001 Madrid, España</p>
                    <p>Delegado de Protección de Datos: dpo@athenapocket.com</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Features */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary terminal-glow font-terminal mb-4">
              NUESTRO COMPROMISO CON LA PRIVACIDAD
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal">
              Tu privacidad es nuestra prioridad
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <Lock className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary font-terminal mb-2">Datos Encriptados</h3>
              <p className="text-muted-foreground font-terminal">Toda la información se encripta usando estándares de seguridad de nivel bancario</p>
            </div>
            <div className="text-center">
              <Eye className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary font-terminal mb-2">Control Total</h3>
              <p className="text-muted-foreground font-terminal">Tú decides qué información compartir y cuándo</p>
            </div>
            <div className="text-center">
              <Database className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary font-terminal mb-2">Almacenamiento Local</h3>
              <p className="text-muted-foreground font-terminal">La mayoría de tus datos permanecen en tu dispositivo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background-secondary border border-primary/30 rounded-sm p-8 terminal-border">
            <h2 className="text-2xl font-bold text-primary font-terminal mb-4">
              ¿Tienes preguntas sobre privacidad?
            </h2>
            <p className="text-muted-foreground font-terminal mb-6">
              Nuestro equipo de privacidad está aquí para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <Link to="/contacto">Contactar Privacidad</Link>
              </Button>
              <Button asChild variant="terminal" size="lg">
                <Link to="/terminos">Ver Términos y Condiciones</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacidad; 