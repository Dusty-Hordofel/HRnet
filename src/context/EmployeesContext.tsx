import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { EmployeeType, EmployeesType } from '../types';
import { employees as defaultEmployees } from '../data/employees';


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
  const [employees, setEmployees] = useState<EmployeesType>(defaultEmployees);

  console.log("🚀 ~ file: EmployeesContext.tsx:20 ~ EmployeesProvider ~ defaultEmployees:", defaultEmployees)

  // Load data from local storage during component assembly
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  // Backup data in local storage whenever employees change
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (newEmployee: EmployeeType) => {
    setEmployees([...employees, newEmployee]);
  };

  return (
    <EmployeesContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeesContext.Provider>
  );
};

//custom hook to access the employees context
export const useEmployeesContext = (): EmployeesContextProps => {
  const context = useContext(EmployeesContext);

  if (!context) {
    throw new Error(
      'useEmployeesContext must be used inside the EmployeesProvider'
    );
  }

  return context;
};
