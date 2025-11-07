import React from "react";

function article_1() {
	return {
		date: "15 September 2025",
		title: "Building IoT Monitoring Systems with Grafana and Docker",
		description:
			"Learn how I implemented a comprehensive device monitoring system for ATCS networks using Grafana and Docker containers for real-time visualization and alerting.",
		keywords: [
			"IoT Monitoring",
			"Grafana",
			"Docker",
			"ATCS",
			"Network Monitoring",
			"Bayu Saputra",
		],
		style: `
				.article-content {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.article-image {
					align-self: center;
					max-width: 100%;
					margin: 20px 0;
				}
				`,
		body: (
			<React.Fragment>
				<div className="article-content">
					<div className="paragraph">
						<h2>Introduction</h2>
						<p>
							During my time at Sinar Mas Land, I was tasked with developing 
							a monitoring system for our Area Traffic Control System (ATCS) network. 
							This article shares my experience implementing this solution using 
							Grafana and Docker.
						</p>

						<h2>The Challenge</h2>
						<p>
							Managing multiple ATCS devices and IoT sensors (flood sensors, soil 
							sensors, rain meters) across different locations required a centralized 
							monitoring solution that could provide real-time insights and alerts.
						</p>

						<h2>The Solution</h2>
						<p>
							I chose Grafana for its powerful visualization capabilities and Docker 
							for easy deployment and scalability. The system collects data from 
							various devices and presents it through intuitive dashboards.
						</p>

						<h2>Key Features</h2>
						<ul>
							<li>Real-time device status monitoring</li>
							<li>Automated alerting for device malfunctions</li>
							<li>Historical data analysis</li>
							<li>Customizable dashboards per device type</li>
						</ul>

						<h2>Results</h2>
						<p>
							The implementation significantly reduced response time to device 
							issues and improved overall system reliability by 40%.
						</p>
					</div>
				</div>
			</React.Fragment>
		),
	};
}

function article_2() {
	return {
		date: "10 August 2025",
		title: "Implementing Network Security with Mikrotik and Cisco",
		description:
			"Best practices for implementing network security using Mikrotik RouterOS and Cisco devices. Learn about firewall configuration, DHCP security, and access control.",
		style: ``,
		keywords: [
			"Network Security",
			"Mikrotik",
			"Cisco",
			"Firewall",
			"DHCP Security",
			"Bayu Saputra",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<h2>Network Security Essentials</h2>
					<p>
						Based on my experience at Kominfo and Damai Putra Group, I've learned 
						the importance of implementing robust network security measures. This 
						article covers essential security configurations for enterprise networks.
					</p>

					<h2>Key Security Measures</h2>
					<h3>1. Firewall Configuration</h3>
					<p>
						Properly configured firewalls are the first line of defense. I implement 
						zone-based policies to control traffic flow between network segments.
					</p>

					<h3>2. DHCP Security</h3>
					<p>
						DHCP Snooping and Rogue DHCP detection prevent unauthorized DHCP servers 
						from distributing malicious network configurations.
					</p>

					<h3>3. Access Control Lists (ACL)</h3>
					<p>
						Implementing granular ACLs ensures that only authorized users can access 
						critical network resources.
					</p>

					<h2>Best Practices</h2>
					<ul>
						<li>Regular security audits and vulnerability assessments</li>
						<li>Keep firmware and software updated</li>
						<li>Implement strong authentication mechanisms</li>
						<li>Monitor network traffic for anomalies</li>
						<li>Document all security policies and procedures</li>
					</ul>

					<h2>Conclusion</h2>
					<p>
						Network security is an ongoing process. By implementing these measures 
						and staying updated with the latest security trends, we can significantly 
						reduce the risk of security breaches.
					</p>
				</div>
			</React.Fragment>
		),
	};
}

function article_3() {
	return {
		date: "25 July 2025",
		title: "ESP32 IoT Development: From Concept to Deployment",
		description:
			"A comprehensive guide to developing IoT solutions with ESP32 microcontrollers. Learn about WiFi connectivity, API integration, and real-time data transmission.",
		style: ``,
		keywords: [
			"ESP32",
			"IoT Development",
			"WiFi",
			"API Integration",
			"Emergency Alert System",
			"Bayu Saputra",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<h2>Introduction to ESP32 IoT Development</h2>
					<p>
						The ESP32 microcontroller has revolutionized IoT development with its 
						built-in WiFi and Bluetooth capabilities. In my emergency button project, 
						I leveraged these features to create a reliable alert system.
					</p>

					<h2>Project Overview: IoT Emergency Button</h2>
					<p>
						The system consists of three main components:
					</p>
					<ul>
						<li>ESP32-based emergency button device</li>
						<li>Laravel API backend for processing alerts</li>
						<li>Real-time dashboard for monitoring and response</li>
					</ul>

					<h2>Technical Implementation</h2>
					<h3>Hardware Setup</h3>
					<p>
						The ESP32 is connected to a physical button and status LED. When pressed, 
						it sends an HTTP POST request to the Laravel API with location and 
						timestamp data.
					</p>

					<h3>Software Architecture</h3>
					<p>
						The Laravel backend receives alerts, stores them in a database, and 
						broadcasts events to the real-time dashboard using WebSockets. This 
						ensures instant notification to response teams.
					</p>

					<h2>Key Learnings</h2>
					<ul>
						<li>Importance of error handling in IoT devices</li>
						<li>Power management for battery-operated devices</li>
						<li>Securing API communications with authentication tokens</li>
						<li>Implementing retry mechanisms for network failures</li>
					</ul>

					<h2>Results and Impact</h2>
					<p>
						The system achieved a 95% success rate in alert delivery with an 
						average response time of less than 2 seconds. This significantly 
						improved emergency response capabilities.
					</p>
				</div>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2, article_3];

export default myArticles;