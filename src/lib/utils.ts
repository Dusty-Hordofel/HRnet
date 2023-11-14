import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCustomDate = (dateString: string) => {
  const originalDate = new Date(dateString);

  // Obtenir les composants de date
  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1; // Les mois sont indexés à partir de 0
  const year = originalDate.getFullYear() % 100; // Obtenir les deux derniers chiffres de l'année

  // Format la date
  return `${day}/${month}/${year}`;
};
