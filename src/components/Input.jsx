import classNames from "classnames";

function Input({ className, value, placeholder, onChange }) {
	return (
		<input
			className={classNames(
				"border-2 border-black hover:border-blue-400 focus:border-blue-600 outline-none px-2 rounded-lg",
				className
			)}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
}

export default Input;
