// 🔧 4. Rate Limiting
// If you want to protect your routes from being hit too many times (i.e., brute-force attacks, DDoS)
//  implement rate limiting. Here's an easy setup using express-rate-limit.

// npm install express-rate-limit

// Then, in your app.js:

const rateLimit = require("express-rate-limit");

// Set up rate limiting for all routes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                  // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});

// Apply rate limiting to all routes
app.use(limiter);

// 🔧 5. Helmet for Security Headers
// To enhance security by setting various HTTP headers, use helmet:

// npm install helmet

// Then, in app.js:

const helmet = require("helmet");

app.use(helmet());