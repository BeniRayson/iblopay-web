// Mirrors the Postgres `card_status_enum` type 1:1.
// Keep these two in sync — if a value is added/removed in SQL, update here too.
export enum CardStatus {
  NEUTRAL = 'NEUTRAL',   // provisioned, never activated
  ACTIVE = 'ACTIVE',     // in use
  BLOCKED = 'BLOCKED',   // temporarily disabled by user/admin
  REPLACED = 'REPLACED', // superseded by a newer card (see old_card_id)
  CLOSED = 'CLOSED',     // permanently retired
  SUSPENDED = 'SUSPENDED'
}
