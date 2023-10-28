import { ColumnDef } from "@tanstack/react-table"

interface EmployeeProps {
    "first_name": string,
    "last_name": string,
    "date_of_birth": string,
    "start_date": string,
    "state": string,
    "zip_code": string,
    "street": string,
    "city": string,
    "department": string
}
export const columns: ColumnDef<EmployeeProps>[] = [
    {
        accessorKey: "first_name",
        header: "First name",
    },
    {
        accessorKey: "last_name",
        header: "Last name",
    },
    {
        accessorKey: "date_of_birth",
        header: "Date of birth",
    },
    {
        accessorKey: "start_date",
        header: "Start date",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "zip_code",
        header: "ZIP code",
    },
    {
        accessorKey: "street",
        header: "street",
    },
    {
        accessorKey: "city",
        header: "city",
    },
    {
        accessorKey: "Department",
        header: "Department",
    },
    // {
    //     accessorKey: "",
    //     header: "ID",
    // },
]