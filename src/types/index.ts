export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: 'user' | 'admin';
  preferences?: any;
  createdAt: string;
}

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  duration: string;
  image: string;
  images?: string[];
  highlights?: string[];
  rating: number;
  category?: string;
}

export interface Booking {
  id: string;
  userId: string;
  userName: string;
  packageId: string;
  packageName: string;
  travelDate: string;
  guests: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'unpaid' | 'paid';
  createdAt: string;
}
