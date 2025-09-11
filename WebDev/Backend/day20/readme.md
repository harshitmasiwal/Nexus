🔑 Access Token

Format: header.payload.signature → JWT (JSON Web Token).

Contains:

Header → metadata (e.g., algorithm, type).

Payload → claims like userId, roles, exp (expiry time).

Signature → created using server’s secret/private key to ensure integrity.

Expiry: short-lived (e.g., 15–30 min).

Purpose: Authentication on each request (sent via headers like Authorization: Bearer <token>).

Validation: The server verifies the signature using its secret/private key → if valid and not expired, request is allowed.

✅ What you said is correct about the access token.



🔑 Refresh Token

Usually a long random string (not JWT, but can be JWT in some designs).

Expiry: long-lived (e.g., 7 days, 30 days, or more).

Purpose: Used only to get a new access token after it expires.

Storage:

On server side → often stored in DB/Redis with fields like {userId, expiryDate, isRevoked}.

On client side → stored securely (e.g., HTTP-only cookie or secure local storage).

Validation:

When a client sends the refresh token, the server checks if it exists in DB, is not expired, and not revoked.

Some servers hash refresh tokens before saving them (just like passwords), so even if DB leaks, real tokens are not exposed.

🔁 Refresh Workflow

User logs in → gets Access Token (30 min) + Refresh Token (7 days).

User makes requests → sends access token.

After 30 min → access token expires.

Client silently sends refresh token to server → server verifies and issues a new access token.

Optionally, server may also rotate refresh tokens:

Old refresh token is invalidated.

New refresh token is sent back (this prevents reuse if someone steals it).

❌ Correction in your explanation

You wrote:

"the refresh token is hashed if anyone sends the same refresh token he will be validated using the digital signature"
This is not accurate.

🔹 Access token uses digital signature verification (JWT signing).
🔹 Refresh token does not use digital signature — instead, it is validated by checking server-side storage (DB/Redis).

So, the refresh token is just a random opaque string, and its validation is purely lookup-based (server compares the incoming token with hashed value in DB).

📌 Summary

Access Token (JWT) → short-lived, self-contained, verified via digital signature.

Refresh Token (Opaque string) → long-lived, server-stored, verified by lookup (and optionally hashed).

Expiry times: Access Token = 30 min, Refresh Token = 7 days (your values are fine).

Rotation & Revocation: Refresh tokens can be rotated on every use and revoked if stolen.



