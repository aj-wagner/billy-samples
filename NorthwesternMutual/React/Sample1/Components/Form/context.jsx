import React, { createContext, useContext } from 'react';

const FormContext = createContext();

const FormProvider = ({
  children,
  formBuilderData,
  fieldNames,
  addElement,
  deleteElement,
  updateElements,
}) => {
  return (
    <FormContext.Provider
      value={{
        formBuilderData,
        fieldNames,
        addElement,
        deleteElement,
        updateElements,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  return useContext(FormContext);
};

export { FormProvider, FormContext, useFormContext };
