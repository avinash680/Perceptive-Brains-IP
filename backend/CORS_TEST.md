# CORS Configuration Test Guide

## Summary of Changes Made

### 1. **Fixed .env CORS_ORIGIN** 
   - **Problem**: Spaces after commas could cause inconsistent parsing
   - **Solution**: Removed all spaces
   - **Before**: `CORS_ORIGIN=http://localhost:3000, http://localhost:5173, ...`
   - **After**: `CORS_ORIGIN=http://localhost:3000,http://localhost:5173,...`

### 2. **Enhanced server.js CORS Logic**
   - **Problem**: No explicit preflight handler; relying solely on app.use() could miss edge cases
   - **Solution**: 
     - Added `app.options("*", cors(corsOptions))` for explicit preflight handling
     - Improved isAllowedOrigin() with better debugging
     - Separated corsOptions as a reusable object
     - Always include default localhost origins (even if .env is empty)
   
### 3. **Added Debug Logging**
   - **Problem**: Could not diagnose which origins were being rejected
   - **Solution**: Added `console.warn()` for rejected origins (log shows allowed origins)
   - **Usage**: Check backend console output if CORS still fails

### 4. **Improved CORS Options**
   - Added PUT, DELETE, PATCH methods (future-proofing)
   - Added exposedHeaders for custom response headers
   - Credentials: true with explicit origin checking (secure)
   - maxAge: 86400 (24 hours preflight caching)

## How to Test Locally

### Test 1: Frontend → Backend Form Submission
1. Terminal 1: Start backend
   ```bash
   cd backend
   npm run start
   ```
   Expected output: `Consultation backend running on port 5000`

2. Terminal 2: Start frontend
   ```bash
   cd frontend
   npm run dev
   ```
   Expected output: `VITE v... ready in X ms`

3. Open browser: http://localhost:5173
4. Fill and submit the consultation form
5. Expected result: ✅ No CORS error, form submitted successfully

### Test 2: Check CORS Headers
Using curl in terminal:
```bash
# Test preflight (OPTIONS)
curl -i -X OPTIONS http://localhost:5000/api/consultation \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type"

# Expected response headers:
# - Access-Control-Allow-Origin: http://localhost:5173
# - Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS,PATCH
# - Access-Control-Allow-Headers: Content-Type,Authorization
# - Access-Control-Allow-Credentials: true

# Test actual POST
curl -i -X POST http://localhost:5000/api/consultation \
  -H "Origin: http://localhost:5173" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"","service":"","message":""}'

# Expected: 200 with CORS headers + response body
```

### Test 3: Debug Mode
If CORS still fails:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Submit form
4. Click the failed request → Response tab
5. Check if `Access-Control-Allow-Origin` header is present
6. Check backend console for debug logs: `[CORS] Origin rejected: ...`

## Production Deployment (Render)
The configuration automatically uses production origins from .env:
```
https://perceptive-brains-ip-1.onrender.com
https://perceptive-brains-ip-xps4.onrender.com
```

No code changes needed; just ensure .env is deployed with correct CORS_ORIGIN.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| "No 'Access-Control-Allow-Origin' header" | Origin not in allowed list | Check .env CORS_ORIGIN and console logs |
| "Credentials mode is 'include' but...response doesn't include credentials" | Missing credentials: true | ✅ Already fixed |
| Preflight returns 200 but POST blocked | Missing app.options() | ✅ Already fixed |
| Works in curl but not browser | Browser sending different Origin | Check Origin header in DevTools |
| Works locally but not on production | Frontend URL doesn't match configured origin | Update .env CORS_ORIGIN |

## Technical Details

### CORS Flow
1. Browser sends OPTIONS (preflight)
2. `app.options("*", cors())` catches it, returns allowed origins
3. Browser sends actual POST with credentials
4. `app.use(cors())` applies CORS headers
5. Frontend receives response with correct headers

### Origin Matching Logic
```javascript
// Always allowed (no origin header)
Requests from health checks, curl, server-to-server

// Always allowed (development)
http://localhost:3000
http://localhost:5173
http://127.0.0.1:3000
http://127.0.0.1:5173

// Allowed if in .env CORS_ORIGIN
https://perceptive-brains-ip-1.onrender.com
(and any other configured origins)

// Blocked
Any other origin
```

## Next Steps
- Monitor backend console for any `[CORS] Origin rejected` warnings
- If warnings appear, add the origin to .env CORS_ORIGIN
- Enable debug logging temporarily during development if issues persist
