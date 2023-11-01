import React from 'react';
import BasicTable from '../../components/BasicTable';
import EmployeeTable from '../../components/employee/EmployeeTable';
import mDta from "../../MOCK_DATA.json";
import { DateTime } from "luxon";


type Props = {}

const List = (props: Props) => {

    /* 
{
"id": 1,
"first_name": "Isador",
"last_name": "Kruger",
"email": "ikruger0@huffingtonpost.com",
"gender": "Male",
"dob": "2023-04-28T11:19:35Z"
}
*/

    const data = React.useMemo(() => mDta, []); //we use the useMemo hook to memoize the data
    //columns definition
    const columns = [
        {
            Header: "ID",
            accessorKey: "id",
            footer: "ID",
        },
        {
            header: "Name",
            columns: [
                {
                    Header: "First ",
                    accessorKey: "first_name",
                    footer: "ID",
                },
                {
                    Header: "Last ",
                    accessorKey: "last_name",
                    footer: "ID",
                },
            ],
            //   footer: "ID",
        },
        // {
        //   header: "Name",
        //   accessorFn: (row) => `${row.first_name} ${row.last_name}`,
        //   //   footer: "ID",
        // },
        // {
        //   Header: "First Name",
        //   accessorKey: "first_name",
        //   footer: "ID",
        // },
        // {
        //   Header: "Last Name",
        //   accessorKey: "last_name",
        //   footer: "ID",
        // },
        {
            Header: "Email",
            accessorKey: "email",
            footer: "ID",
        },
        {
            Header: "Gender",
            accessorKey: "gender",
            footer: "ID",
        },
        {
            Header: "Date of Birth",
            accessorKey: "dob",
            footer: "ID",
            cell: (info) => {
                const date = DateTime.fromISO(info.getValue());
                return date.toLocaleString(DateTime.DATE_MED);
            },
        },
    ];


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
            {/* <EmployeeTable /> */}
            {/* <BasicTable  columns={columns} data={data} /> */}
            <BasicTable columns={employeesColumns} data={employees} />
        </div>
    )
}

export default List