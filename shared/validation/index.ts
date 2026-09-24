/**
 * Shared input validation helpers for Aratha platform.
 */

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Phone optional in many forms
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  return phoneRegex.test(phone.trim());
}

export function validateLeadInput(data: {
  type: string;
  email: string;
  name?: string;
  phone?: string;
  message?: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = "Please provide a valid email address.";
  }

  if (data.type === 'contact' && (!data.name || data.name.trim().length < 2)) {
    errors.name = "Name must be at least 2 characters long.";
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
