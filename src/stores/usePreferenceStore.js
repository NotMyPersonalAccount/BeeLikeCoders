import create from "zustand";

export const usePreferenceStore = create(set => ({
	name: "",
	setName: name => set({ name }),

	onQuarterSystem: true,
	setOnQuarterSystem: onQuarterSystem => set({ onQuarterSystem }),

	firstYear: new Date().getFullYear(),
	setFirstYear: firstYear => set({ firstYear }),
	lastYear: new Date().getFullYear(),
	setLastYear: lastYear => set({ lastYear })
}));
