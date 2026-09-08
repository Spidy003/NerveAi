import { addDays, subDays, format } from "date-fns";

export const generateRevenueData = (days: number = 30) => {
  const data = [];
  let currentRevenue = 8000;
  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);
    currentRevenue = currentRevenue + Math.random() * 2000 - 500;
    if (i < 5) currentRevenue += 5000; // Recent spike
    
    data.push({
      date: format(date, "MMM dd"),
      revenue: Math.round(currentRevenue),
      hardware: Math.round(currentRevenue * 0.4),
      saas: Math.round(currentRevenue * 0.6)
    });
  }
  return data;
};

export const MOCK_ORDERS = [
  { id: "ORD-9912", customer: "Raj Logistics", amount: 125000, status: "completed", date: "2024-05-12" },
  { id: "ORD-9913", customer: "Express Freight", amount: 45000, status: "completed", date: "2024-05-13" },
  { id: "ORD-9914", customer: "Shiv Shakti Transport", amount: 210000, status: "pending", date: "2024-05-14" },
  { id: "ORD-9915", customer: "Delhivery Partners", amount: 85000, status: "completed", date: "2024-05-15" },
  { id: "ORD-9916", customer: "Southern Cargo", amount: 60000, status: "failed", date: "2024-05-16" },
  { id: "ORD-9917", customer: "Blue Dart Fleet", amount: 155000, status: "completed", date: "2024-05-17" },
  { id: "ORD-9918", customer: "Gati Movers", amount: 32000, status: "completed", date: "2024-05-18" },
  { id: "ORD-9919", customer: "VRL Logistics", amount: 98000, status: "pending", date: "2024-05-19" },
  { id: "ORD-9920", customer: "SafeExpress", amount: 245000, status: "completed", date: "2024-05-20" },
  { id: "ORD-9921", customer: "Mahindra Logistics", amount: 410000, status: "completed", date: "2024-05-21" },
];

export const MOCK_ALERTS = [
  { id: 1, vehicle: "MH 12 AB 1234", customer: "Shiv Shakti Transport", component: "Brake Pad", daysRemaining: 3, status: "triggered", severity: "critical", date: "2024-05-21T10:30:00Z" },
  { id: 2, vehicle: "KA 01 XY 9876", customer: "Express Freight", component: "Battery", daysRemaining: 7, status: "triggered", severity: "warning", date: "2024-05-21T08:15:00Z" },
  { id: 3, vehicle: "DL 04 ZZ 5555", customer: "Delhivery Partners", component: "Tire Tread", daysRemaining: 1, status: "acknowledged", severity: "critical", date: "2024-05-20T14:20:00Z" },
  { id: 4, vehicle: "TN 09 BC 4444", customer: "Southern Cargo", component: "Alternator", daysRemaining: 14, status: "triggered", severity: "warning", date: "2024-05-20T09:10:00Z" },
  { id: 5, vehicle: "GJ 03 DE 1111", customer: "Raj Logistics", component: "Coolant System", daysRemaining: 2, status: "triggered", severity: "critical", date: "2024-05-19T16:45:00Z" },
];

export const MOCK_CUSTOMERS = [
  { id: "CUST-001", name: "Ramesh Kumar", fleetName: "Raj Logistics", vehicles: 45, subscription: "pro", mrr: 45000, joined: "2023-01-15", status: "active", city: "Mumbai" },
  { id: "CUST-002", name: "Suresh Singh", fleetName: "Express Freight", vehicles: 120, subscription: "enterprise", mrr: 110000, joined: "2023-03-22", status: "active", city: "Delhi" },
  { id: "CUST-003", name: "Vikram Patel", fleetName: "Shiv Shakti Transport", vehicles: 25, subscription: "starter", mrr: 25000, joined: "2023-06-10", status: "active", city: "Ahmedabad" },
  { id: "CUST-004", name: "Anita Desai", fleetName: "Delhivery Partners", vehicles: 350, subscription: "enterprise", mrr: 315000, joined: "2022-11-05", status: "active", city: "Gurgaon" },
  { id: "CUST-005", name: "Muthu Swami", fleetName: "Southern Cargo", vehicles: 80, subscription: "pro", mrr: 75000, joined: "2023-08-18", status: "warning", city: "Chennai" },
  { id: "CUST-006", name: "Rajesh Sharma", fleetName: "Gati Movers", vehicles: 15, subscription: "starter", mrr: 15000, joined: "2024-01-12", status: "active", city: "Pune" },
  { id: "CUST-007", name: "Sanjay Verma", fleetName: "VRL Logistics", vehicles: 500, subscription: "enterprise", mrr: 450000, joined: "2022-05-20", status: "active", city: "Bangalore" },
  { id: "CUST-008", name: "Priya Reddy", fleetName: "SafeExpress", vehicles: 60, subscription: "pro", mrr: 58000, joined: "2023-09-30", status: "churned", city: "Hyderabad" },
  { id: "CUST-009", name: "Amitabh Bose", fleetName: "Mahindra Logistics", vehicles: 800, subscription: "enterprise", mrr: 720000, joined: "2021-12-01", status: "active", city: "Mumbai" },
  { id: "CUST-010", name: "Gurpreet Singh", fleetName: "Punjab Freight", vehicles: 40, subscription: "pro", mrr: 38000, joined: "2024-02-15", status: "active", city: "Chandigarh" },
];
