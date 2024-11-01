import React, {useState, useEffect} from 'react';
import {addClient, updateClient, getCities, City, Client, Address} from '../services/api';

interface ClientFormProps {
    client: Client | null;
    onSubmit: () => void;
    // onCancel: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({client, onSubmit}) => {
    const [formData, setFormData] = useState<Omit<Client, 'id'>>({
        name: '',
        surname: '',
        username: '',
        addresses: [],
        contacts: []
    });

    const [cities, setCities] = useState<City[]>([]);


    useEffect(() => {
        const loadCities = async () => {
            const response = await getCities();
            setCities(response.data);
        };

        loadCities();


        if (client) {
            setFormData(client);
        }
    }, [client]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleAddressChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        const updatedAddresses: Address[] = [...formData.addresses];

        if (!updatedAddresses[index]) {
            updatedAddresses[index] = {city: '', street: '', houseNumber: ''};
        }


        updatedAddresses[index] = {
            ...updatedAddresses[index],
            [name as keyof Address]: value
        };

        setFormData(prev => ({...prev, addresses: updatedAddresses}));
    };

    const handleContactChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedContacts = [...formData.contacts];
        updatedContacts[index] = e.target.value;
        setFormData(prev => ({...prev, contacts: updatedContacts}));
    };

    const addAddress = () => {
        setFormData(prev => ({
            ...prev,
            addresses: [...prev.addresses, {city: '', street: '', houseNumber: ''}]
        }));
    };

    const addContact = () => {
        setFormData(prev => ({
            ...prev,
            contacts: [...prev.contacts, '']
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (client) {
            if (client.id !== undefined) {
                await updateClient(client.id, formData);
            } else {
                console.error('Client ID is undefined');
                return;
            }
        } else {
            await addClient(formData);
        }
        onSubmit();
    };

    const handleClear = () => {
        setFormData({
            name: '',
            surname: '',
            username: '',
            addresses: [],
            contacts: []
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
            />
            <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
                placeholder="Surname"
                required
            />
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                required
            />
            {formData.addresses.map((address, index) => (
                <div key={index}>
                    <select
                        name="city"
                        value={address.city}
                        onChange={(e) => handleAddressChange(index, e)}
                        required
                    >
                        <option value="">Select City</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.name}>{city.name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="street"
                        value={address.street}
                        onChange={(e) => handleAddressChange(index, e)}
                        placeholder="Street"
                        required
                    />
                    <input
                        type="text"
                        name="houseNumber"
                        value={address.houseNumber}
                        onChange={(e) => handleAddressChange(index, e)}
                        placeholder="House Number"
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={addAddress}>Add Address</button>
            {formData.contacts.map((contact, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={contact}
                        onChange={(e) => handleContactChange(index, e)}
                        placeholder="Contact"
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={addContact}>Add Contact</button>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleClear}>Clear</button>
        </form>
    );
};

export default ClientForm;

