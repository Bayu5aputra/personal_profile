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
			position: "IT Infrastructure Engineer", // DIPERBAIKI: Ubah dari IT Infrastructure
			duration: "Sep 2025 - Present",
			location: "South Tangerang, Indonesia",
			logo: "./sinarmasland.png",
			// TAMBAHAN: Company Background
			companyBackground: {
				mainCompany: "Sinar Mas Land is one of Indonesia's leading property developers with a diverse portfolio of residential, commercial, and industrial projects. As part of the Sinar Mas Group, it manages integrated townships and smart city developments across Indonesia.",
				subCompany: "One Smart Service",
				subCompanyDescription: "One Smart Service is a subsidiary company within the Sinar Mas Land group that specializes in comprehensive IT management services. The company handles both software and hardware infrastructure, as well as security systems for Sinar Mas Land and its joint venture companies within the Sinar Mas Group. As an integrated IT service provider, One Smart Service ensures optimal technology operations across multiple business units."
			},
			responsibilities: [
				"Identified and diagnosed malfunctions in ATCS (Area Traffic Control System) devices across multiple locations",
				"Performed repairs and maintenance on ATCS hardware and system components to ensure 24/7 operational reliability",
				"Managed and resolved technical support tickets related to ATCS system repairs with 95% SLA compliance",
				"Maintained IoT devices deployed in the field, including flood sensors, soil sensors, and rain meters for smart city initiatives",
				"Developed and implemented a comprehensive device monitoring system for the ATCS network using Grafana and Docker containerization",
				"Completed foundational training on ATCS architecture and IoT device management protocols",
				"Collaborated with cross-functional teams to implement preventive maintenance schedules"
			],
			technologies: ["ATCS", "IoT", "Grafana", "Docker", "Network Management", "Linux", "Prometheus", "Smart City Technology"],
			achievements: [
				"Successfully implemented monitoring system reducing device downtime by 40% and improving incident response time",
				"Managed and maintained 50+ IoT devices across multiple locations with 99.2% uptime",
				"Resolved 95% of technical tickets within SLA, maintaining high customer satisfaction scores",
				"Reduced mean time to repair (MTTR) by 30% through proactive monitoring and alerting systems"
			]
		},
		{
			id: 2,
			company: "Damai Putra Group",
			position: "IT Support Intern",
			duration: "Dec 2024 - Jun 2025",
			location: "Bekasi City, Indonesia",
			logo: "./damaiputra.png",
			// TAMBAHAN: Company Background
			companyBackground: {
				mainCompany: "Damai Putra Group is a well-established property development company in Indonesia, focusing on residential and commercial projects. The company is committed to creating sustainable and innovative living spaces with integrated technology infrastructure.",
				subCompany: null,
				subCompanyDescription: null
			},
			responsibilities: [
				"Identified, analyzed, and resolved technical issues related to hardware, software, and network systems across multiple office locations",
				"Configured, maintained, and troubleshooted LAN/WAN networks, VPNs, and firewalls to ensure network stability and security",
				"Managed Windows/Linux servers, Active Directory infrastructure, and system backups for optimal performance and data protection",
				"Provided comprehensive technical support and training to end-users, ensuring high satisfaction and minimal downtime",
				"Implemented IT security measures, conducted threat analysis, and enforced data protection best practices following industry standards",
				"Installed, updated, and troubleshooted software applications to support business operations and user productivity",
				"Applied ITIL frameworks to enhance IT service management processes and operational efficiency",
				"Developed and maintained technical documentation, standard operating procedures, reports, and user guides",
				"Collaborated with cross-functional teams to address IT challenges effectively and implement solutions",
				"Managed IT assets lifecycle, ensuring proper tracking, maintenance, and optimization of resources"
			],
			technologies: ["Windows Server", "Linux", "Active Directory", "VPN", "Firewall", "ITIL", "Network Security", "Backup Solutions", "VMware"],
			achievements: [
				"Reduced average ticket resolution time by 35% through process optimization and automation",
				"Implemented comprehensive security protocols preventing 15+ potential security breaches",
				"Maintained 99.5% network uptime across all locations through proactive monitoring",
				"Successfully migrated 50+ users to new Active Directory infrastructure with zero downtime"
			]
		},
		{
			id: 3,
			company: "BAZNAS Kota Bekasi",
			position: "Web Development Intern",
			duration: "Nov 2024 - Dec 2024",
			location: "Bekasi City, Indonesia",
			logo: "./baznas.png",
			// TAMBAHAN: Company Background
			companyBackground: {
				mainCompany: "BAZNAS (Badan Amil Zakat Nasional) Kota Bekasi is the official government agency responsible for managing zakat (Islamic charitable giving) in Bekasi City. The organization focuses on collecting, distributing, and managing zakat funds to help underprivileged communities and support social welfare programs in accordance with Islamic principles.",
				subCompany: null,
				subCompanyDescription: null
			},
			responsibilities: [
				"Developed a comprehensive Zakat, Infak, and Sedekah dashboard using Looker Studio by Google to monitor real-time data and fund collection performance",
				"Built a web-based email broadcast system for mass distribution, enhancing communication efficiency with 5,000+ donors and beneficiaries",
				"Designed and implemented a structured digital marketing strategy to strengthen communication channels and raise public awareness of BAZNAS programs",
				"Improved network infrastructure stability and speed by 50% to support smooth operations at BAZNAS Kota Bekasi offices",
				"Created automated reporting systems for financial transparency and accountability",
				"Conducted training sessions for staff on using new digital tools and systems"
			],
			technologies: ["Looker Studio", "Web Development", "Email Systems", "Network Optimization", "Google Cloud Platform", "PHP", "MySQL", "Digital Marketing"],
			achievements: [
				"Created interactive dashboard monitoring 10,000+ transactions monthly with real-time analytics",
				"Developed email broadcast system reaching 5,000+ donors with 85% open rate",
				"Improved network speed by 50% and reduced latency by 40%",
				"Increased donor engagement by 25% through improved digital communication channels"
			]
		},
		{
			id: 4,
			company: "Kominfo Bekasi",
			position: "Network Technician Intern",
			duration: "Oct 2024 - Nov 2024",
			location: "Bekasi Regency, Indonesia",
			logo: "./komdigi.png",
			// TAMBAHAN: Company Background
			companyBackground: {
				mainCompany: "Kementerian Komunikasi dan Informatika (Kominfo) Kabupaten Bekasi is the regional office of Indonesia's Ministry of Communication and Information Technology. The ministry is responsible for managing telecommunications infrastructure, cybersecurity, digital literacy programs, and e-government services to support digital transformation in Bekasi Regency.",
				subCompany: null,
				subCompanyDescription: null
			},
			responsibilities: [
				"Maintained internet connectivity by proactively identifying and resolving network performance issues, ensuring seamless access for 100+ ministry staff",
				"Installed and configured LAN cables from switches to workstations across multiple floors, ensuring efficient network distribution for ministry operations",
				"Configured advanced network security protocols including firewall rules, DHCP Snooping, and DHCP Rogue detection to prevent unauthorized access and protect critical infrastructure",
				"Monitored network speed and performance metrics, addressed performance degradation, and ensured optimal standards across all divisions",
				"Proactively identified and resolved network issues using diagnostic tools to support operational efficiency and productivity",
				"Documented network topology and created comprehensive technical documentation for future reference",
				"Conducted regular network audits and security assessments"
			],
			technologies: ["Network Security", "Firewall", "DHCP", "LAN Installation", "Mikrotik", "Cisco", "Network Monitoring", "Cable Management"],
			achievements: [
				"Successfully secured network infrastructure preventing unauthorized access with zero security incidents",
				"Installed and configured 50+ network points across ministry buildings within tight deadlines",
				"Maintained 100% network uptime during critical government operations and official events",
				"Improved network performance by 35% through optimization and proper cable management"
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