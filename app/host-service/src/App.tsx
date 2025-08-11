import { Routes, Route } from "react-router-dom";
import { routes } from "./router/routes";
import BaseLayout from "./layout/BaseLayout";

function App() {
	return (
		<Routes>
			<Route path="/" element={<BaseLayout />}>
				{routes.map((route) => (
					<Route key={route.path} path={route.path} element={route.element} />
				))}
			</Route>
		</Routes>
	)
}

export default App;