import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { Menu, X, GraduationCap, FileText, Briefcase, MessageCircle, User, LogOut, Home } from 'lucide-react';

export function MobileMenu() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: t('dashboard'), path: '/dashboard' },
    { icon: MessageCircle, label: t('aiAssistant'), path: '/chat' },
    { icon: GraduationCap, label: t('studentSupport'), path: '/student-support' },
    { icon: FileText, label: t('govSchemes'), path: '/government-schemes' },
    { icon: Briefcase, label: t('careerGuidance'), path: '/career-guidance' },
    { icon: User, label: t('profile'), path: '/profile' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
              {t('appName')}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-2">
          {isAuthenticated && (
            <>
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.path}
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                );
              })}
              <div className="border-t my-2" />
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-red-600 hover:text-red-700"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                {t('logout')}
              </Button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleNavigation('/login')}
              >
                {t('login')}
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-orange-500 to-green-600"
                onClick={() => handleNavigation('/signup')}
              >
                {t('signup')}
              </Button>
            </>
          )}
        </div>

        {isAuthenticated && user && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-600">{user.email}</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
