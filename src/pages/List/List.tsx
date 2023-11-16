
import EmployeeTable from '../../components/employee/EmployeeTable';
import { formatCustomDate } from '../../lib/utils';
import { Helmet } from "react-helmet";

const List = () => {

    const employeesColumns = [
        {
            Header: "First Name",
            accessorKey: "firstName",
            footer: "ID",
        },
        {
            Header: "Last Name",
            accessorKey: "lastName",
            footer: "ID",
        },
        {
            Header: "Start Date",
            accessorKey: "startDate",
            cell: ({ row }) => {
                return formatCustomDate(row.original.startDate);
            },
            footer: "ID",
        },
        {
            Header: "Date of Birth",
            accessorKey: "dateOfBirth",
            cell: ({ row }) => {
                return formatCustomDate(row.original.dateOfBirth);
            },
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
            accessorKey: "zipCode",
            footer: "ID",
        },
    ]

    /* Get the list of current employees */
    const storedData = localStorage.getItem("employees");
    const employees = storedData ? JSON.parse(storedData) : [];
    console.log("🚀 ~ file: List.tsx:135 ~ List ~ employees:", employees)

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="RHnet Employee List" />
                <meta name="keywords" content="employees,employee form,employee list, lastName, firstName," />
                <meta name="author" content="RHnet" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="index, follow" />
                <title>RHnet Employee List Page</title>
                <link rel="canonical" href="http://localhost:5174/list" />
            </Helmet>
            <EmployeeTable columns={employeesColumns} data={employees} />
        </div>
    )
}

export default List