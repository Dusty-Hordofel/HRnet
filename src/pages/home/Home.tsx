import { useForm, FieldValues } from "react-hook-form";
import { useState } from "react";
import { Modal } from "hordofel-ui"
import { States } from "../../data/States";
import { Departments } from "../../data/Departments";
import { EmployeeType } from "../../types";
import { employeeSchema } from "../../schemas/employeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import { useEmployeesContext } from "../../context/EmployeesContext";
import { formatCustomDate } from "../../lib/utils";
import { Helmet } from "react-helmet";




const Home = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<EmployeeType>({ resolver: zodResolver(employeeSchema) });

    const [displayModal, setDisplayModal] = useState(false);
    const [employeeAlreadyExist, setEmployeeAlreadyExist] = useState(false);



    const { addEmployee, employees } = useEmployeesContext();


    const onSubmit = ({
        startDate,
        firstName,
        lastName,
        dateOfBirth,
        state,
        department,
        zipCode,
        street,
        city
    }: FieldValues) => {
        console.log("🚀 ~ file: Home.tsx:45 ~ Home ~ dateOfBirth:", typeof dateOfBirth)
        console.log("🚀 ~ file: Home.tsx:45 ~ Home ~ dateOfBirth:", formatCustomDate(dateOfBirth))



        const employee: any =
        {
            "firstName": firstName,
            "lastName": lastName,
            "dateOfBirth": dateOfBirth,
            "startDate": startDate,
            "state": state,
            "zipCode": zipCode,
            "street": street,
            "city": city,
            "department": department
        }


        //verify if the employee already exist
        const isEmployeeInTheContext = employees.some((item) => {
            return JSON.stringify(item) === JSON.stringify(employee);
        });

        //if the employee doesn't exist, add it to the context
        if (isEmployeeInTheContext === false) {
            setEmployeeAlreadyExist(false);
            addEmployee(employee);
            setDisplayModal(true);
            reset();
        } else {
            //if the employee already exist, display a message
            setEmployeeAlreadyExist(true);
            setDisplayModal(false);
            console.log("🚀 ~ file: Home.tsx:28 ~ Home ~ employeeAlreadyExist:", employeeAlreadyExist)
        }

    };

    return (
        <div className="flex justify-center min-h-screen pt-10">
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="RHnet Home Page" />
                <meta name="keywords" content="form,registration form,RHnet, home, page,registration" />
                <meta name="author" content="RHnet" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="index, follow" />
                <title>RHnet Home Page</title>
                <link rel="canonical" href="http://localhost:5174/" />
            </Helmet>
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
                            <Input
                                {...register('firstName')}
                                label="First name"
                                error={errors.firstName?.message}
                            />
                            <Input
                                {...register('lastName')}
                                label="Last name"
                                error={errors.lastName?.message}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                {...register('dateOfBirth', { valueAsDate: true })}
                                type="date"
                                label="Date of birth"
                                error={errors.dateOfBirth?.message}
                            />
                            <Input
                                {...register('startDate', { valueAsDate: true })}
                                type="date"
                                label="Start date"
                                error={errors.startDate?.message}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-2xl font-bold">Address</p>

                        <div className="flex gap-4 ">
                            <Select
                                {...register('state')}
                                label="State"
                                error={errors.state?.message}
                                options={States}
                            />
                            <Input
                                {...register('zipCode', { valueAsNumber: true })}
                                type="number"
                                label="Zip code"
                                error={errors.zipCode?.message}
                            />
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-2xl font-bold">Address</p>
                        <div className="flex gap-4 ">
                            <Input
                                {...register('street')}
                                label="Street"
                                error={errors.street?.message}
                            />
                            <Input
                                {...register('city')}
                                label="City"
                                error={errors.city?.message}
                            />
                        </div>
                    </div>

                    <Select
                        {...register('department')}
                        label="Department"
                        error={errors.department?.message}
                        options={Departments}
                    />

                    <button type="submit" className="w-full py-4 text-white bg-black rounded px-14">Save</button>

                </form>
            </div>
        </div>
    );
};

export default Home;





