import React, { ChangeEvent, ReactNode } from 'react';
import Select from 'react-select';

type Props = {
	selectProps: any
	onChange?: (value: string) => void;
	selectStyle?: string;
	label: string;
	lableStyle?: string;
	required?: boolean;
	isMulti?: boolean;
	options: any
};
const SelectX = ({ selectProps, selectStyle, label, lableStyle, onChange, required, isMulti = false, options }: Props) => {
	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(event.target.value);
		}
	};
	return (
		<div className='flex flex-col '>
			<label className={lableStyle}>
				{label}  {required ? <span className='  text-red-600 '>*</span> : ""}
			</label>
			<Select

				options={options}
				isMulti={isMulti}
				className={selectStyle.replace('border-b', '')}
				{...selectProps}
			/>
		</div>
	);
};

export default SelectX;
