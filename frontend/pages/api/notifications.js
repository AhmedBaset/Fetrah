export default function handler(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setInterval(() => {
    const data = {
      message: `Notification sent at ${new Date()}`,
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 5000);
}
