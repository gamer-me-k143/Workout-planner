import React from 'react';

export const GeneratingPlan: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-xl font-semibold">Generating your personalized plan...</p>
    </div>
  );
};