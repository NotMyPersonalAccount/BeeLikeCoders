import produce from "immer";
import create from "zustand";

export const useOrganizerStore = create((set, get) => ({
	unscheduledClasses: [],
	insertUnscheduledClass: _class => {
		set(
			produce(state => {
				state.unscheduledClasses.push(_class);
			})
		);
	},
	updateUnscheduledClass: (index, key, value) => {
		set(
			produce(state => {
				state.unscheduledClasses[index][key] = value;
			})
		);
	},
	removeUnscheduledClass: index => {
		set(
			produce(state => {
				state.unscheduledClasses.splice(index, 1);
			})
		);
	},
	reorderUnscheduledClasses: (index1, index2) => {
		set(
			produce(state => {
				const [removed] = state.unscheduledClasses.splice(index1, 1);
				state.unscheduledClasses.splice(index2, 0, removed);
			})
		);
	},

	scheduledClasses: {},
	getYear: year => {
		if (!get().scheduledClasses[year]) {
			set(
				produce(state => {
					state.scheduledClasses[year] ??= {
						Spring: [],
						Summer: [],
						Fall: [],
						Winter: []
					};
				})
			);
		}
		return get().scheduledClasses[year];
	},
	getSeason: (year, season) => {
		return get().scheduledClasses[year][season];
	},
	insertClass: (year, season, _class) => {
		set(
			produce(state => {
				state.scheduledClasses[year][season].push(_class);
			})
		);
	},
	removeClass: (year, season, index) => {
		set(
			produce(state => {
				state.scheduledClasses[year][season].splice(index, 1);
			})
		);
	},
	reorderClasses: (year, season, index1, index2) => {
		set(
			produce(state => {
				const [removed] = state.scheduledClasses[year][season].splice(
					index1,
					1
				);
				state.scheduledClasses[year][season].splice(index2, 0, removed);
			})
		);
	},

	onDragEnd: ({ draggableId, source, destination }) => {
		if (!destination) return;

		const {
			insertUnscheduledClass,
			reorderUnscheduledClasses,
			removeUnscheduledClass,
			unscheduledClasses,

			insertClass,
			reorderClasses,
			removeClass,
			getSeason
		} = get();

		const [sYear, sSeason] = source.droppableId.split("-");
		const [dYear, dSeason] = destination.droppableId.split("-");
		if (source.droppableId === "unscheduled") {
			if (destination.droppableId === "unscheduled") {
				reorderUnscheduledClasses(source.index, destination.index);
				return;
			}
			insertClass(dYear, dSeason, unscheduledClasses[source.index]);
			reorderClasses(
				dYear,
				dSeason,
				getSeason(dYear, dSeason).length - 1,
				destination.index
			);
			removeUnscheduledClass(source.index);
			return;
		}
		if (destination.droppableId === "unscheduled") {
			insertUnscheduledClass(getSeason(sYear, sSeason)[source.index]);
			reorderUnscheduledClasses(unscheduledClasses.length, destination.index);
			removeClass(sYear, sSeason, source.index);
			return;
		}
		if (sYear === dYear && sSeason === dSeason) {
			reorderClasses(sYear, sSeason, source.index, destination.index);
			return;
		}
		insertClass(dYear, dSeason, getSeason(sYear, sSeason)[source.index]);
		reorderClasses(
			dYear,
			dSeason,
			getSeason(dYear, dSeason).length - 1,
			destination.index
		);
		removeClass(sYear, sSeason, source.index);
	}
}));
