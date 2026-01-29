export function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  const allowedOrigins = [
    "http://ecswhatsup.ecodesoft.net",
    "https://ecswhatsup-backend.ecodesoft.net",
  ];

  if (allowedOrigins.includes(origin)) return true;
  if (/https?:\/\/([\w.-]+)\.onrender\.com$/.test(origin)) return true;

  return false;
}
