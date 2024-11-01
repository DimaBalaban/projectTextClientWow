import axios from 'axios';

const API_BASE_URL = 'http://crm-ichange.ipl.local/api';

export interface Address {
    city: string;
    street: string;
    houseNumber: string;
}

export interface Client {
    id?: number;
    name: string;
    surname: string;
    username: string;
    addresses: Address[];
    contacts: string[];
}
export interface City {
    id: number;
    name: string;
}

export const getClients = (filters: Record<string, string>, page: number = 1) => {
    return axios.get<Client[]>(`${API_BASE_URL}/clients`, { params: { ...filters, page } });
};

export const getCities = () => {
    return axios.get<City[]>(`${API_BASE_URL}/city`);
};

export const addClient = (clientData: Omit<Client, 'id'>) => {
    return axios.post(`${API_BASE_URL}/clients`, clientData);
};

export const updateClient = (clientId: number, clientData: Partial<Client>) => {
    return axios.put(`${API_BASE_URL}/clients/${clientId}`, clientData);
};

export const deleteClient = (clientId: number) => {
    return axios.delete(`${API_BASE_URL}/clients/${clientId}`);
};