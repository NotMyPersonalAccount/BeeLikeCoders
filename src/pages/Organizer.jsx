import shallow from "zustand/shallow";
import { useOrganizerStore } from "../stores/useOrganizerStore";
import { usePreferenceStore } from "../stores/usePreferenceStore";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import iconBack from "../media/icon_back.png";
import iconExport from "../media/icon_export.png";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import background from "../media/background2.png";
import classNames from "classnames";
import { useState } from "react";

function Organizer() {
	const { name, onQuarterSystem, firstYear, lastYear } = usePreferenceStore(
		state => state,
		shallow
	);
	const { unscheduledClasses, insertUnscheduledClass, onDragEnd } =
		useOrganizerStore(state => state, shallow);

	return (
		<div className="m-4 md:m-8">
			<div className="flex flex-wrap ">
				<h1 className="w-8/12 flex-grow font-bold text-2xl">Courseload</h1>
				<div className="flex ">
					<Link to="/preferences" className="flex justify-center mx-4">
						<img className="w-5 h-5 mr-1" src={iconBack} alt="back" />
						<h2 className="font-bold">Go Back</h2>
					</Link>
					<div className="flex justify-center mx-4">
						<img className=" w-7" src={iconExport} alt="export" />
						<h2 className="font-bold"> Export to PDF</h2>
					</div>
				</div>
			</div>
			<div className="m-4 md:m-16">
				<h1 className="font-bold text-4xl">
					{(name ? name + "'s " : "") + (lastYear - firstYear + 1)} Year{" "}
					{onQuarterSystem ? "Quarter" : "Semester"} Organizer
				</h1>
				<p className="my-4 text-md">
					Enter your courses in the tables below. Drag and drop your required
					classes or classes you're interested in taking into this{" "}
					{onQuarterSystem ? "quarter " : "semester "}
					organizer below to arrange your courseload.
				</p>
				<div className="my-4">
					<DragDropContext onDragEnd={onDragEnd}>
						<table className="w-full">
							<thead>
								<tr>
									<th> Course Title</th>
									<th>Professor</th>
									<th>Pre-requisite</th>
								</tr>
							</thead>
							<Droppable droppableId="unscheduled">
								{provided => (
									<tbody ref={provided.innerRef} {...provided.droppableProps}>
										{unscheduledClasses.map((unscheduledClass, index) => (
											<tr>
												<Draggable
													draggableId={`unscheduled-${index}`}
													index={index}
													key={index}
												>
													{(provided, snapshot) => (
														<div
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															{snapshot.isDragging ? (
																<ClassCard _class={unscheduledClass}/>
															) : (
																<UnscheduledClassInput
																	unscheduledClass={unscheduledClass}
																	i={index}
																	_key="name"
																/>
															)}
														</div>
													)}
												</Draggable>
												<UnscheduledClassInput
													unscheduledClass={unscheduledClass}
													i={index}
													_key="professor"
												/>
												<UnscheduledClassInput
													unscheduledClass={unscheduledClass}
													i={index}
													_key="prerequisites"
												/>
											</tr>
										))}
										{provided.placeholder}
										<tr>
											<td
												onClick={() =>
													insertUnscheduledClass({
														name: "",
														professor: "",
														prerequisites: ""
													})
												}
												className="cursor-pointer"
											>
												New +
											</td>
										</tr>
									</tbody>
								)}
							</Droppable>
						</table>
						<div className="my-8">
							{Array(lastYear - firstYear + 1)
								.fill(0)
								.map((_, i) => (
									<Year yearIndex={i + 1} year={firstYear + i} key={i} />
								))}
						</div>
					</DragDropContext>
				</div>
				<div className="flex items-center">
					<span className="grow border-b-4 border-fuchsia-200 mb-1"></span>
					<span>
						<img className="w-80 " src={background} alt="" />
					</span>
					<span className="grow border-b-4 border-fuchsia-200 mb-1 "></span>
					<span>
						<Button
							className="text-sm bg-gradient-to-b from-fuchsia-200 to-fuchsia-50 hover:bg-fuchsia-100 rounded-full"
							onClick={() => (document.documentElement.scrollTop = 0)}
						>
							Back to Top ^
						</Button>
					</span>
				</div>
			</div>
		</div>
	);
}

function Year({ yearIndex, year }) {
	const seasons = useOrganizerStore(state => state.getYear(year), shallow);
	return (
		<>
			<h1>
				{yearIndex +
					(yearIndex === 1
						? "st"
						: yearIndex === 2
						? "nd"
						: yearIndex === 3
						? "rd"
						: "th")}{" "}
				Year
			</h1>
			<div className="ml-2 flex flex-wrap justify-between">
				{Object.keys(seasons).map(season => (
					<Season year={year} season={season} key={season} />
				))}
			</div>
		</>
	);
}

function Season({ year, season }) {
	const classes = useOrganizerStore(
		state => state.getSeason(year, season),
		shallow
	);
	const seasonColors = {
		Spring: "bg-green-200",
		Summer: "bg-yellow-200",
		Fall: "bg-orange-200",
		Winter: "bg-blue-200"
	};

	return (
		<div className="w-full lg:w-2/12 flex-grow mx-2">
			<h1
				className={classNames(
					seasonColors[season],
					"text-sm rounded-md px-1 inline-block"
				)}
			>
				{season} {year}
			</h1>
			<span className="px-2 text-gray-300 text-xs">{classes.length}</span>
			<Droppable droppableId={`${year}-${season}`}>
				{provided => (
					<div className="min-h-full " ref={provided.innerRef}>
						{classes.map((_class, i) => {
							return (
								<Draggable
									draggableId={`${year}-${season}-${i}`}
									index={i}
									key={i}
								>
									{provided => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<ClassCard _class={_class} />
										</div>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
}

function ClassCard({ _class }) {
	const [toggled, setToggled] = useState(false);
	return (
		<div
			className="border-gray border-2 px-2 py-1 my-2 rounded-md"
			onClick={() => setToggled(!toggled)}
		>
			<p className="font-semibold uppercase">{_class.name}</p>
			{toggled && (
				<>
					<p>Professor: {_class.professor}</p>
					<p>Pre-requisite: {_class.prerequisites}</p>
				</>
			)}
		</div>
	);
}

function UnscheduledClassInput({ unscheduledClass, i, _key }) {
	const updateUnscheduledClass = useOrganizerStore(
		state => state.updateUnscheduledClass,
		shallow
	);
	return (
		<td>
			<span className="drag"> ✥ </span>
			<div className="inline-block">
				<input
					className="w-full outline-none"
					onChange={e => updateUnscheduledClass(i, _key, e.target.value)}
					value={unscheduledClass[_key]}
				/>
			</div>
		</td>
	);
}

export default Organizer;
