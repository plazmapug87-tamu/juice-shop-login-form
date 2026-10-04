# Secure Login Form (Juice Shop Security Homework)

A simple HTML/JavaScript login form, inspired by OWASP Juice Shop's login page,
built to demonstrate basic **client-side and server-side input validation**
as part of a web security course assignment.

## What this project does

- Renders an email + password login form.
- **Client-side validation** (in `script.js`) blocks empty submissions and
  checks that the email contains `@` and the password is at least 8
  characters before anything is sent anywhere.
- **Server-side validation** (in `server.js`, an Express backend) independently
  re-checks the same rules. This matters because client-side JavaScript can
  always be bypassed (disabled in the browser, or the attacker just sends a
  raw HTTP request directly to the server with dev tools / curl / Postman) —
  so the server must never trust the client and must validate everything
  again itself.
- This project does **not** implement real authentication (no database, no
  real accounts) — it's a validation demo only, built for a security
  coursework assignment.

## How to run it

1. Clone this repo:
   ```bash
   git clone https://github.com/YOUR-USERNAME/juice-shop-login-form.git
   cd juice-shop-login-form
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser to:
   ```
   http://localhost:3000
   ```

5. Try logging in with:
   - An empty field → client-side error shown instantly, no network request made.
   - `test@test.com` / `short` → client-side error (password under 8 characters).
   - `test@test.com` / `longenoughpassword` → passes both client and server
     validation, success message shown.

## Security notes

- Passwords are never logged, stored, or displayed anywhere in this demo.
- In a production system, passwords would be hashed with **bcrypt** before
  storage (e.g. `bcrypt.hash(password, 12)`), and never compared or stored
  in plaintext.
- User lookups in a real backend should always use **parameterized queries**
  rather than string concatenation, to prevent SQL injection.

## Project structure

```
juice-shop-login-form/
├── index.html      # Login form markup
├── style.css       # Basic styling
├── script.js       # Client-side validation + fetch call to backend
├── server.js       # Express backend with server-side validation
├── package.json    # Dependencies
└── README.md
```
