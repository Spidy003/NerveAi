# ⚡ Nerve AI — Predictive Fleet Telemetry & Autonomous Parts Procurement

> **Next-Generation Commercial Fleet Intelligence, Real-Time OBD-II Digital Twin, and Autonomous EDI E-Commerce Platform.**

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.0+-EE4C2C?style=flat-square&logo=pytorch)](https://pytorch.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

## 🚀 Overview

**Nerve AI** is an enterprise-grade cybernetic fleet management platform designed for commercial aviation and heavy logistics ground support equipment (GSE). It bridges real-time vehicle sensor telemetry, deep learning predictive maintenance (Remaining Useful Life — RUL), and automated B2B procurement of OEM replacement parts.

### Key Capabilities

- 🚛 **Photorealistic 3D Digital Twin**: Interactive 3D Airport Catering Truck (`airport_catering_truck.glb`) rendered in real-time with Three.js / React Three Fiber. Features alpha-transparent backgrounds, realistic commercial fleet livery, titanium scissor-lift hydraulic assemblies, and dynamic cyber-cyan/amber sensor hotspots.
- 🔮 **LSTM Predictive Maintenance**: Deep learning model trained on high-frequency vibration, temperature, and hydraulic pressure time-series data to forecast component failure hours before breakdown occurs.
- ⚡ **Autonomous EDI E-Commerce**: Seamless bridge from sensor failure prediction to automatic generation of EDI 850 Purchase Orders and EDI 810 Invoices.
- 🛡️ **Procurement Auth Gateway**: Integrated dual-tab login & registration gateway (`AuthModal`) that intercepts unauthenticated checkout flows, auto-creates customer profiles, and routes directly to encrypted checkout.
- 📊 **Neumorphic Admin Cockpit**: Sleek, soft-luxury dark neumorphic dashboard featuring tactile cards, live telemetry alerts, EDI document viewers, customer management, and revenue analytics.
- 🧮 **Interactive Fleet ROI Calculator**: Real-time financial estimator modeling annual maintenance savings, downtime prevention, and return on investment across fleet sizes from 5 to 500+ vehicles.

---

## 🏗️ Architecture & Monorepo Structure

```
NerveAI/
├── apps/
│   ├── web-storefront/         # Next.js 14 customer storefront, 3D digital twin & telemetry cockpit
│   │   ├── app/                # App router (/store, /cart, /checkout, /dashboard, /login, /register)
│   │   ├── components/         # AirportTruck3D, FleetRoiCalculator, ScrollVideoHero, AuthModal
│   │   └── public/             # 3D GLB assets, high-res textures, telemetry video demonstration
│   ├── admin-dashboard/        # Next.js 14 enterprise admin cockpit
│   │   ├── app/(admin)/        # Analytics, Alerts, Customers, Sales, Subscriptions, UIKit
│   │   └── components/admin/   # Neumorphic cards, EDI modal, KPI charts, data tables
│   └── simulator/              # Python OBD-II sensor simulator & PyTorch LSTM model
│       └── ml/lstm_model/      # inference.py, nerve_lstm_best.pt, nerve_scaler.pkl
├── packages/
│   └── api/                    # FastAPI backend server with WebSocket pub/sub & EDI engine
│       ├── routers/            # /telemetry, /alerts, /orders, /fleet, /auth, /bookings
│       └── services/           # EDI 850/810 synthesizer, Twilio SMS & SendGrid dispatch
├── infra/                      # Deployment configs, Render YAML, Docker specifications
└── package.json                # Monorepo task orchestration
```

---

## 🛠️ Tech Stack

| Domain | Technologies |
|---|---|
| **Web Storefront** | Next.js 14 (App Router), React 18, Three.js, React Three Fiber, Lucide Icons, TailwindCSS |
| **Admin Cockpit** | Next.js 14, Recharts, Custom Neumorphic CSS Design Tokens, Lucide Icons |
| **Backend API** | FastAPI (Python 3.10+), Uvicorn, WebSockets, Pydantic, Motor (MongoDB), Supabase |
| **Machine Learning** | PyTorch, NumPy, Scikit-Learn, NASA C-MAPSS dataset preprocessing, LSTM RUL regression |
| **Telemetry & EDI** | OBD-II PID parsing, ANSI X12 EDI 850 (Purchase Order) & EDI 810 (Commercial Invoice) |

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: v18.x or v20.x
- **Python**: v3.10 or higher
- **npm** or **pnpm**

### 1. Clone the Repository
```bash
git clone https://github.com/Spidy003/NerveAi.git
cd NerveAI
```

### 2. Run the Customer Web Storefront & 3D Cockpit
```bash
cd apps/web-storefront
npm install
npm run dev
# Running at http://localhost:3000
```

### 3. Run the Neumorphic Admin Cockpit
```bash
cd apps/admin-dashboard
npm install
npm run dev -- -p 3001
# Running at http://localhost:3001
```

### 4. Run the FastAPI Backend & Telemetry Server
```bash
cd packages/api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API docs at http://localhost:8000/docs
```

### 5. Launch the Real-Time LSTM Telemetry Simulator
```bash
python apps/simulator/ml/lstm_model/inference.py
```

---

## 🌟 Key Pages & Workflows

1. **Landing Page (`http://localhost:3000/`)**
   - Interactive 3D Catering Truck with 360° orbital controls and transparent canvas
   - Telemetry demonstration video frame
   - AI Predictive Modules with side-by-side Traditional vs. Nerve AI comparison
   - Interactive Fleet ROI Calculator
2. **Live Telemetry Dashboard (`http://localhost:3000/dashboard`)**
   - Real-time digital twin monitoring hydraulic pressure, motor stator temps, and battery degradation
   - Live Remaining Useful Life (RUL) gauges and automated maintenance warnings
3. **E-Commerce Storefront (`http://localhost:3000/store`)**
   - Catalog of OEM certified parts, telemetry sensors, and edge gateways
   - One-click checkout with authentication validation modal
4. **Encrypted Checkout (`http://localhost:3000/checkout`)**
   - Verified session badge and company billing auto-fill
   - Instant EDI 850 Purchase Order dispatch
5. **Admin Operations Cockpit (`http://localhost:3001/`)**
   - Multi-tenant fleet health oversight
   - EDI 850 / 810 document modal viewer
   - Customer profile drawer and live alert dispatch

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
