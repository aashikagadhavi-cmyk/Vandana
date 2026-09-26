export interface ColorSwatch {
  hex: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  titleHi?: string;
  category: 'Branding' | 'Packaging' | 'Print & Posters' | 'Social Media' | 'UI & Digital';
  client: string;
  year: string;
  coverImage: string;
  galleryImages?: string[];
  description: string;
  descriptionHi?: string;
  challenge?: string;
  solution?: string;
  tools: string[];
  colors: ColorSwatch[];
  typography: {
    heading: string;
    body: string;
  };
  deliverables: string[];
  featured?: boolean;
  liveUrl?: string;
  createdAt: number;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  deliverables: string[];
  turnaround: string;
  startingPrice: string;
  startingPriceInr: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  quoteHi: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

export type Language = 'hi' | 'en';
