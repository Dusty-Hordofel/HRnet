import { Chevron } from '../../icons';
import { cn } from '../../lib/utils';
import React from 'react'

type DropdownProps = {
    label?: string;
    name: string;
    register?: any;
    errors?: any;
    isReactHookForm?: boolean;
    className?: string;
    type?: string | number;
    optionsList: {
        name: string,
        abbreviation: string
    }[]
} & React.InputHTMLAttributes<HTMLInputElement>

const Dropdown = ({ register, name, errors, optionsList }: DropdownProps) => {
    return (
        <div className='flex flex-col'>
            <div className="w-full py-4 pr-4 pl-3 rounded border-black border focus:outline-none transition-all flex justify-between relative bg-white">
                <select
                    {...register(name)}
                    id={name}
                    name={name}
                    autoComplete="off"
                    style={{ appearance: "none" }}
                    className="w-full bg-clear z-10 focus:outline-none bg-red-200/0"
                    aria-invalid="true"
                    aria-required="false"
                >

                    {
                        optionsList.map((option, index) => {
                            return <option key={index} value={option["abbreviation"]}>{option["name"]}</option>
                        })
                    }
                </select>
                <div className="absolute right-4  z-[1]" aria-hidden="true">
                    <span data-testid="dropdown-value-display"></span>
                    <Chevron />
                </div>
            </div>
            {(errors[name]) ? (
                <p
                    className={cn(
                        "text-destructive text-xs transition-all ease px-4",
                        errors[name] ? "px-4 h-[18px] pt-[6px]" : "h-0"
                    )}
                >
                    {errors[name]?.message}
                </p>
            ) : null}
        </div>
    )
}

export default Dropdown