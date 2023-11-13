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
import { useState } from "react";
import { Modal } from "hordofel-ui"
import Dates from "../../components/ui/Dates";
// import { SignUpFormSchema, SignUpFormValues } from "../../validators/schema-validator";
// import { zodResolver } from "@hookform/resolvers/zod";


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
        reset
    } = useForm/*<SignUpFormValues>*/(/*{ resolver: zodResolver(SignUpFormSchema) }*/);

    // const [modalReset, setModalReset] = useState(false);
    const [displayModal, setDisplayModal] = useState(false);


    const onSubmit = ({
        startdate,
        firstName,
        lastName,
        dateOfBirth,
        states,
        departments,
        code,
        street,
        city
    }: FieldValues) => {
        const { formattedDate: begin } = formatDateLocaly(startdate);
        const { formattedDate: birth } = formatDateLocaly(dateOfBirth);
        console.log("🚀 ~ file: Home.tsx:43 ~ Home ~ firstName:", begin, firstName, birth, departments)

        const employee =
        {
            "first_name": firstName,
            "last_name": lastName,
            "date_of_birth": birth,
            "start_date": begin,
            "state": states,
            "zip_code": code,
            "street": street,
            "city": city,
            "department": departments
        }

        /* Get the list of current employees */
        const storedData = localStorage.getItem("employees");
        const employees = storedData ? JSON.parse(storedData) : [];
        /* Add the employee to the list */
        employees.push(employee);
        /* Save the list of employees in the local storage */
        localStorage.setItem("employees", JSON.stringify(employees));
        setDisplayModal(true);
        reset()

    };

    return (
        <div className="flex justify-center min-h-screen pt-10">
            <div className="flex flex-col max-w-[532px] px-9 w-full">
                <Modal showModal={displayModal}>
                    <p className="text-lg text-white">Employee Created !</p>
                    <span className="absolute block text-xs text-white cursor-pointer right-3 top-3 icon" onClick={() => setDisplayModal(false)}>
                        Close
                    </span>
                </Modal>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <p className="mb-2 text-2xl font-bold">Informations</p>
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
                                <Dates>
                                    <Controller
                                        control={control}
                                        name="dateOfBirth"
                                        defaultValue={new Date()} // Set the initial value to the current date
                                        render={({ field: { onChange, value } }) => (
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    onChange={onChange}
                                                    value={value ? new Date(value) : null}
                                                    className="w-full bg-white border border-black rounded"
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                </Dates>
                            </div>
                            <div className="flex flex-col">
                                <p>Start date :</p>
                                <Dates>
                                    <Controller
                                        control={control}
                                        name="startdate"
                                        defaultValue={new Date()} // Set the initial value to the current date
                                        render={({ field: { onChange, value } }) => (
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    onChange={onChange}
                                                    value={value ? new Date(value) : null}
                                                    className="w-full bg-white border border-black rounded"
                                                // locale={fr}
                                                />
                                            </LocalizationProvider>
                                        )}
                                    />
                                </Dates>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-2xl font-bold">Address</p>

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
                        <p className="mb-2 text-2xl font-bold">Address</p>
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
                        <p className="mb-4 text-2xl font-bold">Department</p>
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

                    <button type="submit" className="w-full py-4 text-white bg-black rounded px-14">Save</button>

                </form>
            </div>
        </div>
    );
};

export default Home;



