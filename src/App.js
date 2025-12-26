import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";

import Homepage from "./pages/homepage";
import About from "./pages/about";
import Projects from "./pages/projects";
import Articles from "./pages/articles";
import ReadArticle from "./pages/readArticle";
import Contact from "./pages/contact";
import Notfound from "./pages/404";
import ProductDetail from "./pages/productDetail"; // TAMBAHAN
import LoadingScreen from "./components/homepage/LoadingScreen";

import { TRACKING_ID } from "./data/tracking";
import "./app.css";

function App() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	const handleLoadingComplete = () => {
		setIsLoading(false);
		document.body.classList.remove('loading');
		document.body.classList.add('loaded');
		
		setTimeout(() => {
			const loadingElement = document.querySelector('.loading-screen');
			if (loadingElement) {
				loadingElement.remove();
			}
		}, 1500);
	};

	useEffect(() => {
		document.body.classList.add('loading');
	}, []);

	return (
		<div className="App">
			{isLoading && (
				<LoadingScreen onLoadingComplete={handleLoadingComplete} />
			)}
			
			<div className={`main-content ${isLoading ? 'content-hidden' : 'content-visible'}`}>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/articles" element={<Articles />} />
					<Route path="/article/:slug" element={<ReadArticle />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/product/:id" element={<ProductDetail />} /> {/* TAMBAHAN */}
					<Route path="*" element={<Notfound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;