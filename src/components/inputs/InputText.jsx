import React from "react";

const InputText = React.forwardRef(({ id = "", help = "", label = "", type = "text",  defaultValue = "" ,onChange }, ref) => {
    return (
        <div className="relative w-full">
            {/* Label outside the input */}
            <label
                htmlFor={id}
                className="block mb-1 text-sm font-medium text-gray-700"
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                onChange={onChange}
                placeholder={help}
                defaultValue ={defaultValue}
                className="w-full border-0 border-b-2 border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-900 focus:border-beige focus:outline-none focus:ring-0"
                ref={ref}
            />
        </div>
    );
});

export default InputText;
