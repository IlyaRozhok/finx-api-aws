export enum ENVIROMENT {
  PROD = "production",
  TEST = "test",
  DEVELOPMENT = "development",
}

export enum AccountType {
  CARD = "card",
  CASH = "cash",
  WALLET = "wallet",
}

export enum AccountAssetType {
  FIAT = "fiat",
  CRYPTO = "crypto"
}


export enum AccountProvider {
  MANUAL = "manual",
  MONOBANK = "monobank",
  BINANCE = "binance"
}

export enum UserIntegrationsProvider {
  MONOBANK = "monobank",
  PRIVAT_BANK = "privat_bank",
  REVOLUT = "revolut",
  BINANCE = "binance",
  BYBIT = "bybit",
}

export enum Status {
  ACTIVE = "active",
  DISABLED = "disabled",
  ARCHIVED = "archived"
}