module.exports = apiSecretMiddleware = (req, res, next) => {
  const clientSecret = req.headers["x-api-key"];

  if (!clientSecret || clientSecret !== process.env.API_SECRET) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or missing API secret." });
  }
  next();
};
