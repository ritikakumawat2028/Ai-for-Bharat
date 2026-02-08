import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { 
  Languages, 
  Wifi, 
  Heart, 
  GraduationCap, 
  Briefcase, 
  FileText,
  ArrowRight,
  Check
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: Languages,
      title: t('multilingualSupport'),
      description: 'Support for Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada and more',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Wifi,
      title: t('lowBandwidth'),
      description: 'Optimized for slow internet connections, accessible even in rural areas',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Heart,
      title: t('freeForAll'),
      description: 'Completely free AI-powered services for every Indian citizen',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  const services = [
    {
      icon: GraduationCap,
      title: t('studentSupport'),
      description: 'AI study planner, doubt solving, and mental wellness support',
      path: '/student-support',
    },
    {
      icon: FileText,
      title: t('govSchemes'),
      description: 'Find and apply for government schemes you are eligible for',
      path: '/government-schemes',
    },
    {
      icon: Briefcase,
      title: t('careerGuidance'),
      description: 'Get personalized career advice, skill recommendations, and job awareness',
      path: '/career-guidance',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                {t('appName')}
              </span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                {t('login')}
              </Button>
              <Button 
                className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
                onClick={() => navigate('/signup')}
              >
                {t('getStarted')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
            <span className="text-orange-600 font-medium">🇮🇳 Made for Bharat</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
            {t('appName')}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('tagline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-lg px-8 py-6"
              onClick={() => navigate('/language')}
            >
              {t('getStarted')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => navigate('/login')}
            >
              {t('login')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AI for Bharat?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive AI-powered solutions designed specifically for Indian citizens
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="border-2 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="pt-6">
                    <Icon className="w-12 h-12 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center text-orange-600 font-medium group-hover:gap-2 transition-all">
                      Learn More 
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-green-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('howItWorks')}</h2>
          <div className="space-y-6">
            {[
              { step: '1', text: 'Select your preferred language from 8+ Indian languages' },
              { step: '2', text: 'Choose the service you need - Student Support, Government Schemes, or Career Guidance' },
              { step: '3', text: 'Interact with AI via text or voice in your language' },
              { step: '4', text: 'Get simplified, actionable guidance instantly' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.step}
                </div>
                <p className="text-lg pt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of Indians already using AI for Bharat to improve their lives
          </p>
          <Button 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6"
            onClick={() => navigate('/language')}
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="text-xl font-bold">{t('appName')}</span>
          </div>
          <p className="text-gray-400 mb-4">Empowering Every Indian with AI</p>
          <p className="text-sm text-gray-500">© 2026 AI for Bharat. Made with ❤️ for India</p>
        </div>
      </footer>
    </div>
  );
}
