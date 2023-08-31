import { StaticImageData } from 'next/image';
import React, { ChangeEvent, useState } from 'react';

type imageProp = {
	onChange: any;
	defaultValue?: string | Blob | null | undefined | StaticImageData;
	uploaderStyle?: string;
	label: string;
	labelStyle: string;
};

const ImageUploader = ({ onChange, defaultValue, uploaderStyle, label, labelStyle }: imageProp) => {
	const [image, setImage] = useState(defaultValue || '');
	const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		onChange(file);
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === FileReader.DONE) {
				setImage(reader.result as string);
			}
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};
	const handleRemoveImage = () => {
		setImage('');
	};

	return (
		<div className='flex flex-col'>
			<label className={labelStyle}>
				{label}
			</label>

			{image ? (

				<div
					className={`${uploaderStyle} bg-cover bg-center bg-no-repeat`}
					style={{ backgroundImage: `url(${image})` }}
				>
					<button
						onClick={handleRemoveImage}
						className="  rounded-lg bg-red-200 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-secondary"
					>
						Remove
					</button>

				</div>
			) : (
				<div className={uploaderStyle}>
					<label
						htmlFor="imageUpload"
						className="cursor-pointer text-gray-400   "
					>
						Click to upload an image
					</label>

					<input
						id="imageUpload"
						type="file"
						accept="image/*"
						className="sr-only"
						onChange={handleImageUpload}
					/>
				</div>
			)}

		</div>
	);
};

export default ImageUploader;
