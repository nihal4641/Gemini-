import { ProductConfig, OrderSubmission } from '../types';

const CONFIG_KEY = 'aeb_product_config_v1';
const ORDERS_KEY = 'aeb_orders_v1';
const ADMIN_SESSION_KEY = 'aeb_admin_authenticated';

export const DEFAULT_CONFIG: ProductConfig = {
  title: 'ALL EXAM BOOST – 1500 Objective Questions',
  subtitle: '5 Chapters. 1500 Objective Questions. Built for serious competitive exam practice.',
  questionsCount: 1500,
  chaptersCount: 5,
  price: 89,
  currency: '₹',
  recipientName: 'Ashutosh Kumar Ray',
  upiId: 'ashutoshkumar.ray@ybl',
  whatsappNumber: '+919876543210',
  qrCodeUrl: '', // Will be populated with default PhonePe QR or custom uploaded image
  pdfFileUrl: null, // User can upload final PDF in admin
  pdfFileName: 'ALL_EXAM_BOOST_1500_Questions.pdf',
  chapters: [
    {
      id: 'ch-1',
      number: 'CHAPTER 01',
      title: 'Objective Practice',
      subtitle: 'Wave Motion & Simple Harmonic Motion (SHM)',
      questionsCount: 300,
    },
    {
      id: 'ch-2',
      number: 'CHAPTER 02',
      title: 'Objective Practice',
      subtitle: 'Damped & Forced Oscillations, Resonance & Q-Factor',
      questionsCount: 300,
    },
    {
      id: 'ch-3',
      number: 'CHAPTER 03',
      title: 'Objective Practice',
      subtitle: 'Group Velocity, Phase Velocity & Dispersion',
      questionsCount: 300,
    },
    {
      id: 'ch-4',
      number: 'CHAPTER 04',
      title: 'Objective Practice',
      subtitle: 'Wave Packet, Superposition & Doppler Effect',
      questionsCount: 300,
    },
    {
      id: 'ch-5',
      number: 'CHAPTER 05',
      title: 'Objective Practice',
      subtitle: 'Special Comprehensive Full-Length Question Bank',
      questionsCount: 300,
    },
  ],
};

// Initial realistic demo submissions for admin review
const INITIAL_ORDERS: OrderSubmission[] = [
  {
    id: 'AEB-2026-8812',
    fullName: 'Rahul Sharma',
    whatsapp: '+91 98231 44520',
    utrId: '426189032114',
    amount: 89,
    screenshotDataUrl: '',
    screenshotFileName: 'payment_screenshot_rahul.jpg',
    status: 'APPROVED',
    createdAt: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    accessKey: 'AEB-ACC-8812-7X49',
    ocrResult: {
      extractedText: 'Paid to Ashutosh Kumar Ray Rs 89 UPI Ref 426189032114 Successful',
      foundRecipient: true,
      foundAmount: true,
      detectedAmount: 89,
      foundUtrMatch: true,
      isDuplicateUtr: false,
      isAutoApproved: true,
      confidenceScore: 98,
      notes: ['Recipient name Ashutosh Kumar Ray matched', 'Exact ₹89 detected', 'UTR 426189032114 verified'],
    },
  },
  {
    id: 'AEB-2026-8815',
    fullName: 'Priya Patel',
    whatsapp: '+91 99872 12093',
    utrId: '426190223910',
    amount: 89,
    screenshotDataUrl: '',
    screenshotFileName: 'phonepe_receipt_priya.png',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    ocrResult: {
      extractedText: 'Transfer successful Rs 89 Ref 426190223910',
      foundRecipient: false,
      foundAmount: true,
      detectedAmount: 89,
      foundUtrMatch: true,
      isDuplicateUtr: false,
      isAutoApproved: false,
      confidenceScore: 65,
      notes: ['Amount ₹89 verified', 'Recipient name partly obscured or not clearly detected. Marked for manual review.'],
    },
  },
];

export function getProductConfig(): ProductConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveProductConfig(config: ProductConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save config to localStorage', err);
  }
}

export function getOrders(): OrderSubmission[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrders(orders: OrderSubmission[]): void {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (err) {
    console.error('Failed to save orders to localStorage', err);
  }
}

export function addOrder(order: OrderSubmission): void {
  const current = getOrders();
  const updated = [order, ...current];
  saveOrders(updated);
}

export function updateOrderStatus(
  orderId: string, 
  status: 'APPROVED' | 'REJECTED' | 'PENDING',
  rejectionReason?: string
): OrderSubmission | null {
  const current = getOrders();
  const index = current.findIndex(o => o.id === orderId);
  if (index === -1) return null;

  const order = current[index];
  order.status = status;
  order.updatedAt = new Date().toISOString();
  if (status === 'APPROVED' && !order.accessKey) {
    order.accessKey = `AEB-ACC-${order.id.replace('AEB-', '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }
  if (status === 'REJECTED') {
    order.rejectionReason = rejectionReason || 'Payment screenshot did not match the expected ₹89 or recipient Ashutosh Kumar Ray.';
  } else {
    order.rejectionReason = undefined;
  }

  current[index] = order;
  saveOrders(current);
  return order;
}

export function checkDuplicateUtr(utr: string, currentOrderId?: string): boolean {
  const cleanUtr = utr.trim();
  if (!cleanUtr) return false;
  const orders = getOrders();
  return orders.some(o => 
    o.id !== currentOrderId && 
    o.utrId.trim().toLowerCase() === cleanUtr.toLowerCase() && 
    o.status === 'APPROVED'
  );
}

export function getOrderByAccessKey(accessKey: string): OrderSubmission | undefined {
  const orders = getOrders();
  return orders.find(o => o.accessKey === accessKey && o.status === 'APPROVED');
}

export function getOrderById(orderId: string): OrderSubmission | undefined {
  const orders = getOrders();
  return orders.find(o => o.id === orderId);
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
}

export function setAdminAuthenticated(auth: boolean): void {
  if (auth) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
  } else {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }
}
