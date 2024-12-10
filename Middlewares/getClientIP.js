const getClientIp = (req, res, next) => {
  console.log("req.hea", req.headers);
  let ipAddress =
    req.headers["x-forwarded-for"]?.split(",").shift() || // First IP in x-forwarded-for
    req.connection?.remoteAddress || // Fallback to remoteAddress
    req.socket?.remoteAddress; // Fallback to socket remoteAddress

  // In some cases, IP addresses might include a prefix like "::ffff:"
  if (ipAddress && ipAddress.startsWith("::ffff:")) {
    ipAddress = ipAddress.slice(7);
  }

  if (ipAddress == "::1") {
    ipAddress = "127.0.0.1";
  }
  console.log("ipaddress", ipAddress);

  req.clientIp = ipAddress; // Attach the IP to the request object
  next(); // Pass control to the next middleware or route handler
};

module.exports = getClientIp;
