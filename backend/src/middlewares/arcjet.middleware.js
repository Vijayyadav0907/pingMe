import aj from "../config/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    // Block if Arcjet denies the request
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
      } else if (decision.reason.isBot()) {
        // 👇 Only block bots in production
        if (process.env.NODE_ENV === "production") {
          return res.status(403).json({ message: "Bot access denied." });
        } else {
          console.warn("Bot detected but allowed in dev:", req.headers["user-agent"]);
        }
      } else {
        return res.status(403).json({ message: "Access denied by security policy." });
      }
    }

    // Extra check: spoofed bot pretending to be a browser
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected"
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet Protection Error:", error);
    return res.status(503).json({ message: "Security system unavailable" });
  }
};

export default arcjetProtection;
