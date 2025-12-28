import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Import Firebase manual test (only in development)
if (process.env.NODE_ENV === 'development') {
	import('./utils/firebaseManualTest');
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<HelmetProvider>
			<BrowserRouter
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				<App />
			</BrowserRouter>
		</HelmetProvider>
	</React.StrictMode>
);

reportWebVitals();