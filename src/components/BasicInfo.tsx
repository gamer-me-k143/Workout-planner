import React from 'react';
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/Select";
import { Button } from "./ui/Button";
import { Slider } from "./ui/Slider";

interface BasicInfoProps {
  userInfo: any;
  updateUserInfo: (data: any) => void;
  nextPage: () => void;
}

export const BasicInfo: React.FC<BasicInfoProps> = ({ userInfo, updateUserInfo, nextPage }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateUserInfo({ [name]: value });
  };

  const handleSliderChange = (value: number[]) => {
    updateUserInfo({ fatPercentage: value[0] });
  };

  const calculateBMI = () => {
    if (userInfo.weight && userInfo.height) {
      const weightKg = parseFloat(userInfo.weight);
      const heightM = parseFloat(userInfo.height) / 100;
      const bmi = (weightKg / (heightM * heightM)).toFixed(1);
      updateUserInfo({ bmi });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="weight">Weight (kg)</Label>
        <Input
          id="weight"
          name="weight"
          type="number"
          value={userInfo.weight}
          onChange={handleInputChange}
          onBlur={calculateBMI}
        />
      </div>
      <div>
        <Label htmlFor="height">Height (cm)</Label>
        <Input
          id="height"
          name="height"
          type="number"
          value={userInfo.height}
          onChange={handleInputChange}
          onBlur={calculateBMI}
        />
      </div>
      <div>
        <Label htmlFor="fat-percentage">Fat Percentage</Label>
        <Slider
          id="fat-percentage"
          min={5}
          max={50}
          step={1}
          value={[userInfo.fatPercentage]}
          onValueChange={handleSliderChange}
        />
        <span>{userInfo.fatPercentage}%</span>
      </div>
      <div>
        <Label htmlFor="bmi">BMI</Label>
        <Input
          id="bmi"
          name="bmi"
          type="text"
          value={userInfo.bmi}
          readOnly
        />
      </div>
      <div>
        <Label htmlFor="fitness-goal">Fitness Goal</Label>
        <Select onValueChange={(value) => updateUserInfo({ fitnessGoal: value })} value={userInfo.fitnessGoal}>
          <SelectTrigger>
            <SelectValue placeholder="Select a goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fat-loss">Fat Loss</SelectItem>
            <SelectItem value="weight-loss">Weight Loss</SelectItem>
            <SelectItem value="weight-gain">Weight Gain</SelectItem>
            <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
            <SelectItem value="overall-fitness">Overall Fitness</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={nextPage} className="w-full">Next</Button>
    </div>
  );
};