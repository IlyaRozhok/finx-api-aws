

export const ROUTE_SEGMENTS = {
  AUTH: "auth",
  ONBOARDING: "onboarding",
  EXPENSES: "expenses",
  STATS: "stats",
  DEBTS: "debts",
  INSTALLMENTS: "installments",
  INCOMES: "incomes",
  ACCOUNTS: "accounts",
  TRANSACTIONS: "transactions",
  MONOBANK: "monobank",
  INTEGRATION: "integration",
};

export const ENDPOINTS = {
  AUTH: {
    GOOGLE: "google",
    GOOGLE_CALLBACK: "google/callback",
    ME: "me",
    LOGOUT: "logout",
    CSRF: "csrf",
  },
  ONBOARDING: {
    SUMMARY: "summary",
    CATEGORIES: "categories",
    CURRENCIES: "currencies",
    INCOMES: "incomes",
    EXPENSES: "expenses",
    INSTALLMENTS: "installments",
  },
  STATS: {
    OVERVIEW: "overview",
    INCOMES: "incomes",
  },
  REGULAR_INCOMES: {
    GET: "regular",
    BY_ID: "regular/:id",
    CREATE: "regular/create",
  },
  EVENT_INCOMES: {
    GET: "event",
    BY_ID: "event/:id",
    CREATE: "event/create",
  },
  ACCOUNTS: {
    FIND_ONE: "find-one",
    CREATE: "create",
  },
  TRANSACTIONS: {
    MONTHLY_EXPENSES: "monthly-expenses",
  },
  INTEGRATIONS: {
    FIND_ALL: "find",
    MONOBANK: {
      CLIENT_INFO: "monobank/client-info",
      STATEMENT: "statement",
      CONNECT: "monobank/connect",
    },
  },
  EXTERNAL: {
    MONOBANK: {
      CLIENT_INFO: "https://api.monobank.ua/personal/client-info",
      STATEMENT: "https://api.monobank.ua/personal/statement/",
    },
  },
};
