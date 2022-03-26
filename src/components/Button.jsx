import classNames from "classnames";

function Button({ children, className, onClick }) {
	return (
		<button
			className={classNames(
				"bg-green-300 border-green-400 border-2 hover:bg-green-400 rounded-xl px-4 py-2",
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
