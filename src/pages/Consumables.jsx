import AddConsumable from '../features/Consumables/AddConsumable'
import ConsumablesTable from '../features/Consumables/ConsumablesTable'

function Consumables() {

    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Consumable</h1>
                <AddConsumable />
            </div>

            <ConsumablesTable />

        </>
    )
}

export default Consumables