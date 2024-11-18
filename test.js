import crypto from "crypto";

const timeHeader = new Date().toISOString(); // Current ISO 8601 timestamp
const payload = {
    roomName: "Deluxe Suite",
    roomNumber: 101,
    capacity: 2,
    pricePerNight: 150.0,
    features: ["WiFi", "Air Conditioning", "Breakfast Included"],
};

// Encode payload
const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");

// Generate HMAC SHA256 signature
const secretKey = timeHeader; // Use timeHeader as the secret key
const signature = crypto
    .createHmac("sha256", secretKey)
    .update(payloadBase64)
    .digest("hex");

// Combine payload and signature
const encodedPayload = `${payloadBase64}.${signature}`;

// Generate the curl command
const curlCommand = `curl -X POST http://localhost:3030/api/create-room \\
-H "Content-Type: application/json" \\
-H "time: ${timeHeader}" \\
-d '{"encodedPayload": "${encodedPayload}"}'`;

console.log("Generated curl command:");
console.log(curlCommand);
