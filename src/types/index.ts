export interface ChapterInfo {
  id: string | number;
  numberStr: string;
  title: string;
  count?: number;
  subtitle?: string;
  questionsCount?: number;
}

export interface AdminSettings {
  productTitle: string;
  productSubtitle?: string;
  price: number;
  recipientName: string;
  upiId: string;
  supportWhatsApp: string;
  qrCodeImageUrl: string | null;
  hasCustomPdf: boolean;
  pdfFileName?: string | null;
  pdfFileSize?: string | null;
  pdfUploadedAt?: string | null;
  chapters: ChapterInfo[];
}

export interface Order {
  id: string;
  customerName: string;
  whatsapp: string;
  utrId: string;
  amount: number;
  screenshotUrl: string;
  verificationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
  downloadToken?: string;
  reviewedAt?: string;
  notes?: string;
  extractedDetails?: {
    recipientNameMatch?: boolean;
    amountMatch?: boolean;
    utrDetected?: boolean | string;
    confidence?: number;
  };
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  questionsCount: number;
}

export interface ProductConfig {
  title: string;
  subtitle: string;
  questionsCount: number;
  chaptersCount: number;
  price: number;
  currency: string;
  recipientName: string;
  upiId: string;
  whatsappNumber: string;
  qrCodeUrl: string;
  pdfFileUrl: string | null;
  pdfFileName: string;
  chapters: Chapter[];
}

export interface VerificationCheckStep {
  name: string;
  status: 'waiting' | 'running' | 'success' | 'warning' | 'failed';
  message: string;
}

export interface OcrVerificationResult {
  extractedText: string;
  foundRecipient: boolean;
  foundAmount: boolean;
  detectedAmount?: number;
  foundUtrMatch: boolean;
  isDuplicateUtr: boolean;
  isAutoApproved: boolean;
  confidenceScore: number;
  notes: string[];
}

export interface OrderSubmission {
  id: string;
  fullName: string;
  whatsapp: string;
  utrId: string;
  amount: number;
  screenshotDataUrl: string;
  screenshotFileName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  createdAt: string;
  updatedAt?: string;
  accessKey?: string;
  ocrResult?: OcrVerificationResult;
}

export type AppView = 
  | 'landing' 
  | 'payment' 
  | 'verifying' 
  | 'success' 
  | 'pending' 
  | 'rejected' 
  | 'admin';
