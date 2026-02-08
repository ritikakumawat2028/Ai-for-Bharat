import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage, Language } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { Header } from '@/app/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { 
  User, 
  Settings,
  History,
  Bell,
  Languages,
  Moon,
  Sun,
  CheckCircle,
  Clock,
  MessageCircle
} from 'lucide-react';
import { Switch } from '@/app/components/ui/switch';
import { toast } from 'sonner';

export function ProfilePage() {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const activityHistory = [
    {
      id: 1,
      type: 'chat',
      title: 'Asked about PM-KISAN scheme',
      timestamp: '2 hours ago',
      icon: MessageCircle,
    },
    {
      id: 2,
      type: 'study',
      title: 'Completed Mathematics study session',
      timestamp: '1 day ago',
      icon: CheckCircle,
    },
    {
      id: 3,
      type: 'scheme',
      title: 'Checked Ayushman Bharat eligibility',
      timestamp: '2 days ago',
      icon: CheckCircle,
    },
    {
      id: 4,
      type: 'career',
      title: 'Explored Data Analyst career path',
      timestamp: '3 days ago',
      icon: Clock,
    },
  ];

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  ];

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    toast.success(`Language changed to ${languages.find(l => l.code === newLang)?.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            {t('profile')}
          </h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="border-2 lg:col-span-1">
            <CardContent className="pt-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-1">{user?.name || 'User'}</h2>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Badge>Student</Badge>
                <Badge variant="outline">Active Learner</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-gray-600">Schemes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-gray-600">Activities</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-gray-600">Skills</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="account" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('settings')}</span>
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2">
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">Activity</span>
                </TabsTrigger>
              </TabsList>

              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('name')}</Label>
                      <Input id="name" defaultValue={user?.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('email')}</Label>
                      <Input id="email" type="email" defaultValue={user?.email} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="City, State" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input id="occupation" placeholder="e.g., Student, Professional" />
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                {/* Language Settings */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Languages className="w-6 h-6" />
                      Language Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`p-3 rounded-lg border-2 transition-all text-left ${
                            language === lang.code
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-lg">🇮🇳</span>
                            {language === lang.code && (
                              <CheckCircle className="w-4 h-4 text-orange-600" />
                            )}
                          </div>
                          <p className="font-medium text-sm">{lang.nativeName}</p>
                          <p className="text-xs text-gray-600">{lang.name}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Bell className="w-6 h-6" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications about new schemes and opportunities</p>
                      </div>
                      <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Updates</p>
                        <p className="text-sm text-gray-600">Get weekly summary of your activities</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Study Reminders</p>
                        <p className="text-sm text-gray-600">Daily reminders for your study schedule</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                {/* Appearance */}
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Appearance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-sm text-gray-600">Switch to dark theme</p>
                        </div>
                      </div>
                      <Switch
                        checked={darkMode}
                        onCheckedChange={(checked) => {
                          setDarkMode(checked);
                          toast.info('Dark mode coming soon!');
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-xl">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityHistory.map((activity) => {
                        const Icon = activity.icon;
                        return (
                          <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon className="w-5 h-5 text-orange-600" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-gray-600">{activity.timestamp}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Progress Summary */}
                <Card className="border-2 bg-gradient-to-r from-orange-50 to-green-50">
                  <CardHeader>
                    <CardTitle className="text-xl">This Month's Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-orange-600">28h</p>
                        <p className="text-sm text-gray-600">Study Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-green-600">15</p>
                        <p className="text-sm text-gray-600">Activities</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">8</p>
                        <p className="text-sm text-gray-600">Schemes Checked</p>
                      </div>
                      <div className="text-center">
                        <p className="text-3xl font-bold text-purple-600">5</p>
                        <p className="text-sm text-gray-600">Skills Improved</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="border-2 mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => navigate('/chat')}
              >
                <MessageCircle className="w-6 h-6" />
                <span className="text-sm">Chat with AI</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => navigate('/student-support')}
              >
                <CheckCircle className="w-6 h-6" />
                <span className="text-sm">Study Plan</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => navigate('/government-schemes')}
              >
                <History className="w-6 h-6" />
                <span className="text-sm">Explore Schemes</span>
              </Button>
              <Button 
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => navigate('/career-guidance')}
              >
                <Settings className="w-6 h-6" />
                <span className="text-sm">Career Guide</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
