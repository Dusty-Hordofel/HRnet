import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { EmployeeType, EmployeesType } from '../types';
import { defaultEmployeesValue } from '../lib/utils';

type EmployeesContextProps = {
  employees: EmployeesType;
  addEmployee: (newEmployee: EmployeeType) => void;
};

export const EmployeesContext = createContext<EmployeesContextProps>({
  employees: [],
  addEmployee: () => {
    // Empty function
  },
});

export const EmployeesProvider = ({ children }: PropsWithChildren) => {

  const [employees, setEmployees] = useState<EmployeesType>(defaultEmployeesValue);

  // Backup data in local storage whenever employees change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
    // console.log("🚀 ~ file: EmployeesContext.tsx:34 ~ addEmployee localStorage~ employees:", employees);
  }, [employees]);

  const addEmployee = (newEmployee: EmployeeType) => {
    setEmployees([...employees, newEmployee]);
    // console.log("🚀 ~ file: EmployeesContext.tsx:38 ~ addEmployee ~ employees:", employees);
  };

  return (
    <EmployeesContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeesContext.Provider>
  );
};

// Custom hook to access the employees context
export const useEmployeesContext = (): EmployeesContextProps => {
  const context = useContext(EmployeesContext);

  if (!context) {
    throw new Error(
      'useEmployeesContext must be used inside the EmployeesProvider'
    );
  }

  return context;
};
