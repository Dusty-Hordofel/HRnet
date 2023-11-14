import React from 'react';
import { cn } from '../../lib/utils';


interface Option {
    name: string,
    abbreviation: string
};

interface SelectProps {
    name: string;
    label: string;
    options: Option[];
    error?: string;
    required?: boolean;
    className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, error, name, className, label, required = true, ...rest }, ref) => (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className="text-gray-600">
                {label} {required && '*'}
            </label>
            <select
                {...rest}
                ref={ref}
                name={name}
                id={name}
                className={cn("border rounded py-4 pr-4", error ? "border-red-500" : "border-black", error ? 'ring-red-500' : 'ring-gray-300', className
                )}
                aria-invalid={error ? 'true' : 'false'}
            >
                {
                    options.map((option) => {
                        return <option key={option["name"]} value={option["abbreviation"]}>{option["name"]}</option>
                    })
                }
            </select>

            <p aria-live="polite" className="h-6 text-[10px]">
                {error && (
                    <span className="text-sm text-red-500" role="alert">
                        {error}
                    </span>
                )}
            </p>
        </div>
    )
);

export default Select;
