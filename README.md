
# 🚀 Bayu5aputra Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Bayu5aputra-14b8a6?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

**Modern & Interactive Personal Portfolio - Showcasing IT Infrastructure Expertise, Network Administration, and Full-Stack Development Projects**

[Live Demo](https://next-it.my.id) · [Report Bug](https://github.com/bayu5aputra/portfolio/issues) · [Request Feature](https://github.com/bayu5aputra/portfolio/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contact](#-contact)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 About The Project

A modern, responsive, and interactive portfolio website built with React to showcase my journey as an **IT Infrastructure Specialist** and **Network Administrator**. This portfolio features smooth animations, 3D effects, and a clean design to present my projects, work experience, and technical articles.

### 🌟 Key Highlights

- 💼 **Work Experience Section** with interactive modal details
- 🛠️ **Projects Showcase** with live demos and GitHub links
- 📝 **Technical Blog** with in-depth articles
- 🎨 **Modern UI/UX** with glassmorphism and 3D effects
- 📱 **Fully Responsive** design for all devices
- ⚡ **Optimized Performance** with React best practices
- 🎭 **Loading Animations** with water drop effect

---

## ✨ Features

### 🏠 Homepage
- Interactive hero section with tech stack carousel
- Latest articles preview
- Work experience timeline with modal popups
- Projects grid showcase
- Social media integration

### 👤 About Page
- Professional bio and background
- Skills and certifications display
- Social media links
- Downloadable resume section

### 💼 Projects Page
- Comprehensive project portfolio
- Live demo links and GitHub repositories
- Technology stack tags
- Detailed project descriptions

### 📚 Articles Page
- Technical blog posts
- Topics: IoT, Network Security, Web Development, AI Integration
- Full-text articles with code examples
- Search and filter functionality

### 📧 Contact Page
- 3D interactive contact cards
- Email integration
- Social media links with hover effects
- Contact form (optional)

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.11.1-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled_Components-5.3.10-DB7093?style=flat-square&logo=styled-components&logoColor=white)

### UI/UX
![FontAwesome](https://img.shields.io/badge/Font_Awesome-6.4.0-339AF0?style=flat-square&logo=font-awesome&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Animations-1572B6?style=flat-square&logo=css3&logoColor=white)

### Tools & Libraries
- **React Helmet Async** - SEO optimization
- **React GA4** - Google Analytics integration
- **Web Vitals** - Performance monitoring

### Development
![Node.js](https://img.shields.io/badge/Node.js-16+-339933?style=flat-square&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-8+-CB3837?style=flat-square&logo=npm&logoColor=white)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
node >= 16.0.0
npm >= 8.0.0
```

Check your versions:
```bash
node --version
npm --version
```

---

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/bayu5aputra/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Google Analytics (Optional)**

Edit `src/data/tracking.js`:
```javascript
export const TRACKING_ID = "YOUR-GA4-TRACKING-ID";
```

4. **Customize your information**

Edit `src/data/user.js` with your personal information:
```javascript
const INFO = {
  main: {
    title: "Your Name - Your Title",
    name: "Your Name",
    email: "your.email@example.com",
    logo: "../logo.png",
  },
  // ... more configurations
};
```

---

## 💻 Usage

### Development Mode

Start the development server with hot reload:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Create an optimized production build:

```bash
npm run build
```

The build folder will contain optimized files ready for deployment.

### Testing

Run the test suite:

```bash
npm test
```

---

## 📁 Project Structure

```
bayu5aputra-portfolio/
├── public/
│   ├── index.html
│   ├── logo.png
│   ├── about.jpg
│   └── ...
├── src/
│   ├── components/
│   │   ├── about/
│   │   │   ├── socials.jsx
│   │   │   └── styles/
│   │   ├── articles/
│   │   │   ├── article.jsx
│   │   │   └── style/
│   │   ├── common/
│   │   │   ├── card.jsx
│   │   │   ├── footer.jsx
│   │   │   ├── logo.jsx
│   │   │   ├── navBar.jsx
│   │   │   └── styles/
│   │   ├── homepage/
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── TechStackCarousel.jsx
│   │   │   ├── WorkDetailModal.jsx
│   │   │   ├── article.jsx
│   │   │   ├── works.jsx
│   │   │   └── styles/
│   │   └── projects/
│   │       ├── allProjects.jsx
│   │       ├── project.jsx
│   │       └── styles/
│   ├── data/
│   │   ├── articles.js      # Blog articles content
│   │   ├── seo.js           # SEO metadata
│   │   ├── styles.css       # Global CSS variables
│   │   ├── tracking.js      # Google Analytics
│   │   └── user.js          # Personal information
│   ├── pages/
│   │   ├── 404.jsx
│   │   ├── about.jsx
│   │   ├── articles.jsx
│   │   ├── contact.jsx
│   │   ├── homepage.jsx
│   │   ├── projects.jsx
│   │   ├── readArticle.jsx
│   │   └── styles/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── package-lock.json
└── README.md
```

---

## 🎨 Customization

### 1. Personal Information

Edit `src/data/user.js`:

```javascript
const INFO = {
  main: {
    title: "Your Name - Your Title",
    name: "Your Name",
    email: "your.email@example.com",
    logo: "../logo.png",
  },
  
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    instagram: "https://instagram.com/yourusername",
  },
  
  homepage: {
    title: "Your Professional Title",
    description: "Your professional description...",
  },
  
  // Add your projects, work experience, etc.
};
```

### 2. SEO Optimization

Edit `src/data/seo.js`:

```javascript
const SEO = [
  {
    page: "home",
    description: "Your homepage description",
    keywords: ["keyword1", "keyword2", "keyword3"],
  },
  // Add more pages...
];
```

### 3. Add Articles

Edit `src/data/articles.js`:

```javascript
function article_1() {
  return {
    date: "DD Month YYYY",
    title: "Article Title",
    description: "Article description...",
    keywords: ["keyword1", "keyword2"],
    body: (
      <React.Fragment>
        {/* Your article content */}
      </React.Fragment>
    ),
  };
}
```

### 4. Color Scheme

Edit `src/data/styles.css`:

```css
:root {
  --primary-color: #27272a;
  --secondary-color: #65656d;
  --tertiary-color: #acacb4;
  --quaternary-color: #e4e4e7;
  --link-color: #14b8a6;
}
```

### 5. Logo & Images

Replace images in the `public/` folder:
- `logo.png` - Your logo
- `about.jpg` - About page image
- Company logos for work experience
- Project screenshots

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com)
3. New site from Git
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `build`
5. Deploy!

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

---

## 📸 Screenshots

### Homepage
<img src="https://via.placeholder.com/800x400?text=Homepage+Screenshot" alt="Homepage" />

### About Page
<img src="https://via.placeholder.com/800x400?text=About+Page+Screenshot" alt="About Page" />

### Projects Page
<img src="https://via.placeholder.com/800x400?text=Projects+Page+Screenshot" alt="Projects Page" />

### Contact Page
<img src="https://via.placeholder.com/800x400?text=Contact+Page+Screenshot" alt="Contact Page" />

---

## 🤝 Contributing

Contributions are what make the open source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact

**Bayu Saputra** - IT Infrastructure Specialist

- 📧 Email: [bayusaputra.005.003@gmail.com](mailto:bayusaputra.005.003@gmail.com)
- 🌐 Website: [https://next-it.my.id](https://next-it.my.id)
- 💼 LinkedIn: [linkedin.com/in/bayusaputra05](https://linkedin.com/in/bayusaputra05)
- 🐙 GitHub: [github.com/bayu5aputra](https://github.com/bayu5aputra)
- 📱 Instagram: [instagram.com/filesystem_](https://instagram.com/filesystem_)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

```
MIT License

Copyright (c) 2025 Bayu5aputra

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [React Router](https://reactrouter.com/) - Routing library for React
- [Font Awesome](https://fontawesome.com/) - Icon library
- [Devicon](https://devicon.dev/) - Programming languages and development tools icons
- [Shields.io](https://shields.io/) - README badges

---

## 🔮 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Blog CMS integration
- [ ] Contact form with backend
- [ ] Multilingual support (EN/ID)
- [ ] Project filtering and search
- [ ] Animated data visualizations
- [ ] PWA support
- [ ] Performance optimizations

---

<div align="center">

### ⭐ Don't forget to give this project a star if you found it helpful! ⭐

**Made with ❤️ by [Bayu5aputra](https://next-it.my.id)**

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-14b8a6?style=for-the-badge)](https://next-it.my.id)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/bayu5aputra)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/bayusaputra05)

</div>