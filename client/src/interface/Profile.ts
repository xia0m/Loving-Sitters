import { Review } from './Review';

export interface Profile {
  _id: string;
  isDogSitter: boolean;
  isAvailable: boolean;
  firstName: string;
  lastName: string;
  availability: string[];
  email?: string;
  price: number;
  city: string;
  gallery: string[];
  profilePhoto?: string;
  coverPhoto?: string;
  description?: string;
  phoneNumber?: string;
  address?: string;
  reviews: Review[];
}

export interface OwnerFormProfile {
  _id?: string;
  isDogSitter?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  price?: number;
  phoneNumber?: string;
  address?: string;
  description?: string;
  profilePhoto?: string;
  coverPhoto?: string;
  availability?: string[];
  isAvailable?: boolean;
  gallery?: string[];
}

export interface Filter {
  city?: string;
  startDate?: Date;
  endDate?: Date;
}
