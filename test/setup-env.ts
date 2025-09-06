const jwtSecret = process.env.JWT_SECRET;
if (jwtSecret == null || jwtSecret.trim() === "") {
  process.env.JWT_SECRET = "test-secret";
}
