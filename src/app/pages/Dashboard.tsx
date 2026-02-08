import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { Header } from '@/app/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { 
  GraduationCap, 
  FileText, 
  Briefcase, 
  MessageCircle,
  TrendingUp,
  BookOpen,
  Heart,
  Target,
  ArrowRight
} from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';

export function Dashboard() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const services = [
    {
      icon: GraduationCap,
      title: t('studentSupport'),
      description: 'Study planner, doubt solving, mental wellness',
      path: '/student-support',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: FileText,
      title: t('govSchemes'),
      description: 'Find schemes you are eligible for',
      path: '/government-schemes',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Briefcase,
      title: t('careerGuidance'),
      description: 'Skills, resume, jobs & internships',
      path: '/career-guidance',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MessageCircle,
      title: t('aiAssistant'),
      description: 'Chat with AI in your language',
      path: '/chat',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const recentActivity = [
    { icon: BookOpen, text: 'Completed AI Study Session', time: '2 hours ago' },
    { icon: FileText, text: 'Checked PM-KISAN Scheme', time: '1 day ago' },
    { icon: Target, text: 'Updated Career Goals', time: '3 days ago' },
  ];

  const stats = [
    { label: 'Study Hours', value: '12', icon: GraduationCap, change: '+3 this week' },
    { label: 'Schemes Explored', value: '8', icon: FileText, change: '2 eligible' },
    { label: 'Skills Learned', value: '5', icon: TrendingUp, change: 'Keep going!' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t('welcome')}, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600">
            Your journey to better education, opportunities, and growth continues here
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-green-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index} 
                  className="border-2 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1"
                  onClick={() => navigate(service.path)}
                >
                  <CardContent className="pt-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center text-orange-600 text-sm font-medium group-hover:gap-2 transition-all">
                      Open
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.text}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Learning Progress */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-xl">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Mathematics</span>
                  <span className="text-sm text-gray-600">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Science</span>
                  <span className="text-sm text-gray-600">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">English</span>
                  <span className="text-sm text-gray-600">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
                onClick={() => navigate('/student-support')}
              >
                Continue Learning
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Daily Motivation */}
        <Card className="mt-6 border-2 bg-gradient-to-r from-orange-50 to-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Daily Motivation</h3>
                <p className="text-gray-700">
                  "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
