import crypto from "crypto";

export const decodePayloadMiddleware = (req, res, next) => {
    try {
        const timeHeader = req.headers["time"];
        if (!timeHeader) {
            return res.status(400).json({ error: "Missing 'time' header." });
        }

        // Validate ISO 8601 format
        const iso8601Regex =
            /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
        if (!iso8601Regex.test(timeHeader)) {
            return res
                .status(400)
                .json({ error: "'time' header is not in ISO 8601 format." });
        }

        const secretKey = timeHeader;

        const { encodedPayload } = req.body;
        if (!encodedPayload) {
            return res
                .status(400)
                .json({ error: "Missing encodedPayload in request body." });
        }

        // Decode the payload
        const [payload, signature] = encodedPayload.split(".");
        if (!payload || !signature) {
            return res
                .status(400)
                .json({ error: "Invalid encodedPayload format." });
        }

        const computedSignature = crypto
            .createHmac("sha256", secretKey)
            .update(payload)
            .digest("hex");

        if (computedSignature !== signature) {
            return res.status(401).json({ error: "Invalid signature." });
        }

        // Parse the decoded payload
        const decodedPayload = JSON.parse(
            Buffer.from(payload, "base64").toString("utf-8")
        );

        // Replace req.body with the decoded payload
        req.body = decodedPayload;
        console.log("Decoded payload:", decodedPayload);

        next();
    } catch (error) {
        console.error("Error in decodePayloadMiddleware:", error.message);
        res.status(500).json({ error: "Failed to decode payload." });
    }
};
