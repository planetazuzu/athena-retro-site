import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Flame, Droplets, Home, Heart, Compass, Shield, BookOpen, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Guias = () => {
  const guides = [
    {
      id: "fuego",
      icon: Flame,
      title: "Encender Fuego",
      description: "Técnicas fundamentales para crear fuego en cualquier situación",
      content: [
        {
          subtitle: "Método del Frotador",
          steps: [
            "Encuentra madera seca y un palo recto",
            "Crea una muesca en la base de madera",
            "Frota el palo rápidamente en la muesca",
            "Recoge las brasas en material inflamable",
            "Sopla suavemente para avivar las llamas"
          ]
        },
        {
          subtitle: "Lupa o Espejo",
          steps: [
            "Usa una lupa o espejo para concentrar luz solar",
            "Apunta hacia material seco y fino",
            "Mantén la posición hasta que comience a humear",
            "Añade más material gradualmente"
          ]
        }
      ]
    },
    {
      id: "agua",
      icon: Droplets,
      title: "Purificar Agua",
      description: "Métodos para hacer agua potable en emergencias",
      content: [
        {
          subtitle: "Ebullición",
          steps: [
            "Filtra el agua con tela o filtro improvisado",
            "Hierve durante al menos 1 minuto",
            "Deja enfriar antes de beber",
            "En altitudes altas, hierve por 3 minutos"
          ]
        },
        {
          subtitle: "Filtros Caseros",
          steps: [
            "Crea un filtro con arena, grava y carbón",
            "Vierte agua a través del filtro",
            "Repite el proceso varias veces",
            "Siempre hierve después de filtrar"
          ]
        }
      ]
    },
    {
      id: "refugio",
      icon: Home,
      title: "Construir Refugio",
      description: "Crear protección contra elementos naturales",
      content: [
        {
          subtitle: "Refugio Básico",
          steps: [
            "Busca un lugar elevado y seco",
            "Usa ramas grandes como estructura",
            "Cubre con hojas, musgo o tela",
            "Asegura que el techo tenga pendiente",
            "Aísla el suelo con hojas secas"
          ]
        },
        {
          subtitle: "Refugio de Nieve",
          steps: [
            "Cava una cueva en la nieve compacta",
            "Haz el techo en forma de cúpula",
            "Crea ventilación para evitar CO2",
            "Aísla el suelo con ramas"
          ]
        }
      ]
    },
    {
      id: "primeros-auxilios",
      icon: Heart,
      title: "Primeros Auxilios",
      description: "Atención médica básica en emergencias",
      content: [
        {
          subtitle: "Heridas y Hemorragias",
          steps: [
            "Limpia la herida con agua limpia",
            "Aplica presión directa con tela limpia",
            "Eleva la extremidad si es posible",
            "Mantén la presión hasta que pare el sangrado",
            "Busca atención médica profesional"
          ]
        },
        {
          subtitle: "Fracturas",
          steps: [
            "Inmoviliza la extremidad lesionada",
            "Usa tablillas improvisadas",
            "Aplica hielo para reducir hinchazón",
            "No intentes enderezar huesos rotos",
            "Busca ayuda médica inmediatamente"
          ]
        }
      ]
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-background border border-primary/30 rounded-sm p-3 mb-6 terminal-border">
            <span className="text-primary-dim font-terminal text-sm">$ athena --guides</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary terminal-glow font-terminal mb-6">
            GUIAS DE SUPERVIVENCIA
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-terminal mb-8">
            Accede a tutoriales paso a paso de supervivencia: encender fuego, purificar agua, primeros auxilios y más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="cta" size="lg">
              <Link to="/descargas">Descargar App</Link>
            </Button>
            <Button asChild variant="terminal" size="lg">
              <Link to="/comunidad">Unirse a Comunidad</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="bg-background-secondary border border-primary/20 rounded-sm p-6 terminal-border">
            <h2 className="text-2xl font-bold text-primary font-terminal mb-6">Índice de Guías</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {guides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => scrollToSection(guide.id)}
                  className="flex items-center space-x-3 p-4 bg-background border border-primary/10 rounded-sm hover:border-primary/50 transition-all duration-300 group"
                >
                  <guide.icon className="h-6 w-6 text-primary group-hover:animate-terminal-flicker" />
                  <span className="text-sm font-terminal text-muted-foreground group-hover:text-primary transition-colors">
                    {guide.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guides Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {guides.map((guide) => (
              <div key={guide.id} id={guide.id} className="bg-background-secondary border border-primary/20 rounded-sm p-8 terminal-border">
                <div className="flex items-center mb-8">
                  <guide.icon className="h-12 w-12 text-primary terminal-glow mr-4" />
                  <div>
                    <h2 className="text-3xl font-bold text-primary font-terminal">{guide.title}</h2>
                    <p className="text-muted-foreground font-terminal">{guide.description}</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {guide.content.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="bg-background border border-primary/10 rounded-sm p-6">
                      <h3 className="text-xl font-bold text-primary font-terminal mb-4">{section.subtitle}</h3>
                      <ol className="space-y-3">
                        {section.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start text-muted-foreground font-terminal">
                            <span className="text-primary font-bold mr-3 min-w-[20px]">{stepIndex + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-20 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="bg-background border border-primary/30 rounded-sm p-8 terminal-border">
            <div className="flex items-start space-x-4">
              <Shield className="h-8 w-8 text-primary mt-1" />
              <div>
                <h3 className="text-xl font-bold text-primary font-terminal mb-4">Aviso de Seguridad</h3>
                <p className="text-muted-foreground font-terminal mb-4">
                  Estas guías son informativas y no sustituyen la formación profesional. En situaciones de emergencia real, 
                  siempre busca ayuda médica profesional cuando sea posible.
                </p>
                <p className="text-muted-foreground font-terminal">
                  <strong>Importante:</strong> Practica estas técnicas en entornos seguros antes de necesitarlas en una emergencia real.
                </p>
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
              ¿Necesitas más ayuda?
            </h2>
            <p className="text-muted-foreground font-terminal mb-6">
              Únete a nuestra comunidad y comparte experiencias con otros supervivientes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="cta" size="lg">
                <Link to="/comunidad">Unirse a Comunidad</Link>
              </Button>
              <Button asChild variant="terminal" size="lg">
                <Link to="/contacto">Contactar Expertos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Guias; 