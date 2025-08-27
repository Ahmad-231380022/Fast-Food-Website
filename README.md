# FastFoodHouse (MERN + Tailwind)

MERN role-based fast-food system (Customer, Cashier, Manager, Admin) with JWT auth, reports (PDF/XLSX), charts, POS, and support tickets.

## Tech
- Frontend: React (Vite + TS), Tailwind CSS, Redux Toolkit, React Router
- Backend: Node.js, Express, Mongoose, JWT, bcrypt, pdfkit, exceljs
- Charts: Chart.js via react-chartjs-2
- Payments: COD (Stripe hooks included for future)

## Monorepo Structure
- backend/
- frontend/

## .env Setup

backend/.env
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<dbName>?retryWrites=true&w=majority
JWT_SECRET=supersecret_change_me
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=
TAX_PERCENT=8
DELIVERY_CHARGE=3.5
```

frontend/.env
```
VITE_API_URL=http://localhost:5000/api
```

## Install
```
cd backend && npm i
cd ../frontend && npm i
```

## Seed Data
```
cd backend
cp .env.example .env  # set MONGO_URI first
npm run seed
```

Users created:
- admin@ffh.com / admin123 (admin)
- manager@ffh.com / manager123 (manager)
- cashier@ffh.com / cashier123 (cashier)
- jane@ffh.com / password (customer)

## Run (local)
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && cp .env.example .env && npm run dev`

## API Highlights
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Products: CRUD (manager/admin) `/api/products`
- Orders: create/list/update `/api/orders`
- Reports: `/api/reports/sales(.pdf|.xlsx)`, `/api/reports/inventory`
- Users: admin `/api/users` ; Staff: manager `/api/staff`
- Profile: `/api/profile`; Wishlist: `/api/wishlist`; Settings: `/api/settings`
- Support: `/api/support` (customer) and admin/manager moderation

## Deployment
- Database: MongoDB Atlas (create cluster, network access 0.0.0.0/0 or your IP, add user)
- Backend: Render/Railway
  - Build/Start: `npm install`, `npm run start`
  - Env: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, `TAX_PERCENT`, `DELIVERY_CHARGE`
- Frontend: Vercel/Netlify
  - Build: `npm run build`
  - Env: `VITE_API_URL` pointing to your deployed backend `/api`
  - Output dir: `dist`

## Notes
- Role redirects are handled in frontend `useAuthGuard`.
- Stripe integration hooks are present via deps; payment is COD for now.
- Tailwind theme colors: brand red/yellow/dark/light.