'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { nextStep, resetSteps } from '@/store/stepsSlice';
import Step1 from "@/components/form/login/Step1"
import Step2 from "@/components/form/login/Step2"


const LoginPage = () => {
  const currentStep = useSelector((state: RootState) => state.steps.currentStep);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(resetSteps());
  }, [dispatch]);

  const handleNextStep = () => {
    dispatch(nextStep());
  };


  return (
    <>
      <section className="bg-[#272727] w-full bg-cover bg-center flex-grow flex justify-center items-center">
        {currentStep === 1 && <Step1 onContinue={handleNextStep} />}
        {currentStep === 2 && <Step2 />}
      </section>

    </>
  )
}

export default LoginPage