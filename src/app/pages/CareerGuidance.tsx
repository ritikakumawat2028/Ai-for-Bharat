import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { Header } from '@/app/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Progress } from '@/app/components/ui/progress';
import { 
  Briefcase, 
  Target,
  TrendingUp,
  FileText,
  Users,
  Award,
  BookOpen,
  Lightbulb,
  CheckCircle,
  ExternalLink,
  Clock  // Add Clock import
} from 'lucide-react';

export function CareerGuidance() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const skillAssessment = [
    { skill: 'Communication', level: 75, category: 'Soft Skills' },
    { skill: 'Problem Solving', level: 65, category: 'Soft Skills' },
    { skill: 'Programming', level: 50, category: 'Technical' },
    { skill: 'Data Analysis', level: 40, category: 'Technical' },
    { skill: 'Leadership', level: 55, category: 'Soft Skills' },
  ];

  const recommendedCourses = [
    {
      title: 'Full Stack Web Development',
      provider: 'Coursera',
      duration: '6 months',
      level: 'Beginner',
      price: 'Free (with certificate option)',
      rating: 4.8,
    },
    {
      title: 'Data Science with Python',
      provider: 'edX',
      duration: '4 months',
      level: 'Intermediate',
      price: 'Free (with certificate option)',
      rating: 4.7,
    },
    {
      title: 'Digital Marketing',
      provider: 'Google Digital Garage',
      duration: '3 months',
      level: 'Beginner',
      price: 'Free',
      rating: 4.6,
    },
  ];

  const careerPaths = [
    {
      title: 'Software Developer',
      growth: '+22%',
      salary: '₹5-15 LPA',
      skills: ['Programming', 'Problem Solving', 'Teamwork'],
      demand: 'High',
    },
    {
      title: 'Data Analyst',
      growth: '+28%',
      salary: '₹4-10 LPA',
      skills: ['Data Analysis', 'Excel', 'SQL'],
      demand: 'Very High',
    },
    {
      title: 'Digital Marketing Specialist',
      growth: '+18%',
      salary: '₹3-8 LPA',
      skills: ['Marketing', 'Social Media', 'Analytics'],
      demand: 'High',
    },
  ];

  const jobOpportunities = [
    {
      title: 'Frontend Developer Intern',
      company: 'Tech Startup India',
      location: 'Remote',
      type: 'Internship',
      stipend: '₹10,000/month',
    },
    {
      title: 'Data Entry Operator',
      company: 'Government Portal',
      location: 'Delhi',
      type: 'Full-time',
      salary: '₹3-4 LPA',
    },
    {
      title: 'Content Writer',
      company: 'Digital Agency',
      location: 'Bangalore',
      type: 'Part-time',
      salary: '₹15,000/month',
    },
  ];

  const resumeTips = [
    {
      icon: '📝',
      title: 'Keep it concise',
      description: '1-2 pages maximum, highlight key achievements',
    },
    {
      icon: '🎯',
      title: 'Use action verbs',
      description: 'Start bullet points with strong action words',
    },
    {
      icon: '📊',
      title: 'Quantify achievements',
      description: 'Use numbers and metrics to show impact',
    },
    {
      icon: '✅',
      title: 'Proofread carefully',
      description: 'No spelling or grammar errors',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            {t('careerGuidance')}
          </h1>
          <p className="text-gray-600">Discover your potential and build your future career</p>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="skills" className="gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="careers" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Career Paths</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Jobs</span>
            </TabsTrigger>
          </TabsList>

          {/* Skills Assessment */}
          <TabsContent value="skills" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-600" />
                  Your Skill Assessment
                </CardTitle>
                <p className="text-sm text-gray-600">Based on your profile and activities</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillAssessment.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{skill.skill}</p>
                        <p className="text-xs text-gray-600">{skill.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-purple-600">{skill.level}%</span>
                        <Badge variant={skill.level >= 70 ? 'default' : 'secondary'} className="text-xs">
                          {skill.level >= 70 ? 'Strong' : skill.level >= 50 ? 'Good' : 'Developing'}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skill Recommendations */}
            <Card className="border-2 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">AI Skill Recommendations</h3>
                    <p className="text-gray-700 mb-4">
                      To advance your career, consider developing these skills:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Cloud Computing', 'Machine Learning', 'UI/UX Design', 'Project Management'].map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/chat')}
                    >
                      Get Personalized Recommendations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resume Tips */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                {t('resumeTips')}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {resumeTips.map((tip, index) => (
                  <Card key={index} className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{tip.icon}</span>
                        <div>
                          <h4 className="font-bold mb-1">{tip.title}</h4>
                          <p className="text-sm text-gray-600">{tip.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                onClick={() => navigate('/chat')}
              >
                Get AI Resume Review
              </Button>
            </div>
          </TabsContent>

          {/* Recommended Courses */}
          <TabsContent value="courses" className="space-y-6">
            <Card className="border-2 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Personalized Course Recommendations</h3>
                    <p className="text-gray-700">
                      Based on your skills and career goals, here are courses that can help you grow
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedCourses.map((course, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{course.provider}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-gray-600" />
                      <span>{course.price}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span>{course.rating}/5.0</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Course
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <h3 className="font-bold mb-2">Looking for more courses?</h3>
                <p className="text-gray-600 mb-4">Tell us about your interests and we'll find the perfect courses for you</p>
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  onClick={() => navigate('/chat')}
                >
                  Get Course Recommendations
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Career Paths */}
          <TabsContent value="careers" className="space-y-6">
            <Card className="border-2 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">High-Demand Career Paths in India</h3>
                    <p className="text-gray-700">
                      Explore careers with strong growth potential and competitive salaries
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.map((career, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{career.title}</CardTitle>
                      <Badge 
                        variant={career.demand === 'Very High' ? 'default' : 'secondary'}
                        className={career.demand === 'Very High' ? 'bg-green-600' : ''}
                      >
                        {career.demand}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Growth</p>
                        <p className="font-bold text-green-600">{career.growth}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Salary Range</p>
                        <p className="font-bold">{career.salary}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      variant="outline"
                      onClick={() => navigate('/chat')}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2">
              <CardContent className="pt-6 text-center">
                <h3 className="font-bold mb-2">Not sure which career is right for you?</h3>
                <p className="text-gray-600 mb-4">Take our AI-powered career assessment to find your ideal path</p>
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  onClick={() => navigate('/chat')}
                >
                  Start Career Assessment
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Opportunities */}
          <TabsContent value="jobs" className="space-y-6">
            <Card className="border-2 bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{t('jobAwareness')}</h3>
                    <p className="text-gray-700">
                      Current job and internship opportunities matching your profile
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {jobOpportunities.map((job, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{job.title}</h3>
                            <p className="text-gray-600">{job.company}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Badge variant="outline">{job.type}</Badge>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            📍 {job.location}
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            💰 {job.stipend || job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        <Button className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700">
                          Apply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Users className="w-10 h-10 text-purple-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">Need Interview Preparation Help?</h3>
                    <p className="text-gray-700 mb-4">
                      Our AI can help you prepare for interviews with common questions, tips, and mock interviews
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/chat')}
                    >
                      Start Interview Prep
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}