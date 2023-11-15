
import EmployeeTable from '../../components/employee/EmployeeTable';
import { formatCustomDate } from '../../lib/utils';

// function formatCustomDate(dateString: string) {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const month = date.getMonth() + 1; // Les mois sont indexés à partir de 0, donc on ajoute 1
//     const year = date.getFullYear() % 100; // Obtenez les deux derniers chiffres de l'année

//     // Formater la date
//     return `${day}/${month}/${year}`;
// }
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
                // console.log("🚀 ~ file: List.tsx:23 ~ List ~ date:", row.original.startDate)
                return formatCustomDate(row.original.startDate);
            },
            footer: "ID",
        },
        {
            Header: "Date of Birth",
            accessorKey: "dateOfBirth",
            cell: ({ row }) => {
                // console.log("🚀 ~ file: List.tsx:23 ~ List ~ date:", row.original.startDate)
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
            <EmployeeTable columns={employeesColumns} data={employees} />
        </div>
    )
}

export default List