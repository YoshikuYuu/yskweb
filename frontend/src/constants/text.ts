const TEXT = {
  // Application-wide titles/messages
  APP: {
    TITLE: "YSKWeb",
    MY_NAME: "Joseph Yu",
    WELCOME_MESSAGE: "Welcome.",
  },

  // Button labels
  BUTTONS: {
    SUBMIT: "Submit",
    CANCEL: "Cancel",
    SAVE: "Save Changes",
  },

  // Common messages (errors, success, etc.)
  MESSAGES: {
    LOGIN_SUCCESS: "You have been successfully logged in.",
    LOGIN_FAILED: "Login failed. Please check your credentials and try again.",
    DATA_SAVED: "Your data has been saved!",
    // Use functions for dynamic values (interpolation)
    GREETING: (name: string): string => `Hello, ${name}!`,
    ITEM_COUNT: (count: number): string => `You have ${count} item${count === 1 ? '' : 's'}.`,
  },

  // Add more categories as needed (e.g., 'FORMS', 'NAV_MENU', 'FOOTER')
  NAV_MENU: {
    HOME: "Home",
    PROFILE: "Profile",
    SETTINGS: "Settings",
  },
} as const; // This 'as const' assertion makes the object deeply read-only and provides strong type inference.

export default TEXT;