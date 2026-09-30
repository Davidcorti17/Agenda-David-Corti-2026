export interface Contact {
  id: number;
  firstName: string;
  lastName: string | null;
  address: string | null;
  number: string | null;
  email: string | null;
  image: string | null;
  company: string | null;
  description: string;
  userId: number;
  isFavorite: boolean;
}

export interface ContactWithGroupIds extends Contact {
  groupIds: number[];
}

export interface CreateOrUpdateContact {
  firstName: string;
  lastName?: string | null;
  address?: string | null;
  number?: string | null;
  email?: string | null;
  image?: string | null;
  company?: string | null;
  description?: string | null;
}
