import React, { useState } from 'react';
import { BasicInfo } from './components/BasicInfo';
import { AdditionalInfo } from './components/AdditionalInfo';
import { DietPreferences } from './components/DietPreferences';
import { GeneratingPlan } from './components/GeneratingPlan';
import { PlanDisplay } from './components/PlanDisplay';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({
    weight: '',
    height: '',
    fatPercentage: 20,
    bmi: '',
    fitnessGoal: '',
    activityLevel: '',
    age: '',
    gender: '',
    workoutType: '',
    equipment: [] as string[],
    experienceLevel: '',
    healthConditions: '',
    sleepHours: '',
    dietType: '',
    dietStyle: '',
    customDiet: '',
    mealFrequency: '',
    allergies: '',
    budgetPreference: '',
  });
  const [plan, setPlan] = useState<string | null>(null);

  const updateUserInfo = (data: Partial<typeof userInfo>) => {
    setUserInfo((prevData) => ({ ...prevData, ...data }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const generatePlan = async () => {
    setStep(4); // Show loading screen
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD6P_HC2SVWstpLYDl0b18pG9PVnESjy0c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate a personalized fitness and diet plan based on the following user data: ${JSON.stringify(userInfo)}. Please provide the plan in a structured format with clear sections for workout routines and meal plans.`,
            }],
          }],
        }),
      });
      const data = await response.json();
      setPlan(data.candidates[0].content.parts[0].text);
      setStep(5); // Show plan display
    } catch (error) {
      console.error('Error generating plan:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Workout Planner</h1>
        <div className="flex justify-between mb-6">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center ${step === 1 ? 'text-gray-400' : 'text-blue-500 hover:text-blue-600'}`}
          >
            <ArrowLeft className="mr-2" /> Previous
          </button>
          <div className="text-gray-500">Step {step} of 3</div>
          <button
            onClick={handleNext}
            disabled={step === 3}
            className={`flex items-center ${step === 3 ? 'text-gray-400' : 'text-blue-500 hover:text-blue-600'}`}
          >
            Next <ArrowRight className="ml-2" />
          </button>
        </div>
        {step === 1 && <BasicInfo userInfo={userInfo} updateUserInfo={updateUserInfo} nextPage={handleNext} />}
        {step === 2 && <AdditionalInfo userInfo={userInfo} updateUserInfo={updateUserInfo} nextPage={handleNext} prevPage={handleBack} />}
        {step === 3 && <DietPreferences userInfo={userInfo} updateUserInfo={updateUserInfo} prevPage={handleBack} generatePlan={generatePlan} />}
        {step === 4 && <GeneratingPlan />}
        {step === 5 && plan && <PlanDisplay plan={plan} />}
      </div>
    </div>
  );
};

export default App;