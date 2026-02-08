import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { Header } from '@/app/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { 
  BookOpen, 
  Calendar, 
  Heart, 
  MessageCircle, 
  Brain,
  CheckCircle,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';

export function StudentSupport() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = [
    { name: 'Mathematics', icon: '📐', progress: 75, nextTopic: 'Algebra' },
    { name: 'Science', icon: '🔬', progress: 60, nextTopic: 'Physics' },
    { name: 'English', icon: '📚', progress: 85, nextTopic: 'Grammar' },
    { name: 'Social Studies', icon: '🌍', progress: 70, nextTopic: 'Geography' },
  ];

  const studyPlan = [
    { time: '6:00 AM - 7:00 AM', subject: 'Mathematics', topic: 'Practice Problems', completed: true },
    { time: '4:00 PM - 5:00 PM', subject: 'Science', topic: 'Chapter Review', completed: false },
    { time: '7:00 PM - 8:00 PM', subject: 'English', topic: 'Essay Writing', completed: false },
  ];

  const doubts = [
    { id: 1, question: 'How to solve quadratic equations?', subject: 'Mathematics', status: 'answered' },
    { id: 2, question: 'Explain photosynthesis process', subject: 'Science', status: 'pending' },
    { id: 3, question: 'What is past perfect tense?', subject: 'English', status: 'answered' },
  ];

  const mentalWellnessTips = [
    { icon: '🧘', title: 'Take Regular Breaks', description: 'Study for 45 minutes, then take a 10-minute break' },
    { icon: '💧', title: 'Stay Hydrated', description: 'Drink water regularly to keep your mind fresh' },
    { icon: '😴', title: 'Get Enough Sleep', description: 'Aim for 7-8 hours of sleep every night' },
    { icon: '🏃', title: 'Exercise Daily', description: 'Physical activity helps reduce stress and anxiety' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            {t('studentSupport')}
          </h1>
          <p className="text-gray-600">Your personal AI-powered study companion</p>
        </div>

        <Tabs defaultValue="planner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="planner" className="gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">{t('studyPlanner')}</span>
              <span className="sm:hidden">Planner</span>
            </TabsTrigger>
            <TabsTrigger value="doubts" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t('doubtSolving')}</span>
              <span className="sm:hidden">Doubts</span>
            </TabsTrigger>
            <TabsTrigger value="wellness" className="gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">{t('mentalWellness')}</span>
              <span className="sm:hidden">Wellness</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </TabsTrigger>
          </TabsList>

          {/* Study Planner Tab */}
          <TabsContent value="planner" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Today's Study Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {studyPlan.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 ${
                        item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">{item.time}</span>
                        </div>
                        {item.completed && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="font-bold">{item.subject}</p>
                      <p className="text-sm text-gray-600">{item.topic}</p>
                    </div>
                  ))}
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    Create Custom Study Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Subject Progress */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Subject Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{subject.icon}</span>
                          <div>
                            <p className="font-medium">{subject.name}</p>
                            <p className="text-xs text-gray-600">Next: {subject.nextTopic}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-blue-600">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* AI Study Recommendations */}
            <Card className="border-2 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">AI Study Recommendation</h3>
                    <p className="text-gray-700 mb-4">
                      Based on your progress, focus more on Science and Mathematics this week. 
                      Try solving 10 practice problems daily for better understanding.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/chat')}
                    >
                      Ask AI for More Tips
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Doubts Tab */}
          <TabsContent value="doubts" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Ask Your Doubt</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Mathematics, Science, English"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doubt">Your Question</Label>
                    <Input
                      id="doubt"
                      placeholder="Type your doubt here..."
                    />
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    onClick={() => navigate('/chat')}
                  >
                    Ask AI Assistant
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Doubts */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Recent Doubts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {doubts.map((doubt) => (
                  <div key={doubt.id} className="p-4 border-2 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-medium flex-1">{doubt.question}</p>
                      <Badge variant={doubt.status === 'answered' ? 'default' : 'secondary'}>
                        {doubt.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{doubt.subject}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mental Wellness Tab */}
          <TabsContent value="wellness" className="space-y-6">
            <Card className="border-2 bg-gradient-to-r from-pink-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Heart className="w-6 h-6 text-pink-600" />
                  Mental Wellness Check-in
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">How are you feeling today?</p>
                <div className="grid grid-cols-5 gap-3 mb-6">
                  {['😊', '😌', '😐', '😔', '😰'].map((emoji, index) => (
                    <button
                      key={index}
                      className="text-4xl p-4 rounded-lg border-2 hover:bg-white hover:shadow-md transition-all"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                  onClick={() => navigate('/chat')}
                >
                  Talk to AI Mental Health Support
                </Button>
              </CardContent>
            </Card>

            {/* Wellness Tips */}
            <div className="grid md:grid-cols-2 gap-6">
              {mentalWellnessTips.map((tip, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{tip.icon}</span>
                      <div>
                        <h3 className="font-bold mb-2">{tip.title}</h3>
                        <p className="text-sm text-gray-600">{tip.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Motivational Quote */}
            <Card className="border-2 bg-gradient-to-r from-yellow-50 to-orange-50">
              <CardContent className="pt-6">
                <p className="text-lg italic text-center">
                  "Believe you can and you're halfway there."
                </p>
                <p className="text-center text-sm text-gray-600 mt-2">- Theodore Roosevelt</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold mb-1">42</p>
                  <p className="text-sm text-gray-600">Topics Completed</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-3xl font-bold mb-1">28h</p>
                  <p className="text-sm text-gray-600">Study Hours (This Month)</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-3xl font-bold mb-1">+15%</p>
                  <p className="text-sm text-gray-600">Performance Improvement</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">Weekly Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                    const hours = [2, 3, 1.5, 2.5, 3, 1, 0.5][index];
                    const percentage = (hours / 3) * 100;
                    return (
                      <div key={day}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{day}</span>
                          <span className="text-sm text-gray-600">{hours}h</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
