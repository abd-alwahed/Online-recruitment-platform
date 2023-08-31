import React from 'react';

type props = {
	inputProps: any;
	inputStyle: string;
	label: string;
	lableStyle: string;
	disable?: boolean;
	required?: boolean
};

const Input = ({ inputProps, inputStyle, label, lableStyle, disable, required }: props) => {

	return (
		<div className='flex flex-col'>
			<label className={lableStyle}>
				{label} {required ? <span className='  text-red-600 '>*</span> : ""}
			</label>
			<input

				{...inputProps}
				className={` ${disable ? inputStyle + "  bg-gray-200" : inputStyle} inputStyle`}
				disabled={disable}

			/>


		</div>

	);
};

export default Input;
