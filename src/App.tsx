import React, {useState} from 'react';
import ClientTable from './components/ClientTable';
import ClientForm from './components/ClientForm';
import {Client} from './services/api';
import './App.css';

const App: React.FC = () => {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const handleClientSubmit = () => {
        setSelectedClient(null);
    };

    return (
        <div className="app">
            <h1>Client Management</h1>
            <ClientForm client={selectedClient} onSubmit={handleClientSubmit}/>
            <ClientTable/>
        </div>
    );
};

export default App;
