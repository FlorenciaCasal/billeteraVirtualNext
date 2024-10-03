import React from 'react';

interface InputProps {
    newType: string;
    newPlaceholder: string;
    register: any;
    errors: any;
    fieldName: string;
    className?: string;
    autoFocus?: boolean;
  }

const Input: React.FC<InputProps> = ({ newType, newPlaceholder, register, errors, fieldName, className, autoFocus = false }) => {
  return (
    <span className= "flex flex-col h-22">
      <input
        className= {`w-full h-12 mb-1 px-4 text-black border border-gray-500 rounded-lg focus:outline-none ${className || ''}`}
        type={newType}
        placeholder={`${newPlaceholder}*`}
        {...register(fieldName)}
        autoFocus={autoFocus}
      />
      <p className={`text-msj italic font-sans text-center text-error ${errors[fieldName] ? 'block' : 'invisible'}`}>
        {errors[fieldName]?.message || 'Placeholder'}
      </p>
    </span>
  );
};

export default Input;