import { usePreferenceStore } from "../stores/usePreferenceStore";
import shallow from "zustand/shallow";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useMemo } from "react";
import Button from "../components/Button";
import background from "../media/background2.png";

function Preferences() {
	const {
		name,
		setName,
		onQuarterSystem,
		setOnQuarterSystem,
		firstYear,
		setFirstYear,
		lastYear,
		setLastYear
	} = usePreferenceStore(state => state, shallow);
	return (
		<div className="flex flex-wrap h-full">
			<div className="flex flex-col md:w-4/12 lg:w-3/12 p-8 bg-orange-100">
				<h1 className="my-3 text-2xl font-bold">
					<Link to="/">Courseload</Link>
				</h1>
				<div className="flex flex-grow items-center">
					<img className="h-auto" src={background} alt="" />
				</div>
			</div>
			<div className="mx-8 my-8 flex flex-col flex-grow items-center justify-center">
				<h1 className="font-bold text-3xl text-center">Tell Us About You</h1>
				<PreferenceSection>
					<PreferenceLabel>Your Name</PreferenceLabel>
					<Input
						className="block"
						placeholder="Name"
						value={name}
						onChange={e => setName(e.target.value)}
					/>
				</PreferenceSection>

				<PreferenceSection>
					<PreferenceLabel>
						Are you on the Semester System or Quarter System?
					</PreferenceLabel>
					<p className="switch">Semester</p>
					<label className="switch mx-3">
						<input
							className="opacity-0 w-0 h-0"
							type="checkbox"
							defaultChecked={false}
							onChange={() => console.log(1)}
						/>
						<span className="slider round"></span>
					</label>
					<p className="switch">Quarter</p>
				</PreferenceSection>

				<PreferenceSection>
					<YearSelector
						label="First"
						value={firstYear}
						start={new Date().getFullYear()}
						setter={setFirstYear}
					/>
					<YearSelector label="Last" value={lastYear} start={firstYear} setter={setLastYear} />
				</PreferenceSection>

				<PreferenceSection>
					<Link to="/organizer">
						<Button>Let's Go!</Button>
					</Link>
					<p className="text-xs text-gray-500 my-1">
						You can go back and change your answers at any time.
					</p>
				</PreferenceSection>
			</div>
		</div>
	);
}

function PreferenceLabel({ children }) {
	return <h2 className="font-bold my-2">{children}</h2>;
}

function PreferenceSection({ children }) {
	return <div className="my-4 text-center">{children}</div>;
}

function YearSelector({ label, start, setter }) {
	const yearOptions = useMemo(
		() =>
			Array(10)
				.fill(0)
				.map((_, i) => (
					<option key={i} value={i + start}>
						{i + start}
					</option>
				)),
		[start]
	);

	return (
		<div className="inline-block mx-2">
			<PreferenceLabel>{label} Year You're Organizing</PreferenceLabel>
			<select
				className="border-2 border-black hover:border-blue-400 focus:border-blue-600 rounded-lg px-2"
				onChange={e => setter(parseInt(e.target.value))}
			>
				{yearOptions}
			</select>
		</div>
	);
}

export default Preferences;
