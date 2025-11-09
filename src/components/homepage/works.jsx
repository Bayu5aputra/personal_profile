import React from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

import Card from "../common/card";

import "./styles/works.css";

const Works = () => {
	return (
		<div className="works">
			<Card
				icon={faBriefcase}
				title="Work Experience"
				body={
					<div className="works-body">
						<div className="work">
							<div className="work-left">
								<img
									src="./sinarmasland.png"
									alt="Sinar Mas Land"
									className="work-image"
								/>
							</div>
							<div className="work-right">
								<div className="work-header">
									<div className="work-title">Sinar Mas Land</div>
									<div className="work-duration">Sep 2025 - Present</div>
								</div>
								<div className="work-subtitle">
									IT Infrastructure
								</div>
							</div>
						</div>

						<div className="work">
							<div className="work-left">
								<img
									src="./damaiputra.png"
									alt="Damai Putra Group"
									className="work-image"
								/>
							</div>
							<div className="work-right">
								<div className="work-header">
									<div className="work-title">Damai Putra Group</div>
									<div className="work-duration">Dec 2024 - Jun 2025</div>
								</div>
								<div className="work-subtitle">
									IT Support Intern
								</div>
							</div>
						</div>

						<div className="work">
							<div className="work-left">
								<img
									src="./baznas.png"
									alt="BAZNAS Kota Bekasi"
									className="work-image"
								/>
							</div>
							<div className="work-right">
								<div className="work-header">
									<div className="work-title">BAZNAS Kota Bekasi</div>
									<div className="work-duration">Nov 2024 - Dec 2024</div>
								</div>
								<div className="work-subtitle">
									Web Development Intern
								</div>
							</div>
						</div>

						<div className="work">
							<div className="work-left">
								<img
									src="./komdigi.png"
									alt="Kominfo Bekasi"
									className="work-image"
								/>
							</div>
							<div className="work-right">
								<div className="work-header">
									<div className="work-title">Kominfo Bekasi</div>
									<div className="work-duration">Oct 2024 - Nov 2024</div>
								</div>
								<div className="work-subtitle">
									Network Technician Intern
								</div>
							</div>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default Works;