const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // serves index.html, style.css, script.js

// ----- SERVER-SIDE VALIDATION -----
// Client-side checks can always be bypassed (disabled JS, direct API calls,
// browser dev tools, curl, etc.), so the server must independently re-validate
// every field before doing anything with it.
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters.' });
  }

  // NOTE: This demo does not implement real authentication against a database.
  // In a production system, you would look up the user by email using a
  // parameterized query (never string concatenation, to prevent SQL
  // injection) and compare the submitted password against a bcrypt hash,
  // e.g.  const match = await bcrypt.compare(password, user.hashedPassword);

  return res.status(200).json({ message: 'Validation passed (demo only — no real auth performed).' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
