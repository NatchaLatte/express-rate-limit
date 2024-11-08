# เรียนรู้การทำ [express-rate-limit](https://express-rate-limit.mintlify.app/)
### วิธีติดตั้ง
สำหรับ npm
```
npm install express-rate-limit
```
สำหรับ yarn
```
yarn add express-rate-limit
```
สำหรับ pnpm
```
pnpm add express-rate-limit
```
### วิธีใช้งาน
```typescript
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // หน่วยเป็นมิลลิวินาที ในที่นี้คือ 15 นาที
	limit: 100, // กำหนดจำนวนครั้งที่เข้ามาด้วย IP เดียวกัน หน่วยเป็นครั้งต่อ windowMs ในที่นี้คือ 100 ครั้งต่อ 15 นาที
	standardHeaders: true, // กำหนดให้มีการส่งข้อมูลเกี่ยวกับการจำกัดจำนวน request ใน header ที่ชื่อ RateLimit-* (เช่น RateLimit-Limit และ RateLimit-Remaining) โดยการตั้งค่า true จะช่วยให้ผู้ใช้ทราบจำนวน request ที่ยังเหลือได้
	legacyHeaders: false, // ปิดการใช้ header แบบเก่า (X-RateLimit-* เช่น X-RateLimit-Limit) โดยตั้งค่า false จะลดการส่ง header ที่ไม่จำเป็นออกไป
	message: async (req: Request, res: Response) => {
		res.redirect('https://github.com/NatchaLatte'); // เมื่อเกินจำนวนครั้งที่กำหนดให้ Redirect ไปที่ลิงก์ https://github.com/NatchaLatte
	}
});

app.use(limiter);

```
