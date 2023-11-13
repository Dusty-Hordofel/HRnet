
import EmployeeTable from '../../components/employee/EmployeeTable';

const List = () => {

    const employeesColumns = [
        {
            Header: "First Name",
            accessorKey: "first_name",
            footer: "ID",
        },
        {
            Header: "Last Name",
            accessorKey: "last_name",
            footer: "ID",
        },
        {
            Header: "Start Date",
            accessorKey: "start_date",
            footer: "ID",
        },
        {
            Header: "Date of Birth",
            accessorKey: "date_of_birth",
            footer: "ID",
        },
        {
            Header: "Department",
            accessorKey: "department",
            footer: "ID",
        },
        {
            Header: "State",
            accessorKey: "state",
            footer: "ID",
        },
        {
            Header: "City",
            accessorKey: "city",
            footer: "ID",
        },
        {
            Header: "Street",
            accessorKey: "street",
            footer: "ID",
        },
        {
            Header: "Zip Code",
            accessorKey: "zip_code",
            footer: "ID",
        },
    ]

    /* Get the list of current employees */
    const storedData = localStorage.getItem("employees");
    const employees = storedData ? JSON.parse(storedData) : [];
    console.log("🚀 ~ file: List.tsx:135 ~ List ~ employees:", employees)

    return (
        <div>
            <EmployeeTable columns={employeesColumns} data={employees} />
        </div>
    )
}

export default List