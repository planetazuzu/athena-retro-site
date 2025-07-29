import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal, Download } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Inicio", href: "#home" },
    { name: "Funcionalidades", href: "#features" },
    { name: "Documentación", href: "#docs" },
    { name: "Descargas", href: "#downloads" },
    { name: "Blog", href: "#blog" },
    { name: "Contacto", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Terminal className="h-8 w-8 text-primary terminal-glow" />
            <span className="text-xl font-terminal font-bold text-primary terminal-glow">
              ATHENA_POCKET
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300 font-terminal"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="terminal" size="sm">
              <Download className="h-4 w-4" />
              Descargar
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background-secondary border border-primary/30 rounded-sm mt-2 p-4 terminal-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-terminal py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button variant="terminal" size="sm" className="mt-4">
                <Download className="h-4 w-4" />
                Descargar
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;