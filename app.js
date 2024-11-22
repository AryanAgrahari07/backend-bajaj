const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(require("cors")());

// Helper function to check if a number is prime
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// POST endpoint
app.post("/bfhl", (req, res) => {
    const { data = [], file_b64 = null } = req.body;

    // Separate numbers and alphabets
    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]+$/.test(item));
    const lowercaseAlphabets = alphabets.filter((char) => char === char.toLowerCase());

    // Highest lowercase alphabet
    const highestLowercaseAlphabet = lowercaseAlphabets.sort().pop() || null;

    // Check if there's a prime number
    const isPrimeFound = numbers.some((num) => isPrime(parseInt(num)));

    // Handle file
    let fileValid = false;
    let fileMimeType = null;
    let fileSizeKB = null;

    if (file_b64) {
        try {
            const fileBuffer = Buffer.from(file_b64, "base64");
            fileSizeKB = fileBuffer.length / 1024;
            fileMimeType = "application/octet-stream"; // Adjust MIME type if needed
            fileValid = true;
        } catch (err) {
            // File invalid
        }
    }

    res.status(200).json({
        is_success: true,
        user_id: "Chandrashekhar Choudha_29112002",
        email: "chandrashekharchoudha@gmail.com",
        roll_number: "0101CS211040",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : [],
        is_prime_found: isPrimeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKB,
    });
});

// GET endpoint
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
