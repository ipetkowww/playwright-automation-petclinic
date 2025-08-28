// Represents a Pet Type (e.g., cat, dog, etc.)
export interface PetType {
    id: number;
    name: string;
}

export interface PetVisit {
    id: number;
    date: string;        // e.g., "2025-08-28"
    description: string;
    petId: number | null
}

// Represents a Pet with nested type and visits
export interface Pet {
    id: number;
    name: string;
    birthDate: string;
    type: PetType;
    ownerId: number;
    visits: PetVisit[];
}

// Represents an Owner with personal details and their pets
export interface Owner {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    telephone: string;
    pets: Pet[];
}