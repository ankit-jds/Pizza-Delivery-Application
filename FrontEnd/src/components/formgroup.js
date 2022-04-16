import React from "react";

function FormGroup({ type, name, display_name, inputValue, onChangeFunction }) {
    return (
      <>
        <label className='block font-medium' htmlFor={name}>
          {display_name}
          <input
            className='border-2 ml-2'
            type={type}
            name={name}
            id={name}
            value={inputValue}
            onChange={onChangeFunction}></input>
        </label>
      </>
    );
  }

export default FormGroup;