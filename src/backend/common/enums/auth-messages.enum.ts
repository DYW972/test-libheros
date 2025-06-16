export enum AuthMessages {
  SIGNUP_SUCCESS = 'Sign up successful',
  SIGNIN_SUCCESS = 'Sign in successful',
  SIGNOUT_SUCCESS = 'Sign out successful',
  REFRESH_SUCCESS = 'Tokens refreshed successfully',
  AUTH_FAILED = 'Authentication failed',
  INVALID_CREDENTIALS = 'Invalid credentials',
  INVALID_REFRESH_TOKEN = AUTH_FAILED,
  USER_NOT_FOUND = INVALID_CREDENTIALS,
}
