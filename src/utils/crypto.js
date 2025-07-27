import { hash, verify } from 'argon2';

const SECRET_KEY = process.env.CRYPTO_SECRET;

// Directly hash the token (one-way protection)
export const hashToken = async (token) => {
  return await hash(token + SECRET_KEY);
};

// Verify token against stored hash
export const verifyToken = async (storedHash, token) => {
  return await verify(storedHash, token + SECRET_KEY);
};

// Test function
const test = async () => {
    const token = "test_token_12345";
    
    const hashed = await hashToken(token);
    console.log("Hashed token:", hashed);
    
    const isValid = await verifyToken(hashed, token);
    console.log("Is valid?", isValid);
};

// Run test if executed directly
test();
