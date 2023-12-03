export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function isValidPhoneNumber(phone) {
    const regex = /^(0|\+90)?(\s*[-]\s*)?(([1-9]\d{2}\s*)?\d{3}\s*)?\d{2}\s*\d{2}$/;
    return regex.test(phone);
  }