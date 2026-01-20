# Login Credentials - JusConsultus AI

## Database Status
✅ **Database Running:** PostgreSQL on `localhost:51214`  
✅ **Both apps connected to shared database**

---

## 🔐 Admin Web App Login
**URL:** `http://localhost:3001/login` (or `http://192.168.1.63:3001/login`)

### Admin Account
```
Username: admin
Password: ChangeMe123!
Email:    admin@jusconsultus.ai
Role:     superadmin
```

**Features Available:**
- Full admin dashboard access
- User management
- Payment/subscription management
- Legal database management (upload, sync, delete)
- Site content management
- Settings configuration
- Analytics and statistics

---

## 👤 User Web App Login
**URL:** `http://localhost:3000/login` (or `http://192.168.1.63:3000/login`)

### Test User Accounts

**✅ All test accounts are exempt from payment setup - no payment details required!**

#### 1. Free Plan User
```
Email:    test@jusconsultus.com
Password: testuser123
Plan:     Free (10 queries per day)
Payment:  ✅ Exempt (pre-configured)
```

#### 2. Pro Plan User
```
Email:    pro@jusconsultus.com
Password: prouser123
Plan:     Pro (unlimited queries)
Payment:  ✅ Exempt (pre-configured)
```

#### 3. Special User (Admin Access to Legal Database)
```
Email:    kdtuazon21@gmail.com
Password: kreeden_27
Plan:     Pro
Payment:  ✅ Exempt (pre-configured)
Special:  Can access admin functions in Legal Database
```

**Features Available:**
- AI Legal Assistant Chat
- Legal Database Search
- Document Generator
- Bookmark Management
- E-Library Integration
- Supreme Court Case Search
- File Upload & Analysis
- User Profile Management
- Subscription Management (for free users)

---

## 🚀 How to Start Both Applications

### 1. Start Database (if not running)
```powershell
cd "d:\JusConsultus AI\JusCosultus AI_User"
npx prisma dev
```
Keep this terminal window open.

### 2. Start User Web App
```powershell
cd "d:\JusConsultus AI\JusCosultus AI_User"
$env:HOSTNAME="0.0.0.0"
npm start
```
Access at: http://localhost:3000

### 3. Start Admin Web App
```powershell
cd "d:\JusConsultus AI\JusCosultus Admin Web App"
$env:HOSTNAME="0.0.0.0"
npm start
```
Access at: http://localhost:3001

---

## 📱 Google OAuth Sign-In

### User Web App - Google OAuth
You can also sign in with Google on the User Web App:
1. Click "Sign in with Google" on login page
2. Complete Google authentication
3. Automatically creates account in database
4. Immediate sign-in (no refresh needed)

**Note:** OAuth works on localhost. For network access, update:
- Google Cloud Console with network redirect URI
- `.env` file with `NEXT_PUBLIC_GOOGLE_REDIRECT_URI`

---

## 🔄 Database Information

### Connection String
```
postgres://postgres:postgres@localhost:51214/template1?sslmode=disable
```

### Tables Created
- **admins** - Admin user accounts
- **users** - Regular user accounts  
- **user_data** - User preferences and settings
- **chats** - Chat history
- **bookmarks** - Saved legal documents

### Shared Database
Both apps use the same PostgreSQL database for real-time synchronization:
- Users created in User App are visible in Admin App
- Admin can manage users from Admin Dashboard
- Real-time subscription updates

---

## 🛠️ Troubleshooting

### Can't log in?
1. **Check database is running:**
   ```powershell
   Get-Process -Name "node" | Where-Object {$_.CommandLine -like "*prisma*"}
   ```

2. **Verify data was seeded:**
   ```powershell
   cd "d:\JusConsultus AI\JusCosultus Admin Web App"
   npx tsx prisma/seed-admin.ts
   
   cd "d:\JusConsultus AI\JusCosultus AI_User"
   npx tsx prisma/seed.ts
   ```

3. **Check if apps are running:**
   - User App: http://localhost:3000
   - Admin App: http://localhost:3001

### Database errors?
If you see Prisma connection errors:
1. Stop all Node processes: `Stop-Process -Name "node" -Force`
2. Start database first: `npx prisma dev`
3. Then start the applications

### Need to reset database?
```powershell
cd "d:\JusConsultus AI\JusCosultus AI_User"
npx prisma db push --force-reset
npx tsx prisma/seed.ts

cd "d:\JusConsultus AI\JusCosultus Admin Web App"
npx tsx prisma/seed-admin.ts
```

---

## 📝 Notes

### Security
- ⚠️ **Change default admin password** after first login
- All passwords are hashed with SHA-256
- JWT tokens used for session management
- HttpOnly cookies for secure authentication

### Testing Features
1. **Free User:** Test query limits, upgrade prompts, pro banners
2. **Pro User:** Test unlimited queries, all premium features
3. **Admin:** Test full dashboard, user management, content management

### Network Access
Both apps are configured to run on `0.0.0.0`:
- Accessible from other devices on network
- Use your local IP: `http://192.168.1.63:3000` (User) and `:3001` (Admin)

---

## ✅ Quick Test Checklist

### User App
- [ ] Log in with test@jusconsultus.com
- [ ] Test AI chat functionality
- [ ] Search legal database
- [ ] Generate a document
- [ ] Create a bookmark
- [ ] Check query usage display (free user)

### Admin App  
- [ ] Log in with admin/ChangeMe123!
- [ ] View dashboard statistics
- [ ] Browse users list
- [ ] Check payments section
- [ ] Upload a document to legal database
- [ ] Update site content

### Cross-App Features
- [ ] Create user in User App → Appears in Admin App users list
- [ ] Update user subscription in Admin App → Reflected in User App
- [ ] Google OAuth sign in → User appears in Admin dashboard

---

**Last Updated:** January 7, 2026  
**Database Status:** ✅ Ready  
**All Features:** ✅ Enabled
