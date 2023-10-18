import { cn } from "../../lib/utils";
import React from "react";

type CustomInputProps = {
    label?: string;
    name: string;
    register?: any;
    errors?: any;
    isReactHookForm?: boolean;
    className?: string;
    type?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>

function CustomInput({
    label,
    name,
    register,
    errors,
    isReactHookForm = false,
    className,
    type = "text",
    ...rest
}: CustomInputProps) {
    const inputProps = isReactHookForm ? register(name) : null;
    return (
        <div className="flex flex-col w-full">
            <label htmlFor={name}
            >
                {label} :
            </label>
            <input
                className={cn(
                    "w-full py-4 pr-4 pl-3 rounded border-default border focus:outline-none transition-all",
                    errors?.name ? "border-red-500" : "border-black",
                    className
                )}
                type={type}
                id={name}
                {...inputProps}
                {...rest}
            // onChange={rest.onChange}
            />
            {(isReactHookForm && errors[name] && type !== "checkbox") ? (
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
    );
}

export default CustomInput;
