import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EmployeesType } from "../types";
import { employees as defaultEmployees } from "../data/employees";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCustomDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Les mois sont indexés à partir de 0, donc on ajoute 1
  const year = date.getFullYear() % 100; // Obtenez les deux derniers chiffres de l'année

  // Formater la date
  return `${day}/${month}/${year}`;
}

export const defaultEmployeesValue = (): EmployeesType => {
  const storedEmployees = localStorage.getItem("employees");
  return storedEmployees ? JSON.parse(storedEmployees) : defaultEmployees;
};
