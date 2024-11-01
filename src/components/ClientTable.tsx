import React, { useEffect, useState } from 'react';
import { Client, getClients, getCities, deleteClient, City } from '../services/api';
import Pagination from './Pagination';
// import './ClientTable.css';

const ClientTable: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [filters, setFilters] = useState({ name: '', surname: '', username: '', city: '' });
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadClients();
        loadCities();
    }, [filters, page]);

    const loadClients = async () => {
        try {
            const response = await getClients(filters, page);
            setClients(response.data);
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const loadCities = async () => {
        try {
            const response = await getCities();
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const handleDelete = async (id: number | undefined) => {
        if (id === undefined) {
            console.error("Client ID is undefined");
            return;
        }

        try {
            await deleteClient(id);
            loadClients();
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <div>
            <h2>Clients</h2>
            <div className="filters">
                <input type="text" name="name" placeholder="Name" onChange={handleFilterChange} />
                <input type="text" name="surname" placeholder="Surname" onChange={handleFilterChange} />
                <input type="text" name="username" placeholder="Username" onChange={handleFilterChange} />
                <select name="city" onChange={handleFilterChange}>
                    <option value="">All cities</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                </select>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Username</th>
                    <th>Address</th>
                    <th>Contacts</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.surname}</td>
                        <td>{client.username}</td>
                        <td>{client.addresses.map(address => `${address.city}, ${address.street} ${address.houseNumber}`).join('\n')}</td>
                        <td>{client.contacts.join('\n')}</td>
                        <td>
                            <button>Edit</button>
                            <button onClick={() => handleDelete(client.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination currentPage={page} onPageChange={setPage} />
        </div>
    );
};

export default ClientTable;




