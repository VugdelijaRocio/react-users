export interface User {
    name:       Name;
    location:   Location;
    email:      string;
    phone:      string;
    cell:       string;
    id:         string;
    picture:    Picture;
}

export interface ID {
    name:  string;
    value: string;
}

export interface Location {
    street:      Street;
    city:        string;
    state:       string;
    country:     string;
}

export interface Street {
    number: number;
    name:   string;
}

export interface Name {
    first: string;
    last:  string;
}

export interface Picture {
    large:     string;
    medium:    string;
    thumbnail: string;
}

export interface UsersFilters {
    first?: string;
    last?: string;
    city?: string;
    country?: string;
    phone?: string;
    cell?: string;
    email?: string;
}