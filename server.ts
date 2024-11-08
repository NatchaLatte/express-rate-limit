import express, { Express, Request, Response } from "express";
import { rateLimit } from 'express-rate-limit'
import dotenv from "dotenv";
import { debug } from "util";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: async (req: Request, res: Response) => {
		res.redirect('https://github.com/NatchaLatte');
	}
});

app.use(limiter);

app.get("/", (req: Request, res: Response) => {
	const rateLimitLimit = res.getHeader('RateLimit-Limit');
	const rateLimitRemaining = res.getHeader('RateLimit-Remaining');
	const rateLimitReset = res.getHeader('RateLimit-Reset');
	res.send(`คุณสามารถเข้าหน้านี้ได้อีก ${rateLimitRemaining} ครั้ง จาก ${rateLimitLimit} ครั้ง โดยจะรีเซ็ตในอีก ${rateLimitReset} วินาที`);
});

const server = app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
	debug('HTTP server closed');
  })
})