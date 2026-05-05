export function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,})+$/;
    return emailRegex.test(email);
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (error && typeof error === "object" && "message" in error) {
      return String(error.message);
    }
    if (typeof error === "string") {
      return error;
    }
    return "An error occurred";
  }
  