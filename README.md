# Books Learning Pro — Vercel Backend (Simple Version)

## 1. Mục đích
Backend này làm trung gian giữa GPT Assistant và Supabase.
GPT sẽ gọi 4 endpoint:
- POST /api/save-shared-course
- GET  /api/load-shared-course
- POST /api/save-progress
- GET  /api/load-progress

## 2. Cách deploy lên Vercel
1. Tải toàn bộ folder này.
2. Import vào Vercel: "Add New" → "Project" → "Import from..." → chọn repo hoặc upload folder.
3. Trong Vercel Project → Settings → Environment Variables:
   - SUPABASE_URL = URL project Supabase của bạn
   - SUPABASE_SERVICE_ROLE_KEY = Service role key của bạn
4. Nhấn Deploy.

Sau khi deploy xong, bạn sẽ có các endpoint dạng:
- https://your-vercel-project.vercel.app/api/save-shared-course
- https://your-vercel-project.vercel.app/api/load-shared-course
- https://your-vercel-project.vercel.app/api/save-progress
- https://your-vercel-project.vercel.app/api/load-progress

## 3. Tích hợp với GPT
Trong GPT Builder:
- Import file OpenAPI v1.3.
- Đặt server URL = https://your-vercel-project.vercel.app
