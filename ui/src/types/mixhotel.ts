export interface RoomConcept {
  id: string;
  roomNumber: string;
  name: string;
  subtitle: string;
  tags: string[];
  description: string;
  mainImage: string;
  thumbnails: string[];
  badgeNumber: string;
}

export interface Branch {
  id: string;
  number: string;
  badge: string;
  name: string;
  shortLocation: string;
  address: string;
  features: string[];
  image: string;
  phone: string;
  phoneUrl?: string;
  zalo: string;
  messenger: string;
  sms: string;
}

export interface PricingTier {
  name: string;
  badge: string;
  price: string;
  unit: string;
  isHot?: boolean;
  extraHour: string;
  overnight: string;
  dayNight: string;
}

export interface EventPackage {
  name: string;
  price: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface VideoShort {
  id: string;
  number: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  caption: string;
}
