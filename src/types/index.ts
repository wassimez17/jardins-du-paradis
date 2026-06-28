export interface Product {
  id: string;
  title: string;
  tag: string;
  description: string;
  price: string;
  image: string;
  category: 'plantes' | 'pots' | 'soins' | 'oiseaux' | 'bouquets';
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface Section {
  id: string;
  label: string;
  href: string;
}
