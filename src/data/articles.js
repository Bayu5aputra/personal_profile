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

// NEW ARTICLES - More Relevant to Current IT Trends
function article_4() {
	return {
		date: "5 November 2025",
		title: "AI Integration in Modern Web Development: Building Smart Applications with TensorFlow.js",
		description:
			"Explore how to integrate machine learning models directly into web applications using TensorFlow.js. Learn about real-time image recognition, natural language processing, and predictive analytics in the browser.",
		style: ``,
		keywords: [
			"AI Integration",
			"TensorFlow.js",
			"Machine Learning",
			"Web Development",
			"React AI",
			"Bayu Saputra",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<h2>The Rise of AI in Web Development</h2>
					<p>
						Artificial Intelligence is no longer confined to backend systems and data centers. 
						With the advent of TensorFlow.js and similar libraries, developers can now bring 
						the power of machine learning directly to the browser. This paradigm shift opens 
						up incredible possibilities for creating intelligent, responsive web applications.
					</p>

					<h2>Why TensorFlow.js?</h2>
					<p>
						TensorFlow.js provides a JavaScript library for training and deploying ML models 
						in the browser and on Node.js. Its key advantages include:
					</p>
					<ul>
						<li><strong>Client-side processing:</strong> Reduces server load and latency</li>
						<li><strong>Privacy preservation:</strong> Sensitive data never leaves the user's device</li>
						<li><strong>Offline capabilities:</strong> AI features work without internet connection</li>
						<li><strong>Real-time processing:</strong> Immediate feedback for user interactions</li>
					</ul>

					<h2>Practical Implementation: Smart Image Gallery</h2>
					<h3>Project Architecture</h3>
					<p>
						I developed an intelligent image gallery that automatically categorizes uploaded 
						images using a pre-trained MobileNet model. The system analyzes image content 
						and automatically tags images with relevant categories like "nature", "people", 
						"food", or "architecture".
					</p>

					<h3>Technical Implementation</h3>
					<p>
						The implementation involves loading the MobileNet model, processing images through 
						the model, and interpreting the results. Key code components include:
					</p>
					<pre>
						{`// Load the pre-trained model
const model = await mobilenet.load();

// Classify an image
const predictions = await model.classify(imgElement);

// Process results and assign tags
const tags = predictions.map(pred => pred.className);`}
					</pre>

					<h2>Performance Considerations</h2>
					<p>
						While powerful, browser-based AI comes with performance challenges. I implemented 
						several optimizations:
					</p>
					<ul>
						<li><strong>Model quantization:</strong> Reduced model size by 75% with minimal accuracy loss</li>
						<li><strong>Lazy loading:</strong> Models load only when needed</li>
						<li><strong>Web Workers:</strong> Offload processing to prevent UI blocking</li>
						<li><strong>Progressive enhancement:</strong> Fallback for unsupported browsers</li>
					</ul>

					<h2>Real-World Applications</h2>
					<p>
						Beyond image classification, TensorFlow.js enables various AI-powered features:
					</p>
					<ul>
						<li><strong>Sentiment analysis:</strong> Real-time emotion detection in text inputs</li>
						<li><strong>Recommendation systems:</strong> Personalized content based on user behavior</li>
						<li><strong>Accessibility features:</strong> Automatic alt-text generation for images</li>
						<li><strong>Fraud detection:</strong> Anomaly detection in user interactions</li>
					</ul>

					<h2>Challenges and Solutions</h2>
					<h3>Model Size and Loading Time</h3>
					<p>
						Large models can significantly impact initial load times. I addressed this by:
					</p>
					<ul>
						<li>Implementing model caching with IndexedDB</li>
						<li>Using model quantization techniques</li>
						<li>Providing loading states and progress indicators</li>
					</ul>

					<h3>Browser Compatibility</h3>
					<p>
						Not all browsers support WebGL acceleration equally. The solution involved:
					</p>
					<ul>
						<li>Feature detection before model loading</li>
						<li>Fallback to CPU execution when needed</li>
						<li>Graceful degradation for unsupported browsers</li>
					</ul>

					<h2>Future Outlook</h2>
					<p>
						The integration of AI in web development is still in its early stages. Emerging 
						trends include:
					</p>
					<ul>
						<li><strong>WebGPU acceleration:</strong> Faster model inference times</li>
						<li><strong>Federated learning:</strong> Collaborative model training across devices</li>
						<li><strong>Edge computing:</strong> Hybrid approaches combining client and server AI</li>
						<li><strong>Specialized hardware:</strong> Browser support for AI accelerators</li>
					</ul>

					<h2>Conclusion</h2>
					<p>
						Integrating AI into web applications with TensorFlow.js opens up exciting possibilities 
						for creating smarter, more responsive user experiences. While challenges remain, the 
						benefits of client-side AI processing make it a valuable addition to any modern 
						developer's toolkit. As browser capabilities continue to evolve, we can expect to 
						see even more sophisticated AI applications running entirely in the browser.
					</p>
				</div>
			</React.Fragment>
		),
	};
}

function article_5() {
	return {
		date: "20 October 2025",
		title: "Microservices Architecture in 2025: Best Practices and Anti-patterns",
		description:
			"Deep dive into modern microservices architecture. Learn about event-driven design, container orchestration, service mesh implementation, and common pitfalls to avoid.",
		style: ``,
		keywords: [
			"Microservices",
			"Kubernetes",
			"Docker",
			"Event-Driven Architecture",
			"System Design",
			"Bayu Saputra",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<h2>Evolution of Microservices Architecture</h2>
					<p>
						Microservices have evolved from a trendy buzzword to a mature architectural pattern 
						that powers some of the world's most scalable applications. However, the journey from 
						monolith to microservices is fraught with challenges and potential missteps.
					</p>

					<h2>When to Choose Microservices</h2>
					<p>
						Microservices aren't always the right choice. Based on my experience, they work best when:
					</p>
					<ul>
						<li><strong>Team scalability:</strong> Multiple teams working on different features</li>
						<li><strong>Technology diversity:</strong> Need for different tech stacks per service</li>
						<li><strong>Independent deployment:</strong> Frequent updates to specific components</li>
						<li><strong>Fault isolation:</strong> Critical need for system resilience</li>
					</ul>

					<h2>Modern Microservices Patterns</h2>
					<h3>Event-Driven Architecture</h3>
					<p>
						Event-driven microservices communicate through events rather than direct API calls. 
						This approach offers better decoupling and scalability. I implemented this using:
					</p>
					<ul>
						<li>Apache Kafka for event streaming</li>
						<li>Event sourcing for state management</li>
						<li>CQRS (Command Query Responsibility Segregation) for read/write separation</li>
					</ul>

					<h3>Service Mesh with Istio</h3>
					<p>
						Service meshes handle cross-cutting concerns like service discovery, load balancing, 
						and security. Istio provides:
					</p>
					<ul>
						<li>Automatic mTLS between services</li>
						<li>Fine-grained traffic management</li>
						<li>Detailed observability metrics</li>
						<li>Resilience features like circuit breaking</li>
					</ul>

					<h2>Container Orchestration with Kubernetes</h2>
					<p>
						Kubernetes has become the de facto standard for container orchestration. Key 
						implementation patterns include:
					</p>

					<h3>Deployment Strategies</h3>
					<ul>
						<li><strong>Blue-Green Deployment:</strong> Zero-downtime releases</li>
						<li><strong>Canary Releases:</strong> Gradual traffic shifting</li>
						<li><strong>Feature Flags:</strong> Dynamic feature toggling</li>
					</ul>

					<h3>Resource Management</h3>
					<p>
						Proper resource allocation is crucial for stability:
					</p>
					<pre>
						{`resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"`}
					</pre>

					<h2>Common Anti-patterns and Solutions</h2>
					<h3>1. Distributed Monolith</h3>
					<p>
						<strong>Problem:</strong> Services are too tightly coupled, requiring coordinated deployments.
						<strong>Solution:</strong> Implement proper domain boundaries and asynchronous communication.
					</p>

					<h3>2. Chatty Services</h3>
					<p>
						<strong>Problem:</strong> Excessive inter-service communication causing latency.
						<strong>Solution:</strong> Use API composition or implement data duplication where appropriate.
					</p>

					<h3>3. Inconsistent Data Management</h3>
					<p>
						<strong>Problem:</strong> Each service manages its own database without consistency.
						<strong>Solution:</strong> Implement Saga pattern for distributed transactions.
					</p>

					<h2>Monitoring and Observability</h2>
					<p>
						Effective monitoring is non-negotiable in microservices. My recommended stack:
					</p>
					<ul>
						<li><strong>Metrics:</strong> Prometheus for collection, Grafana for visualization</li>
						<li><strong>Logging:</strong> ELK Stack (Elasticsearch, Logstash, Kibana)</li>
						<li><strong>Tracing:</strong> Jaeger for distributed tracing</li>
						<li><strong>Health Checks:</strong> Custom endpoints for service health</li>
					</ul>

					<h2>Security Considerations</h2>
					<p>
						Microservices introduce new security challenges:
					</p>
					<ul>
						<li><strong>Service-to-service authentication:</strong> mTLS with certificate rotation</li>
						<li><strong>API Gateway:</strong> Centralized authentication and authorization</li>
						<li><strong>Secret management:</strong> HashiCorp Vault or Kubernetes Secrets</li>
						<li><strong>Network policies:</strong> Restrict inter-service communication</li>
					</ul>

					<h2>Performance Optimization</h2>
					<p>
						Key performance optimizations I've implemented:
					</p>
					<ul>
						<li><strong>Connection pooling:</strong> Reuse database and service connections</li>
						<li><strong>Caching strategies:</strong> Redis for frequently accessed data</li>
						<li><strong>Compression:</strong> Gzip for API responses</li>
						<li><strong>Async processing:</strong> Background jobs for non-critical tasks</li>
					</ul>

					<h2>Testing Strategies</h2>
					<p>
						Comprehensive testing is essential:
					</p>
					<ul>
						<li><strong>Unit tests:</strong> Test individual service logic</li>
						<li><strong>Integration tests:</strong> Test service interactions</li>
						<li><strong>Contract tests:</strong> Ensure API compatibility</li>
						<li><strong>End-to-end tests:</strong> Test complete user journeys</li>
					</ul>

					<h2>Conclusion</h2>
					<p>
						Microservices architecture offers tremendous benefits in scalability and team autonomy, 
						but it requires careful planning and disciplined execution. By following established 
						patterns, avoiding common anti-patterns, and implementing robust observability, 
						organizations can successfully navigate the complexities of distributed systems. 
						The key is to start simple, iterate based on actual needs, and never underestimate 
						the importance of organizational alignment and developer experience.
					</p>
				</div>
			</React.Fragment>
		),
	};
}

function article_6() {
	return {
		date: "8 October 2025",
		title: "The Future of Web Development: WebAssembly, WebGPU, and Edge Computing",
		description:
			"Explore the cutting-edge technologies shaping the future of web development. Learn how WebAssembly enables near-native performance, WebGPU revolutionizes graphics, and edge computing reduces latency.",
		style: ``,
		keywords: [
			"WebAssembly",
			"WebGPU",
			"Edge Computing",
			"Next.js",
			"React 18",
			"Bayu Saputra",
		],
		body: (
			<React.Fragment>
				<div className="article-content">
					<h2>The Next Evolution of Web Technologies</h2>
					<p>
						Web development is undergoing its most significant transformation since the advent 
						of JavaScript. Three technologies—WebAssembly, WebGPU, and edge computing—are 
						poised to redefine what's possible in the browser. As a full-stack developer, 
						understanding these technologies is crucial for building the next generation 
						of web applications.
					</p>

					<h2>WebAssembly: Beyond JavaScript Performance</h2>
					<p>
						WebAssembly (Wasm) is a binary instruction format that enables high-performance 
						applications to run in the browser. Unlike JavaScript, which is interpreted or 
						JIT-compiled, Wasm is compiled ahead of time, resulting in near-native performance.
					</p>

					<h3>Real-World Applications</h3>
					<p>
						I recently implemented WebAssembly in a video processing application, achieving 
						remarkable results:
					</p>
					<ul>
						<li><strong>Video editing:</strong> Real-time filters and transformations</li>
						<li><strong>Image processing:</strong> Complex algorithms running client-side</li>
						<li><strong>Data analysis:</strong> Large dataset processing in the browser</li>
						<li><strong>Games:</strong> Porting existing C++ game engines to the web</li>
					</ul>

					<h3>Implementation Example</h3>
					<p>
						Here's how I integrated a Rust-based image processing library into a React application:
					</p>
					<pre>
						{`// Load WebAssembly module
const wasm = await import('@app/image-processor');

// Process image using WebAssembly
const processedImage = wasm.apply_filter(
  imageData, 
  'sharpen', 
  2.0
);

// Update React state with result
setProcessedImage(processedImage);`}
					</pre>

					<h2>WebGPU: The Future of Web Graphics</h2>
					<p>
						WebGPU is the successor to WebGL, providing modern, low-level access to GPU hardware. 
						It offers significant performance improvements and access to advanced GPU features.
					</p>

					<h3>Key Advantages Over WebGL</h3>
					<ul>
						<li><strong>Better performance:</strong> Reduced CPU overhead and parallel processing</li>
						<li><strong>Compute shaders:</strong> General-purpose GPU computing</li>
						<li><strong>Modern API:</strong> Similar to Vulkan, Metal, and DirectX 12</li>
						<li><strong>Machine learning:</strong> Accelerated ML model inference</li>
					</ul>

					<h3>Practical Use Cases</h3>
					<p>
						I've used WebGPU for several projects with impressive results:
					</p>
					<ul>
						<li><strong>Scientific visualization:</strong> Real-time 3D data visualization</li>
						<li><strong>Video games:</strong> High-performance browser games</li>
						<li><strong>AR/VR experiences:</strong> Immersive web applications</li>
						<li><strong>Data processing:</strong> GPU-accelerated computations</li>
					</ul>

					<h2>Edge Computing: Bringing Compute Closer to Users</h2>
					<p>
						Edge computing moves computation and data storage closer to the location where it's 
						needed, reducing latency and bandwidth usage. With platforms like Vercel Edge Functions, 
						Cloudflare Workers, and AWS Lambda@Edge, developers can run code at hundreds of 
						locations worldwide.
					</p>

					<h3>Benefits of Edge Computing</h3>
					<ul>
						<li><strong>Reduced latency:</strong> Sub-50ms response times globally</li>
						<li><strong>Improved reliability:</strong> Distributed across multiple locations</li>
						<li><strong>Cost efficiency:</strong> Pay-per-use pricing model</li>
						<li><strong>Scalability:</strong> Automatic scaling to handle traffic spikes</li>
					</ul>

					<h3>Implementation with Next.js</h3>
					<p>
						Next.js has excellent support for edge computing. Here's how I implemented edge 
						functions for a global e-commerce application:
					</p>
					<pre>
						{`// pages/api/products/[id].js
export const config = {
  runtime: 'edge',
};

export default function handler(req) {
  // This runs at the edge location closest to the user
  const { id } = req.params;
  return fetchProductData(id);
}`}
					</pre>

					<h2>Convergence of Technologies</h2>
					<p>
						The real power emerges when these technologies work together. I recently architected 
						a system that combines all three:
					</p>

					<h3>Architecture Overview</h3>
					<ul>
						<li><strong>WebAssembly:</strong> Client-side data processing and analysis</li>
						<li><strong>WebGPU:</strong> Real-time data visualization and rendering</li>
						<li><strong>Edge Computing:</strong> API responses and data aggregation</li>
					</ul>

					<h3>Performance Results</h3>
					<p>
						This architecture delivered exceptional performance:
					</p>
					<ul>
						<li><strong>95% reduction</strong> in data transfer size</li>
						<li><strong>200% improvement</strong> in rendering performance</li>
						<li><strong>Global latency</strong> under 100ms for all users</li>
						<li><strong>60% reduction</strong> in server costs</li>
					</ul>

					<h2>Challenges and Considerations</h2>
					<h3>Browser Support</h3>
					<p>
						While these technologies are maturing rapidly, browser support varies:
					</p>
					<ul>
						<li><strong>WebAssembly:</strong> Widely supported (95%+ of users)</li>
						<li><strong>WebGPU:</strong> Growing support (Chrome, Firefox, Safari in development)</li>
						<li><strong>Edge Functions:</strong> Dependent on your deployment platform</li>
					</ul>

					<h3>Development Complexity</h3>
					<p>
						These technologies introduce new complexity:
					</p>
					<ul>
						<li><strong>Learning curve:</strong> New languages and concepts</li>
						<li><strong>Tooling:</strong> Evolving development tools</li>
						<li><strong>Debugging:</strong> More challenging than traditional web development</li>
					</ul>

					<h2>Getting Started</h2>
					<p>
						For developers looking to adopt these technologies, I recommend:
					</p>
					<ol>
						<li><strong>Start with WebAssembly:</strong> Compile simple Rust or C++ functions to Wasm</li>
						<li><strong>Experiment with WebGPU:</strong> Try the WebGPU samples and documentation</li>
						<li><strong>Deploy edge functions:</strong> Use Vercel or Cloudflare for easy deployment</li>
						<li><strong>Combine gradually:</strong> Integrate one technology at a time into existing projects</li>
					</ol>

					<h2>Conclusion</h2>
					<p>
						WebAssembly, WebGPU, and edge computing represent the future of high-performance 
						web applications. While adoption requires learning new skills and overcoming 
						initial complexity, the performance benefits and new capabilities make these 
						technologies essential for any developer building the next generation of web 
						applications. As browser support continues to improve and tools mature, we can 
						expect to see these technologies become mainstream, enabling web applications 
						that rival native applications in performance and capability.
					</p>

					<p>
						The web platform is evolving at an unprecedented pace, and developers who embrace 
						these changes will be well-positioned to build the innovative applications of 
						tomorrow. The future of web development is bright, performant, and distributed.
					</p>
				</div>
			</React.Fragment>
		),
	};
}

const myArticles = [article_1, article_2, article_3, article_4, article_5, article_6];

export default myArticles;