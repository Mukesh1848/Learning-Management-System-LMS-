export enum FieldKey {
  EMAIL = "email",
  PASSWORD = "password",
  NAME = "name",
}

export const EMAIL_REGEXP = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
export const WHITE_SPACE_PASSWORD_REGEXP = new RegExp("\\s");

export const VALIDATE_FIELD_KEY_MAP = {
  [FieldKey.NAME]: (name: string): string | undefined => {
    if (name.trim().length < 3) {
      return "Please enter a valid name.";
    }
  },

  [FieldKey.EMAIL]: (email: string): string | undefined => {
    const isEmailValid = EMAIL_REGEXP.test(email);
    return isEmailValid ? undefined : "Please enter a valid email address.";
  },

  [FieldKey.PASSWORD]: (password: string): string | undefined => {
    const isPasswordValid = password.length > 7;
    const containsWhitespace = WHITE_SPACE_PASSWORD_REGEXP.test(password);

    if (containsWhitespace) {
      return "Password should not contain any whitespace.";
    }

    return isPasswordValid
      ? undefined
      : "For enhanced security, your password should be a minimum of 8 characters in length.";
  },
};
