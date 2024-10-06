import React from 'react';
import { Button } from "./ui/Button";
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export const PlanDisplay: React.FC<{ plan: string }> = ({ plan }) => {
  const handleDownload = () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: plan.split('\n').map(line => 
          new Paragraph({
            children: [new TextRun(line)]
          })
        )
      }]
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "fitness_and_diet_plan.docx");
    });
  };

  const formatPlan = (planText: string) => {
    return planText.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Personalized Plan</h2>
      
      <div className="mb-6 whitespace-pre-wrap bg-gray-100 p-4 rounded">
        {formatPlan(plan)}
      </div>
      
      <div className="flex justify-center">
        <Button onClick={handleDownload}>Download as Word</Button>
      </div>
    </div>
  );
};