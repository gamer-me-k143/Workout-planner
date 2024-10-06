import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label {...props} className="block mb-1 font-medium text-sm">
      {children}
    </label>
  );
};