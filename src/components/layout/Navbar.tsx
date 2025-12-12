import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/exam', label: t('nav.exam') },
    { href: '/seminar', label: t('nav.seminar') },
    { href: '/events', label: t('nav.events') },
    { href: '/committee', label: t('nav.committee') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
              <span className="text-lg font-serif font-bold text-primary">A</span>
            </div>
            <span className="font-serif font-bold text-lg text-foreground hidden sm:block">
              AUSDAV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-secondary bg-primary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Donate Button */}
            <Button asChild variant="donate" size="sm" className="hidden sm:flex">
              <Link to="/donate">
                <Heart className="w-4 h-4 mr-1" />
                {t('nav.donate')}
              </Link>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground/70 hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/70 hover:text-foreground gap-1"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase">
                    {language === 'en' ? 'EN' : 'TA'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setLanguage('en')}
                  className={cn(language === 'en' && "bg-muted")}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage('ta')}
                  className={cn(language === 'ta' && "bg-muted", "font-tamil")}
                >
                  தமிழ்
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-secondary bg-primary/10"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-border">
                <Button asChild variant="donate" size="sm" className="w-full">
                  <Link to="/donate" onClick={() => setIsOpen(false)}>
                    <Heart className="w-4 h-4 mr-1" />
                    {t('nav.donate')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
