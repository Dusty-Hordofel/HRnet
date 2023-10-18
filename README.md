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
