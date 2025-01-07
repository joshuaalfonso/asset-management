import { AddUnitOfMeasure } from "../features/unit-of-measure/AddUnitOfMeasure"
import { UnitOfMeasureTable } from "../features/unit-of-measure/UnitOfMeasureTable"




export const UnitOfMeasure = () => {
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Unit Of Measure</h1>

                <AddUnitOfMeasure />
            </div>
            <UnitOfMeasureTable />
        </>
    )
}