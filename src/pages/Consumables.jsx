
import { useState } from 'react';
import ConsumablesTable from '../features/Consumables/ConsumablesTable'
import CreateConsumableForm from '../features/Consumables/CreateConsumableForm';

function Consumables() {

    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <div className='flex justify-between'>
                <h1 className='text-2xl font-semibold'>Consumable</h1>
                <button 
                    className="btn btn-active btn-primary" 
                    onClick={() => setShowForm((show) => !show)}
                >
                    Add Item
                </button>
            </div>

            <ConsumablesTable />

            {showForm && <CreateConsumableForm />}

        </>

    )
}

export default Consumables