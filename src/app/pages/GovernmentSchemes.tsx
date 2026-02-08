import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { Header } from '@/app/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { SchemeDetailModal } from '@/app/components/SchemeDetailModal';
import { EligibilityResultModal } from '@/app/components/EligibilityResultModal';
import { governmentSchemes, GovernmentScheme } from '@/app/data/governmentSchemes';
import { 
  FileText, 
  Search,
  CheckCircle,
  TrendingUp,
  Users,
  Heart,
  Home,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Building
} from 'lucide-react';

export function GovernmentSchemes() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEligibilityResultOpen, setIsEligibilityResultOpen] = useState(false);
  
  // Eligibility checker form
  const [occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState('');

  const categories = [
    { id: 'all', name: 'All Schemes', icon: FileText },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'agriculture', name: 'Agriculture', icon: TrendingUp },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'housing', name: 'Housing', icon: Home },
    { id: 'employment', name: 'Employment', icon: Users },
    { id: 'social_security', name: 'Social Security', icon: Building },
  ];

  const filteredSchemes = governmentSchemes.filter((scheme) => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && scheme.isActive;
  });

  const eligibleSchemes = governmentSchemes.filter(s => s.eligible && s.isActive);
  const savedSchemes = governmentSchemes.slice(0, 2);

  const handleViewDetails = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    setIsDetailModalOpen(true);
  };

  const handleCheckEligibility = () => {
    if (!occupation || !income || !age) {
      alert('Please fill in all required fields');
      return;
    }

    // Simple eligibility logic based on income and occupation
    const incomeNum = parseInt(income);
    const ageNum = parseInt(age);
    
    const eligible: GovernmentScheme[] = [];
    const ineligible: GovernmentScheme[] = [];

    governmentSchemes.forEach(scheme => {
      let isEligible = false;

      // Education schemes
      if (scheme.category === 'education' && (occupation === 'student' || occupation === 'unemployed')) {
        isEligible = incomeNum < 600000; // < 6 lakhs
      }
      // Health schemes
      else if (scheme.category === 'health') {
        isEligible = incomeNum < 500000; // < 5 lakhs
      }
      // Agriculture schemes
      else if (scheme.category === 'agriculture' && occupation === 'farmer') {
        isEligible = true;
      }
      // Business schemes
      else if (scheme.category === 'business' && (occupation === 'self-employed' || occupation === 'business')) {
        isEligible = true;
      }
      // Employment/skill schemes
      else if (scheme.category === 'employment' && ageNum >= 15 && ageNum <= 45) {
        isEligible = true;
      }
      // Social security
      else if (scheme.category === 'social_security' && ageNum >= 18 && ageNum <= 40) {
        isEligible = incomeNum < 1000000;
      }

      if (isEligible) {
        eligible.push(scheme);
      } else {
        ineligible.push(scheme);
      }
    });

    setSelectedScheme(null);
    setIsEligibilityResultOpen(true);
    // Store results for the modal
    (window as any).eligibilityResults = { eligible, ineligible };
  };

  const eligibilityResults = (window as any).eligibilityResults || { eligible: [], ineligible: [] };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            {t('govSchemes')}
          </h1>
          <p className="text-gray-600">Discover {governmentSchemes.filter(s => s.isActive).length} active government schemes you are eligible for</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Eligible Schemes</p>
                  <p className="text-3xl font-bold text-green-600">{eligibleSchemes.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Schemes</p>
                  <p className="text-3xl font-bold">{governmentSchemes.filter(s => s.isActive).length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Saved Schemes</p>
                  <p className="text-3xl font-bold">{savedSchemes.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Schemes</TabsTrigger>
            <TabsTrigger value="eligible">Eligible for You</TabsTrigger>
            <TabsTrigger value="checker">Eligibility Checker</TabsTrigger>
          </TabsList>

          {/* Browse Schemes */}
          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter */}
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Search schemes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Button
                          key={cat.id}
                          variant={selectedCategory === cat.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedCategory(cat.id)}
                          className="gap-2"
                        >
                          <Icon className="w-4 h-4" />
                          {cat.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Schemes List */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme) => {
                const categoryIcon = categories.find(c => c.id === scheme.category)?.icon || FileText;
                const Icon = categoryIcon;
                return (
                  <Card key={scheme.id} className="border-2 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-base leading-tight">{scheme.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {scheme.category}
                            </Badge>
                          </div>
                        </div>
                        {scheme.eligible && (
                          <Badge className="bg-green-600 flex-shrink-0">Eligible</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">{scheme.description}</p>
                      
                      <div className="bg-green-50 border border-green-200 rounded p-2">
                        <p className="text-xs font-medium text-green-800">
                          <strong>Benefits:</strong> {scheme.benefits}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          onClick={() => handleViewDetails(scheme)}
                        >
                          {t('viewDetails')}
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(scheme.officialLink, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Eligible Schemes */}
          <TabsContent value="eligible" className="space-y-6">
            <Card className="border-2 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">You are eligible for {eligibleSchemes.length} schemes!</h3>
                    <p className="text-gray-700">
                      Based on your profile, we've identified schemes that you can apply for right away.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {eligibleSchemes.map((scheme) => {
                const categoryIcon = categories.find(c => c.id === scheme.category)?.icon || FileText;
                const Icon = categoryIcon;
                return (
                  <Card key={scheme.id} className="border-2 border-green-200 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-green-600" />
                          </div>
                          <CardTitle className="text-base leading-tight">{scheme.name}</CardTitle>
                        </div>
                        <Badge className="bg-green-600">✓ Eligible</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700">{scheme.description}</p>
                      <div className="bg-green-50 border border-green-200 rounded p-2">
                        <p className="text-xs font-medium text-green-800">
                          <strong>Benefits:</strong> {scheme.benefits}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                          onClick={() => handleViewDetails(scheme)}
                        >
                          Learn How to Apply
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(scheme.officialLink, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Eligibility Checker */}
          <TabsContent value="checker" className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-xl">{t('checkEligibility')}</CardTitle>
                <p className="text-sm text-gray-600">Answer a few questions to find schemes you're eligible for</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Your Occupation *</Label>
                  <Select value={occupation} onValueChange={setOccupation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="farmer">Farmer</SelectItem>
                      <SelectItem value="business">Business Owner</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="salaried">Salaried Employee</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Family Income (₹) *</Label>
                  <Input 
                    id="income" 
                    type="number" 
                    placeholder="e.g., 300000" 
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Your Age *</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    placeholder="e.g., 25" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    placeholder="e.g., Maharashtra, Tamil Nadu" 
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select if applicable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                      <SelectItem value="st">ST</SelectItem>
                      <SelectItem value="obc">OBC</SelectItem>
                      <SelectItem value="minority">Minority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  onClick={handleCheckEligibility}
                >
                  Check Eligibility
                </Button>
              </CardContent>
            </Card>

            {/* AI Assistant Card */}
            <Card className="border-2 bg-gradient-to-r from-orange-50 to-green-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Need Help?</h3>
                    <p className="text-gray-700 mb-4">
                      Our AI assistant can explain any government scheme in simple language and guide you through the application process.
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => navigate('/chat')}
                    >
                      Chat with AI Assistant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals */}
      <SchemeDetailModal
        scheme={selectedScheme}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <EligibilityResultModal
        eligibleSchemes={eligibilityResults.eligible}
        ineligibleSchemes={eligibilityResults.ineligible}
        isOpen={isEligibilityResultOpen}
        onClose={() => setIsEligibilityResultOpen(false)}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}
