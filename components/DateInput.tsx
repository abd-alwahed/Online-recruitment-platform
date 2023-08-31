import React, { useState, useEffect } from 'react';

type Props = {
    Dateprops?: any;
    Datestyle: string;
    label: string;
    lableStyle: string;
    disable?: boolean;
    required?: boolean
    onChange: (date: string) => void;
    selected?: any
};

const DateInput = ({ onChange, Dateprops, Datestyle, label, lableStyle, disable, required, selected }: Props) => {
    const [selectedDate, setSelectedDate] = useState('');


    const handleDateChange = (event: any) => {
        if (onChange) {
            onChange(event.target.value);
            setSelectedDate(event.target.value)
        }
    };


    return (
        <div className='flex flex-col'>
            <label className={lableStyle}>
                {label} {required ? <span className='  text-red-600 '>*</span> : ""}
            </label>
            <input

                {...Dateprops}
                type="date"
                value={selectedDate || selected}
                onChange={handleDateChange}
                className={` ${disable ? Datestyle + "  bg-gray-200" : Datestyle} inputStyle`}
                disabled={disable}

            />


        </div>

    );
};

export default DateInput;
