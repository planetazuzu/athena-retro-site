import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal, Download, LogIn, LogOut, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();

  const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Funcionalidades", href: "/funcionalidades" },
    { name: "Guías", href: "/guias" },
    { name: "Descargas", href: "/descargas" },
    { name: "Blog", href: "/blog" },
    { name: "Comunidad", href: "/comunidad" },
    { name: "Acerca", href: "/acerca" },
    { name: "Contacto", href: "/contacto" },
    { name: "Admin", href: "/admin" }
  ];

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <Terminal className="h-8 w-8 text-primary terminal-glow group-hover:animate-pulse transition-all duration-300" />
              <span className="text-xl font-terminal font-bold text-primary terminal-glow group-hover:text-primary-glow transition-all duration-300">
                ATHENA_POCKET
              </span>
            </Link>
            <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-500 font-terminal text-xs animate-pulse">
              BETA
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-muted-foreground hover:text-primary transition-all duration-300 font-terminal group ${
                  isActive(item.href) ? 'text-primary' : ''
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary terminal-glow"></span>
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="terminal" size="sm" className="glow-effect">
              <Link to="/app">
                <Download className="h-4 w-4" />
                Descargar
              </Link>
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary font-terminal text-xs">
                  {isAdmin ? 'ADMIN' : 'USUARIO'}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="font-terminal hover:text-primary"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button asChild variant="outline" size="sm" className="font-terminal">
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Acceder
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="terminal-focus"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background-secondary border border-primary/30 rounded-sm mt-2 p-4 terminal-border animate-slide-up">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-muted-foreground hover:text-primary transition-all duration-300 font-terminal py-2 px-3 rounded-sm hover:bg-primary/10 ${
                    isActive(item.href) ? 'text-primary bg-primary/20' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild variant="terminal" size="sm" className="mt-4 glow-effect">
                <Link to="/app">
                  <Download className="h-4 w-4" />
                  Descargar
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;