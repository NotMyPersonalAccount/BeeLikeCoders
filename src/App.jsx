import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Preferences from "./pages/Preferences";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="preferences" element={<Preferences />} />
				<Route path="organizer" element="TODO" />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
