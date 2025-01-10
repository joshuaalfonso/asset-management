import AddDepartment from "../features/department/AddDepartment";
import DepartmentTable from "../features/department/DepartmentTable";






const Department = () => {
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Department</h1>
                <AddDepartment />
            </div>

            <DepartmentTable />
        </>
    )
}

export default Department;