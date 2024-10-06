import React from 'react';
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";

interface AdditionalInfoProps {
  userInfo: any;
  updateUserInfo: (data: any) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ userInfo, updateUserInfo, nextPage, prevPage }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateUserInfo({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    updateUserInfo({ [name]: value });
  };

  const handleEquipmentChange = (equipment: string) => {
    const updatedEquipment = userInfo.equipment.includes(equipment)
      ? userInfo.equipment.filter((item: string) => item !== equipment)
      : [...userInfo.equipment, equipment];
    updateUserInfo({ equipment: updatedEquipment });
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="activity-level">Activity Level</Label>
          <Select onValueChange={(value) => handleSelectChange('activityLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="very-active">Very Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={userInfo.age}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select onValueChange={(value) => handleSelectChange('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="workout-type">Preferred Workout Type</Label>
          <Select onValueChange={(value) => handleSelectChange('workoutType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select workout type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gym">Gym</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Available Equipment</Label>
          <div className="flex flex-wrap gap-2">
            {['Free Weights', 'Resistance Bands', 'Machines', 'Pull-up Bar', 'None'].map((equipment) => (
              <Button
                key={equipment}
                variant={userInfo.equipment.includes(equipment) ? 'default' : 'outline'}
                onClick={() => handleEquipmentChange(equipment)}
              >
                {equipment}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="experience-level">Experience Level</Label>
          <Select onValueChange={(value) => handleSelectChange('experienceLevel', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="health-conditions">Health Conditions/Injuries</Label>
          <Textarea
            id="health-conditions"
            name="healthConditions"
            value={userInfo.healthConditions}
            onChange={handleInputChange}
            placeholder="Optional: List any health conditions or injuries"
          />
        </div>
        <div>
          <Label htmlFor="sleep-hours">Sleep Hours per Night</Label>
          <Input
            id="sleep-hours"
            name="sleepHours"
            type="number"
            value={userInfo.sleepHours}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-between">
          <Button onClick={prevPage} variant="outline">Previous</Button>
          <Button onClick={nextPage}>Next</Button>
        </div>
      </div>
    </div>
  );
};