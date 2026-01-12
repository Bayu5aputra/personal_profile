import React, { useEffect, useRef } from "react";
import anime from "animejs";
import "./styles/certifications.css";

const Certifications = () => {
	const sectionRef = useRef(null);
	const hasAnimatedRef = useRef(false);

	const certifications = [
		{
			id: 1,
			name: "MTCNA",
			fullName: "MikroTik Certified Network Associate",
			issuer: "MikroTik Akademia",
			badge: "/certifications/mikrotik_academy_logo.png",
			color: "#293239",
			date: "Feb 2026",
		},
		{
			id: 2,
			name: "BNSP - Network Infrastructure",
			fullName: "Network and Infrastructure",
			issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
			badge: "/certifications/bnsp_logo.png",
			color: "#C41E3A",
			date: "Jul 2027",
		},
		{
			id: 3,
			name: "Junior Network Administrator",
			fullName: "Junior Network Administrator (Vocational School Graduate Academy)",
			issuer: "Digital Talent Scholarship",
			badge: "/certifications/digital_talent_scholarship_logo.jpg",
			color: "#4A90E2",
			date: "Feb 2023",
		},
		{
			id: 4,
			name: "CCNA ITN",
			fullName: "CCNA: Introduction to Networks",
			issuer: "Cisco",
			badge: "/certifications/CCNAITN__1_.png",
			color: "#1BA0D7",
			date: "Sep 2023",
		},
		{
			id: 5,
			name: "CCNA SRWE",
			fullName: "CCNA: Switching, Routing, and Wireless Essentials",
			issuer: "Cisco",
			badge: "/certifications/CCNASRWE__1_.png",
			color: "#049FD9",
			date: "Sep 2023",
		},
		{
			id: 6,
			name: "Java Programming",
			fullName: "Java Programming",
			issuer: "Oracle",
			badge: "/certifications/oracle_logo.jpg",
			color: "#F80000",
			date: "Aug 2023",
		},
		{
			id: 7,
			name: "Java Fundamental",
			fullName: "Java Fundamental",
			issuer: "Oracle",
			badge: "/certifications/oracle_logo.jpg",
			color: "#F80000",
			date: "Feb 2023",
		},
		{
			id: 8,
			name: "IT Essentials",
			fullName: "IT Essentials",
			issuer: "Cisco",
			badge: "/certifications/ITE.png",
			color: "#1BA0D7",
			date: "Sep 2022",
		},
		{
			id: 9,
			name: "DevOps",
			fullName: "Belajar Dasar-Dasar DevOps",
			issuer: "Dicoding Indonesia",
			badge: "/certifications/dicoding_logo.jpg",
			color: "#00B8C5",
			date: "Sep 2024",
		},
		{
			id: 10,
			name: "Google Play Store",
			fullName: "Google Play Store Listing Certificate",
			issuer: "United Latino Students Association",
			badge: "/certifications/play_academy_certificate_v2.png",
			color: "#4285F4",
			date: "Sep 2024",
		},
		{
			id: 11,
			name: "Junior Web Developer",
			fullName: "Junior Web Developer (Vocational School Graduate Academy)",
			issuer: "Digital Talent Scholarship",
			badge: "/certifications/digital_talent_scholarship_logo.jpg",
			color: "#4A90E2",
			date: "Jan 2023",
		},
	];

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimatedRef.current) {
						hasAnimatedRef.current = true;

						anime({
							targets: ".certifications-title",
							opacity: [0, 1],
							translateY: [30, 0],
							duration: 800,
							easing: "easeOutExpo",
						});

						anime({
							targets: ".certifications-subtitle",
							opacity: [0, 1],
							translateY: [20, 0],
							delay: 200,
							duration: 800,
							easing: "easeOutExpo",
						});

						anime({
							targets: ".certification-card",
							opacity: [0, 1],
							scale: [0.85, 1],
							translateY: [50, 0],
							delay: anime.stagger(100, { start: 400 }),
							duration: 800,
							easing: "easeOutExpo",
						});

						observer.disconnect();
					}
				});
			},
			{ threshold: 0.2 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	const handleMouseEnter = (e) => {
		const badge = e.currentTarget.querySelector(".cert-badge");
		const glow = e.currentTarget.querySelector(".cert-glow");

		if (badge) {
			anime({
				targets: badge,
				scale: 1.1,
				rotate: 5,
				duration: 300,
				easing: "easeOutQuad",
			});
		}

		if (glow) {
			anime({
				targets: glow,
				opacity: 0.8,
				scale: 1.2,
				duration: 300,
				easing: "easeOutQuad",
			});
		}
	};

	const handleMouseLeave = (e) => {
		const badge = e.currentTarget.querySelector(".cert-badge");
		const glow = e.currentTarget.querySelector(".cert-glow");

		if (badge) {
			anime({
				targets: badge,
				scale: 1,
				rotate: 0,
				duration: 300,
				easing: "easeOutQuad",
			});
		}

		if (glow) {
			anime({
				targets: glow,
				opacity: 0.3,
				scale: 1,
				duration: 300,
				easing: "easeOutQuad",
			});
		}
	};

	return (
		<section className="certifications-section" ref={sectionRef}>
			<div className="certifications-header">
				<h2 className="certifications-title">
					Professional Certifications
				</h2>
				<p className="certifications-subtitle">
					Industry-recognized credentials validating expertise in networking
					and IT infrastructure
				</p>
			</div>

			<div className="certifications-grid">
				{certifications.map((cert) => (
					<div
						key={cert.id}
						className="certification-card"
						style={{ "--cert-color": cert.color }}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<div className="cert-card-inner">
							<div className="cert-glow" />

							<div className="cert-badge-wrapper">
								<div className="cert-liquid-bg" />
								<img
									src={cert.badge}
									alt={cert.name}
									className="cert-badge"
									onError={(e) => {
										e.target.style.display = 'none';
										console.error(`Failed to load badge: ${cert.badge}`);
									}}
								/>
							</div>

							<div className="cert-info">
								<h3 className="cert-name">{cert.name}</h3>
								<p className="cert-full-name">{cert.fullName}</p>
								<div className="cert-issuer">
									<span className="issuer-icon">✓</span>
									<span>{cert.issuer}</span>
								</div>
							</div>

							<div className="cert-shine" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Certifications;