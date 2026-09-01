// ADDITION beyond the requested enums/ list — needed to type `payment_mode`
// on the transactions table. Mirrors the Postgres `payment_mode_enum` type 1:1.
export enum PaymentMode {
  NFC = "NFC",
  USSD = "USSD",
  MOBILE_APP = "MOBILE_APP",
  WEB = "WEB",
  AGENT = "AGENT"
}
