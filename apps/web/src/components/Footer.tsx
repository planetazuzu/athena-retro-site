import { Terminal, Github, Twitter, Mail, Heart, MessageCircle, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerSections = [
    {
      title: "Producto",
      links: [
        { name: "Funcionalidades", href: "/funcionalidades" },
        { name: "Descargas", href: "/descargas" },
        { name: "Guías", href: "/guias" },
        { name: "Blog", href: "/blog" },
        { name: "Comunidad", href: "/comunidad" }
      ]
    },
    {
      title: "Soporte",
      links: [
        { name: "Contacto", href: "/contacto" },
        { name: "FAQ", href: "/contacto#faq" },
        { name: "Donaciones", href: "/donar" },
        { name: "Acerca", href: "/acerca" },
        { name: "Soporte Técnico", href: "/contacto" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Términos de Uso", href: "/terminos" },
        { name: "Política de Privacidad", href: "/privacidad" },
        { name: "Cookies", href: "/privacidad#cookies" },
        { name: "Seguridad", href: "/privacidad#seguridad" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Github, href: "#github", label: "GitHub" },
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: MessageCircle, href: "#discord", label: "Discord" },
    { icon: Mail, href: "/contacto", label: "Email" }
  ];

  return (
    <footer className="bg-background-tertiary border-t border-primary/20">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:pr-8">
              <div className="flex items-center space-x-3 mb-6">
                <Terminal className="h-10 w-10 text-primary terminal-glow" />
                <span className="text-2xl font-terminal font-bold text-primary terminal-glow">
                  ATHENA_POCKET
                </span>
              </div>
              
              <p className="text-muted-foreground font-terminal text-lg mb-6 leading-relaxed">
                Tu compañero de supervivencia con IA que te guía en situaciones extremas. Mapas offline, alertas SOS, consejos personalizados y más.
              </p>

              {/* Terminal Window */}
              <div className="bg-background border border-primary/30 rounded-sm terminal-border">
                <div className="bg-background-secondary p-3 border-b border-primary/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-muted-foreground text-sm font-terminal ml-4">~/athena-status</span>
                  </div>
                </div>
                <div className="p-4 font-terminal text-sm space-y-2">
                  <div className="text-primary-dim">$ athena --status</div>
                  <div className="text-muted-foreground">✓ Sistema operativo: Activo</div>
                  <div className="text-muted-foreground">✓ Usuarios conectados: 50,247</div>
                  <div className="text-muted-foreground">✓ Vidas ayudadas: 1,234</div>
                  <div className="text-primary-glow">$ _</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center space-x-2 text-muted-foreground font-terminal text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Calle Innovación 123, 28001 Madrid, España</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground font-terminal text-sm">
                  <Mail className="h-4 w-4" />
                  <span>hola@athenapocket.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-6">
                <span className="text-muted-foreground font-terminal text-sm">Síguenos:</span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 group-hover:terminal-glow" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-primary font-terminal font-bold mb-4 text-lg">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className="text-muted-foreground hover:text-primary transition-colors duration-300 font-terminal text-sm"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-muted-foreground font-terminal text-sm">
              <span>© 2024 Athena Technologies S.L. Todos los derechos reservados.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground font-terminal text-sm">
              <span>Hecho con</span>
              <Heart className="h-4 w-4 text-destructive fill-current animate-pulse" />
              <span>para salvar vidas</span>
            </div>
          </div>

          {/* Final Command Line */}
          <div className="mt-6 text-center">
            <div className="inline-block bg-background border border-primary/20 rounded-sm p-3 terminal-border">
              <span className="text-primary-dim font-terminal text-sm">
                $ echo "Gracias por confiar en Athena Pocket" && athena --version
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;