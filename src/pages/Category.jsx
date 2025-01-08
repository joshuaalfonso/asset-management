import AddCategory from "../features/category/AddCategory";
import CategoryTable from "../features/category/CategoryTable";





const Category = () => {
    return (
        <>
           <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-semibold'>Category</h1>
                <AddCategory />
            </div>

            <CategoryTable />
        </>
    )
}

export default Category;