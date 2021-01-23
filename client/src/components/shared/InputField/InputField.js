import React from 'react';
import './InputField.css';

function InputField(props) {
	return (
		<div className="input-field-container">
			<input
				id={props.id}
				value={props.value}
				error={props.error}
				type={props.type}
				placeholder={props.placeholder}
				className={props.className}
				onChange={props.onChange}
			/>
			<span className="red-text">{props.error}</span>
		</div>
	);
}

export default InputField;
