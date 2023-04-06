import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Page/Login";
import Home from "./Page/Home";
import Register from "./Page/Register";
import AddBook from "./Page/AddBook";
import UpdateBook from "./Page/UpdateBook";
import BookDetail from "./Page/DetailBook";

function App() {
	return (
		<ChakraProvider>
			<Router>
				<Routes>
					<Route path="/" Component={Home} />
					<Route path="/books/:id" Component={BookDetail} />
					<Route path="/login" Component={Login} />
					<Route path="/register" Component={Register} />
					<Route
						path="/addbook"
						element={
							<ProtectedRoute>
								<AddBook />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/editbook/:id"
						element={
							<ProtectedRoute>
								<UpdateBook />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</ChakraProvider>
	);
}

function ProtectedRoute({ children }) {
	if (!localStorage.getItem("token")) {
		return <Navigate to="/login" replace />;
	}

	return children;
}

export default App;
