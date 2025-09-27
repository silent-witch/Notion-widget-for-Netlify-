
// netlify/functions/candle.js
let candleState = { lit: false, updatedAt: Date.now() };

exports.handler = async function(event) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || "{}");
      if (typeof body.lit === "boolean") {
        candleState.lit = body.lit;
        candleState.updatedAt = Date.now();
        return { statusCode: 200, headers, body: JSON.stringify(candleState) };
      } else {
        return { statusCode: 400, headers, body: JSON.stringify({ error: "body.lit must be boolean" }) };
      }
    } catch (err) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
    }
  }

  // GET -> return current state
  return { statusCode: 200, headers, body: JSON.stringify(candleState) };
};
