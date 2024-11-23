import crypto from "crypto";

export const encodedResponseMiddleware = (req, res, next) => {
    console.log("Encoded Response Middleware");

    try {
        // Generate 'time' header for encryption (use current timestamp as a key)
        const timeHeader = new Date().toISOString();
        req.headers["time"] = timeHeader; // Set time header

        // Store the original `res.send` method to call later after encryption
        const originalSend = res.send;

        // Override the `res.send` method
        res.send = function (body) {
            if (body) {
                // Convert the response body to Base64 string
                const responseBase64 = Buffer.from(
                    JSON.stringify(body)
                ).toString("base64");

                // Create HMAC SHA-256 key using 'timeHeader'
                const secretKey = crypto
                    .createHmac("sha256", timeHeader)
                    .update(timeHeader)
                    .digest("hex")
                    .slice(0, 32); // Use the first 32 bytes for AES-256 key

                // Generate a random Initialization Vector (IV)
                const iv = crypto.randomBytes(16);

                // Encrypt the Base64-encoded response using AES-256-CBC
                const cipher = crypto.createCipheriv(
                    "aes-256-cbc",
                    secretKey,
                    iv
                );
                let encryptedResponse = cipher.update(
                    responseBase64,
                    "utf-8",
                    "base64"
                );
                encryptedResponse += cipher.final("base64");

                // Combine encrypted response with IV to form the final encoded response
                const ivBase64 = iv.toString("base64");
                const encodedResponse = `${encryptedResponse}.${ivBase64}`;

                // Call the original `res.send` method to send the encoded response
                originalSend.call(res, {
                    encodedPayload: encodedResponse,
                    iv: ivBase64,
                    time: timeHeader, // Return the 'time' header for reference
                });
            } else {
                // If no body, call the next middleware (though usually you expect a response body)
                next();
            }
        };

        // Move on to the next middleware if everything is set up
        next();
    } catch (error) {
        console.error("Error in encodeResponseMiddleware:", error.message);
        res.status(500).json({ error: "Failed to encode response." });
    }
};
