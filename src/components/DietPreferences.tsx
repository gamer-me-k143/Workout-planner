import React from 'react';
import { Label } from "./ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";

interface DietPreferencesProps {
  userInfo: any;
  updateUserInfo: (data: any) => void;
  prevPage: () => void;
  generatePlan: () => void;
}

export const DietPreferences: React.FC<DietPreferencesProps> = ({ userInfo, updateUserInfo, prevPage, generatePlan }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateUserInfo({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    updateUserInfo({ [name]: value });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Diet Preferences</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="diet-type">Diet Type</Label>
          <Select onValueChange={(value) => handleSelectChange('dietType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select diet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="pescatarian">Pescatarian</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="diet-style">Diet Style</Label>
          <Select onValueChange={(value) => handleSelectChange('dietStyle', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select diet style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indian">Indian</SelectItem>
              <SelectItem value="mediterranean">Mediterranean</SelectItem>
              <SelectItem value="american">American</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {userInfo.dietStyle === 'custom' && (
          <div>
            <Label htmlFor="custom-diet">Custom Diet Description</Label>
            <Textarea
              id="custom-diet"
              name="customDiet"
              value={userInfo.customDiet}
              onChange={handleInputChange}
              placeholder="Describe your custom diet"
            />
          </div>
        )}
        <div>
          <Label htmlFor="meal-frequency">Meal Frequency</Label>
          <Select onValueChange={(value) => handleSelectChange('mealFrequency', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select meal frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 meals/day</SelectItem>
              <SelectItem value="3">3 meals/day</SelectItem>
              <SelectItem value="4">4 meals/day</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="allergies">Allergies & Dietary Restrictions</Label>
          <Textarea
            id="allergies"
            name="allergies"
            value={userInfo.allergies}
            onChange={handleInputChange}
            placeholder="Optional: List any allergies or dietary restrictions"
          />
        </div>
        <div>
          <Label htmlFor="budget-preference">Budget Preference</Label>
          <Select onValueChange={(value) => handleSelectChange('budgetPreference', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-between">
          <Button onClick={prevPage} variant="outline">Previous</Button>
          <Button onClick={generatePlan}>Generate Plan</Button>
        </div>
      </div>
    </div>
  );
};