import React, { useState } from 'react';

type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupProps = {
  options: RadioOption[];

  onChange?: (value: string) => any;
  label: string;
  lableStyle?: string;
  optionStyle?: string;
  required?: boolean
  selected?: any
};

const RadioGroup = ({ options, onChange, label, lableStyle, optionStyle, required, selected }: RadioGroupProps) => {

  const [selectedValue, setSelectedValue] = useState("selected")


  const handleSelectChange = (event: any) => {
    if (onChange) {
      onChange(event.target.value);
      setSelectedValue(event.target.value)

    }
  };

  console.log(selectedValue)
  return (
    <div className='flex flex-col' >
      <label className={lableStyle}>
        {label} {required ? <span className='  text-red-600 '>*</span> : ""}
      </label>
      <div className='flex items-center    w-full gap-4'>
        {options.map((option) => (

          <label key={option.value} className={optionStyle}>
            <input

              key={option.value}
              type="radio"
              value={option.value}
              checked={option.value === selected}
              onChange={handleSelectChange}
              className="form-radio text-blue-500  mx-3 p-3 w-[1.6875rem] h-[1.6875rem] "
            />
            <span >{option.label}</span>


          </label>

        ))}
      </div>
    </div>
  );
};

export default RadioGroup;