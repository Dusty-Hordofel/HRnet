# Project 14: HRNET

## Purpose:

### 1. Header

- create [Header](src/components/header/Header.tsx)

```ts
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import logo from "../../../public/logo.jpg";
import { Add, Circle, List } from "../../icons";

const Header = () => {
  return (
    <nav className="bg-red-500 flex justify-between w-screen px-[10vh]">
      <Logo
        src={logo}
        title="Wealth Health"
        alt="Logo de Wealth Health"
        className="w-20 h-20"
      />
      <div className="flex gap-5 items-center">
        <NavLink
          to="/create"
          className="flex items-center gap-1 bg-black w-max text-white py-2 px-4 rounded-full hover:bg-black/70 h-max"
        >
          <Add />
          <span>Create a new employee</span>
        </NavLink>
        <NavLink
          to="/list"
          className="flex items-center gap-1 bg-black w-max text-white py-2 px-4 rounded-full hover:bg-black/70 h-max"
        >
          <List />
          <span>View current employee(s)</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
```

### 2. Home Page and Forms

- install dependencies

```bash
$ npm install @mui/x-date-pickers
$ npm install date-fns
$ npm install @mui/material @emotion/react @emotion/styled
$ npm i zod

```

- create [employee forms](src/pages/home/Home.tsx)

```ts
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useForm, Controller, FieldValues } from "react-hook-form";
import CustomInput from "../../components/ui/CustomInput";
import States from "../../assets/data/States.json";
import Departments from "../../assets/data/Departments.json";
import Dropdown from "../../components/ui/Dropdown";

const formatDateLocaly = (data: string) => {
  const date = new Date(data);
  const formattedDate = format(date, "dd/MM/yyyy", { locale: fr });
  return { formattedDate };
};
const Home = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({
    startdate,
    firstName,
    lastName,
    dateOfBirth,
    states,
    departments,
    code,
    street,
    city,
  }: FieldValues) => {
    const { formattedDate: begin } = formatDateLocaly(startdate);
    const { formattedDate: birth } = formatDateLocaly(dateOfBirth);

    const employee = {
      "First name": firstName,
      "Last name": lastName,
      "Date of birth": birth,
      "Start date": begin,
      State: states,
      "ZIP code": code,
      Street: street,
      City: city,
      Department: departments,
    };

    /* Get the list of current employees */
    const storedData = localStorage.getItem("employees");
    const employees = storedData ? JSON.parse(storedData) : [];
    /* Add the employee to the list */
    employees.push(employee);
    /* Save the list of employees in the local storage */
    localStorage.setItem("employees", JSON.stringify(employees));
  };

  return (
    <div className="flex justify-center min-h-screen pt-10">
      <div className="flex flex-col max-w-[532px] px-9 w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-bold mb-2">Informations</p>
            <div className="flex gap-4 ">
              <CustomInput
                name="lastName"
                placeholder="LastName"
                errors={errors}
                register={register}
                isReactHookForm
                type="text"
                label="LastName"
                className=""
              />
              <CustomInput
                name="firstName"
                placeholder="FirstName"
                errors={errors}
                register={register}
                isReactHookForm
                type="text"
                label="FirstName"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <p>Date Of Birth :</p>
                <Controller
                  control={control}
                  name="dateOfBirth"
                  defaultValue={new Date()} // Set the initial value to the current date
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={onChange}
                        value={value ? new Date(value) : null}
                        className="w-full bg-white rounded border border-black"
                        // locale={fr}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <p>Start date :</p>
                <Controller
                  control={control}
                  name="startdate"
                  defaultValue={new Date()} // Set the initial value to the current date
                  render={({ field: { onChange, value } }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        onChange={onChange}
                        value={value ? new Date(value) : null}
                        className="w-full bg-white rounded border border-black"
                        // locale={fr}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold mb-2">Address</p>

            <div className="flex gap-4 ">
              <div>
                <span>States :</span>
                <Dropdown
                  register={register}
                  name="states"
                  errors={errors}
                  optionsList={States}
                  className="w-full"
                />
              </div>
              <CustomInput
                name="code"
                placeholder="Your zip code"
                errors={errors}
                register={register}
                isReactHookForm
                type="number"
                label="Zip Code"
              />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold mb-2">Address</p>
            <div className="flex gap-4 ">
              <CustomInput
                name="street"
                placeholder="Your street name"
                errors={errors}
                register={register}
                isReactHookForm
                type="text"
                label="Street"
                className=""
              />
              <CustomInput
                name="city"
                placeholder="Your city name"
                errors={errors}
                register={register}
                isReactHookForm
                type="text"
                label="City"
              />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold mb-4">Department</p>
            <div>
              <span>Department :</span>
              <Dropdown
                register={register}
                name="departments"
                errors={errors}
                optionsList={Departments}
                className="w-full"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-black  text-white px-14 py-4 rounded w-full"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
```

### 3. Modal Package

- create [Modal Package]() on [hordofel-ui library ]()
- use [hordofel-ui library ]() on [HomePage]()

### 4. Employees table

- install [react-table](https://tanstack.com/table/v8/docs/guide/installation)

```bash
$ npm install @tanstack/react-table
```

- create [BasicTable](/Users/dustyhordofelbamana/Documents/GitHub/wealth/src/components/BasicTable.jsx)

```jsx
import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const BasicTable = ({ data, columns }) => {
  console.log("🚀 ~ file: BasicTable.jsx:14 ~ BasicTable ~ data:", data);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  //create a table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="w3-container">
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search..."
        className="mb-4 w3-input w3-border w3-round"
      />
      <table className="w3-table-all">
        {/* table header */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* table body */}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

        {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
      </table>
      <div className="flex gap-5 p-5 text-white">
        <button
          onClick={() => table.setPageIndex(0)}
          className="px-4 py-4 text-white bg-black border"
        >
          First page
        </button>
        <button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          className="px-4 py-4 text-white bg-black border"
        >
          Previous page
        </button>
        <button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          className="px-4 py-4 text-white bg-black border"
        >
          Next page
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          className="px-4 py-4 text-white bg-black border"
        >
          Last page
        </button>
      </div>
    </div>
  );
};

export default BasicTable;
```

- create [EmployeeTable](src/components/employee/EmployeeTable.jsx)

```jsx
import React from "react";
import BasicTable from "../ui/BasicTable";

const EmployeeTable = ({ data, columns }) => {
  return <BasicTable data={data} columns={columns} />;
};

export default EmployeeTable;
```

### 5. List Page

- create [List](src/pages/List/List.tsx)

```jsx
import EmployeeTable from "../../components/employee/EmployeeTable";

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
  ];

  /* Get the list of current employees */
  const storedData = localStorage.getItem("employees");
  const employees = storedData ? JSON.parse(storedData) : [];

  return (
    <div>
      <EmployeeTable columns={employeesColumns} data={employees} />
    </div>
  );
};

export default List;
```

## Section 2: Performance

### 6. Compare Performance

- add [Lighthouse repport](lighthouse-repport) for performance.

### 7. improving performances

- unistall dependencies

```bash
$ npm un @mui/x-date-pickers
$ npm un date-fns
$ npm un @mui/material @emotion/react @emotion/styled

```

- create [EmployeesContext](src/context/EmployeesContext.tsx)

```ts
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { EmployeeType, EmployeesType } from "../types";
import { employees as defaultEmployees } from "../data/employees";

type EmployeesContextProps = {
  employees: EmployeesType;
  addEmployee: (newEmployee: EmployeeType) => void;
};

export const EmployeesContext = createContext<EmployeesContextProps>({
  employees: [],
  addEmployee: () => {
    // Empty function
  },
});

export const EmployeesProvider = ({ children }: PropsWithChildren) => {
  const [employees, setEmployees] = useState<EmployeesType>(defaultEmployees);

  console.log(
    "🚀 ~ file: EmployeesContext.tsx:20 ~ EmployeesProvider ~ defaultEmployees:",
    defaultEmployees
  );

  // Load data from local storage during component assembly
  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  // Backup data in local storage whenever employees change
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (newEmployee: EmployeeType) => {
    setEmployees([...employees, newEmployee]);
  };

  return (
    <EmployeesContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeesContext.Provider>
  );
};

//custom hook to access the employees context
export const useEmployeesContext = (): EmployeesContextProps => {
  const context = useContext(EmployeesContext);

  if (!context) {
    throw new Error(
      "useEmployeesContext must be used inside the EmployeesProvider"
    );
  }

  return context;
};
```

- format table dates
