import React, { useState } from "react";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Card from "../common/card";
import WorkDetailModal from "./WorkDetailModal";
import "./styles/works.css";

const Works = () => {
	const [selectedWork, setSelectedWork] = useState(null);

	const workExperiences = [
		{
			id: 1,
			company: "Sinar Mas Land",
			position: "IT Infrastructure",
			duration: "Sep 2025 - Present",
			location: "South Tangerang, Indonesia",
			logo: "./sinarmasland.png",
			responsibilities: [
				"Identified and diagnosed malfunctions in ATCS (Area Traffic Control System) devices",
				"Performed repairs and maintenance on ATCS hardware and system components",
				"Managed and resolved technical support tickets related to ATCS system repairs",
				"Maintained IoT devices deployed in the field, including flood sensors, soil sensors, and rain meters",
				"Developed and implemented a device monitoring system for the ATCS network using Grafana and Docker",
				"Completed foundational training on ATCS and IoT device management"
			],
			technologies: ["ATCS", "IoT", "Grafana", "Docker", "Network Management"],
			achievements: [
				"Successfully implemented monitoring system reducing device downtime by 40%",
				"Managed 50+ IoT devices across multiple locations",
				"Resolved 95% of technical tickets within SLA"
			]
		},
		{
			id: 2,
			company: "Damai Putra Group",
			position: "IT Support Intern",
			duration: "Dec 2024 - Jun 2025",
			location: "Bekasi City, Indonesia",
			logo: "./damaiputra.png",
			responsibilities: [
				"Identified, analyzed, and resolved technical issues related to hardware, software, and network systems",
				"Configured, maintained, and troubleshooted LAN/WAN, VPNs, and firewalls to ensure network stability and security",
				"Managed Windows/Linux servers, Active Directory, and system backups for optimal performance and data protection",
				"Provided technical support and training to users, ensuring high satisfaction and minimal downtime",
				"Implemented IT security measures, conducted threat analysis, and enforced data protection best practices",
				"Installed, updated, and troubleshooted software applications to support business operations",
				"Applied ITIL frameworks to enhance IT service management and operational efficiency",
				"Developed and maintained technical documentation, reports, and user guides",
				"Collaborated with cross-functional teams to address IT challenges effectively",
				"Managed IT assets, ensuring proper tracking, maintenance, and optimization"
			],
			technologies: ["Windows Server", "Linux", "Active Directory", "VPN", "Firewall", "ITIL"],
			achievements: [
				"Reduced average ticket resolution time by 35%",
				"Implemented security protocols preventing 15+ potential security breaches",
				"Maintained 99.5% network uptime across all locations"
			]
		},
		{
			id: 3,
			company: "BAZNAS Kota Bekasi",
			position: "Web Development Intern",
			duration: "Nov 2024 - Dec 2024",
			location: "Bekasi City, Indonesia",
			logo: "./baznas.png",
			responsibilities: [
				"Developed a Zakat, Infak, and Sedekah dashboard using Looker Studio by Google to monitor data and fund collection performance",
				"Built a web-based email broadcast system for mass distribution, enhancing communication with donors and beneficiaries",
				"Designed a structured marketing strategy to strengthen communication and raise public awareness of BAZNAS programs",
				"Improved network stability and speed to support smooth operations at BAZNAS Kota Bekasi"
			],
			technologies: ["Looker Studio", "Web Development", "Email Systems", "Network Optimization"],
			achievements: [
				"Created dashboard monitoring 10,000+ transactions monthly",
				"Developed email system reaching 5,000+ donors",
				"Improved network speed by 50%"
			]
		},
		{
			id: 4,
			company: "Kominfo Bekasi",
			position: "Network Technician Intern",
			duration: "Oct 2024 - Nov 2024",
			location: "Bekasi Regency, Indonesia",
			logo: "./komdigi.png",
			responsibilities: [
				"Maintained internet connectivity by identifying and resolving network performance issues, ensuring seamless access for all users",
				"Installed LAN cables from switches to workstations, ensuring efficient network distribution for ministry operations",
				"Configured network security protocols (firewall, DHCP Snooping, DHCP Rogue detection) to prevent unauthorized access and protect infrastructure",
				"Monitored network speed, addressed performance drops, and ensured optimal standards across divisions",
				"Proactively identified and resolved network issues to support operational efficiency and productivity"
			],
			technologies: ["Network Security", "Firewall", "DHCP", "LAN Installation", "Mikrotik"],
			achievements: [
				"Successfully secured network infrastructure preventing unauthorized access",
				"Installed 50+ network points across ministry buildings",
				"Maintained 100% network uptime during critical operations"
			]
		}
	];

	return (
		<>
			<div className="works">
				<Card
					icon={faBriefcase}
					title="Work Experience"
					body={
						<div className="works-body">
							{workExperiences.map((work) => (
								<div
									key={work.id}
									className="work work-3d"
									onClick={() => setSelectedWork(work)}
								>
									<div className="work-left">
										<img
											src={work.logo}
											alt={work.company}
											className="work-image"
										/>
									</div>
									<div className="work-right">
										<div className="work-header">
											<div className="work-title">{work.company}</div>
											<div className="work-duration">{work.duration}</div>
										</div>
										<div className="work-subtitle">{work.position}</div>
									</div>
									<div className="work-hover-overlay">
										<span>Click to view details</span>
									</div>
								</div>
							))}
						</div>
					}
				/>
			</div>

			{selectedWork && (
				<WorkDetailModal
					work={selectedWork}
					onClose={() => setSelectedWork(null)}
				/>
			)}
		</>
	);
};

export default Works;