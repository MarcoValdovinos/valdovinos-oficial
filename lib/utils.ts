import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
/**
*/
* Motor de Composición Dinámica OMEGA-Q
* Garantiza la integridad visual de la interfaz de auditoría.
export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs))
}