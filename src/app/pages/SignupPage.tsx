import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLanguage } from '@/app/context/LanguageContext';
import { useAuth } from '@/app/context/AuthContext';
import { useUserData } from '@/app/context/UserDataContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { toast } from 'sonner';

export function SignupPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { signup } = useAuth();
  const { setStudentProfile } = useUserData();
  
  // Personal Details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  
  // Education Details
  const [currentLevel, setCurrentLevel] = useState('');
  const [institution, setInstitution] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [grade, setGrade] = useState('');
  
  // Address
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  
  // Interests
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!name || !email || !password) {
        toast.error('Please fill in all required fields');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!currentLevel || !institution) {
        toast.error('Please fill in your education details');
        return;
      }
      setStep(3);
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      
      // Save student profile
      setStudentProfile({
        name,
        email,
        phone,
        dateOfBirth,
        gender,
        education: {
          currentLevel,
          institution,
          fieldOfStudy,
          yearOfStudy,
          grade,
        },
        address: {
          city,
          state,
          pincode,
        },
        interests: interests.split(',').map(i => i.trim()).filter(Boolean),
        goals: goals.split(',').map(g => g.trim()).filter(Boolean),
      });
      
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl border-2 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-3xl">AI</span>
            </div>
          </div>
          <CardTitle className="text-2xl">{t('signup')}</CardTitle>
          <p className="text-gray-600 text-sm mt-2">Step {step} of 3: {
            step === 1 ? 'Personal Details' : 
            step === 2 ? 'Education Details' : 
            'Interests & Goals'
          }</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">{t('name')} *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')} *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="currentLevel">Current Education Level *</Label>
                  <Select value={currentLevel} onValueChange={setCurrentLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th">10th Grade</SelectItem>
                      <SelectItem value="12th">12th Grade</SelectItem>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">School/College Name *</Label>
                  <Input
                    id="institution"
                    type="text"
                    placeholder="Name of your institution"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fieldOfStudy">Field of Study</Label>
                    <Input
                      id="fieldOfStudy"
                      type="text"
                      placeholder="e.g., Science, Commerce, Arts"
                      value={fieldOfStudy}
                      onChange={(e) => setFieldOfStudy(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearOfStudy">Year of Study</Label>
                    <Input
                      id="yearOfStudy"
                      type="text"
                      placeholder="e.g., 1st Year, 2nd Year"
                      value={yearOfStudy}
                      onChange={(e) => setYearOfStudy(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Current Grade/CGPA</Label>
                  <Input
                    id="grade"
                    type="text"
                    placeholder="e.g., 85%, 8.5 CGPA"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="Your city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="Your state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      type="text"
                      placeholder="6-digit code"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="interests">Your Interests</Label>
                  <Input
                    id="interests"
                    type="text"
                    placeholder="e.g., Mathematics, Programming, Arts (comma-separated)"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Enter interests separated by commas</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals">Your Goals</Label>
                  <Input
                    id="goals"
                    type="text"
                    placeholder="e.g., Engineering, Medical, IAS (comma-separated)"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                  />
                  <p className="text-xs text-gray-500">Enter career goals separated by commas</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">Almost Done!</h3>
                  <p className="text-sm text-blue-700">
                    This information helps us personalize your experience with AI-powered study plans,
                    relevant government schemes, and career recommendations tailored just for you.
                  </p>
                </div>
              </>
            )}

            <div className="flex gap-3">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700"
                disabled={loading}
              >
                {loading ? t('loading') : step < 3 ? 'Continue' : t('signup')}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {t('alreadyHaveAccount')}{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-orange-600 hover:underline font-medium"
              >
                {t('login')}
              </button>
            </p>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Home
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
