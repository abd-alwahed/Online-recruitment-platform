import React from 'react';

type props = {
  textareaProps: any;
  textareaStyle: string;
  label: string;
  lableStyle?: string;

};

const TextArea = ({ textareaProps, textareaStyle, label, lableStyle }: props) => {

  return (
    <div className='flex flex-col'>
      <label className={lableStyle}>
        {label}
      </label>
      <textarea


        {...textareaProps}
        className={`${textareaStyle} `}
      />
    </div>
  );
};

export default TextArea;
