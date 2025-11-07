import React, { useEffect, useRef } from "react";
import "./styles/footer.css";

const Footer = () => {
	const footerRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('footer-visible');
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (footerRef.current) {
			observer.observe(footerRef.current);
		}

		return () => {
			if (footerRef.current) {
				observer.unobserve(footerRef.current);
			}
		};
	}, []);

	return (
		<div className="footer" ref={footerRef}>
			<div className="footer-3d-card">
				<div className="footer-3d-inner">
					<div className="footer-content">
						<div className="footer-main-text">
							© 2025 Bayu Saputra
						</div>
						<div className="footer-sub-text">
							All Rights Reserved
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;