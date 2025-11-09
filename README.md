# ProtoyotaAI - Toyota Vehicle Advisor

An intelligent Toyota vehicle recommendation system powered by AI. This application helps users find their perfect Toyota vehicle through an interactive chatbot that asks targeted questions about their needs, budget, and preferences. It features expert reviews, vehicle comparisons, finance calculators, and dealership locators.

## 🚀 Features

- **AI-Powered Chat Advisor**: Interactive chatbot that asks questions to understand user needs and recommends suitable Toyota vehicles
- **Expert Reviews Integration**: Access to current 2024 reviews with ratings, pros, and cons for all Toyota models
- **Vehicle Catalog**: Browse all Toyota models with detailed specifications
- **Smart Comparison Tool**: Compare up to 2 vehicles side-by-side with visual indicators showing which vehicle has better specs
- **Finance Calculator**: Calculate monthly payments based on down payment, interest rate, and loan term
- **Dealership Locator**: Find nearby Toyota dealerships for any vehicle
- **AI Recommendation Highlighting**: Recommended vehicles are highlighted in green and automatically scrolled into view
- **Light/Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Fully responsive across all device sizes
- **Smooth Page Transitions**: Professional slide animations when navigating between pages
- **Animated Home Page**: Dynamic sliding line animations on the home page

---

## 📋 Prerequisites

Before setting up this project, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **OpenRouter API Key** - [Sign up at OpenRouter.ai](https://openrouter.ai/)

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Vijaya-pixel/ProtoyotaAI.git
cd ProtoyotaAI
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React
- React Router DOM
- Lucide React (for icons)
- OpenRouter AI integration

### 3. Configure Environment Variables

⚠️ **IMPORTANT SECURITY NOTE**: 

In Create React App, environment variables prefixed with `REACT_APP_` are embedded into the JavaScript bundle at build time and are **publicly accessible** in the browser. This means:

- ✅ **Suitable for**: Development, demos, hackathons with free-tier API keys
- ❌ **NOT suitable for**: Production apps with paid API keys or sensitive data

**Security Best Practices:**
- The API key will be visible in browser dev tools
- Anyone can extract and potentially abuse your key
- For production, implement a backend proxy server to keep keys secure
- Monitor your OpenRouter usage regularly
- Set up rate limits and spending caps on your OpenRouter account

**For this project:**
- We're using DeepSeek's free tier via OpenRouter, which has built-in rate limits
- This is acceptable for hackathons and demonstrations
- For production deployment, consider implementing a backend API

---

Create a `.env` file in the root directory of the project:

```bash
# On Windows (PowerShell)
New-Item .env

# On macOS/Linux
touch .env
```

Add your OpenRouter API key to the `.env` file:

```
REACT_APP_OPENROUTER_API_KEY=your_api_key_here
```

**To get your OpenRouter API Key:**
1. Go to [OpenRouter.ai](https://openrouter.ai/)
2. Sign up or log in
3. Navigate to the API Keys section
4. Create a new API key (use free tier for development)
5. **Set spending limits** to protect your account
6. Copy and paste it into your `.env` file

⚠️ **Critical**: 
- Never commit your `.env` file to version control (it's in `.gitignore`)
- Never share your API key publicly
- Revoke and regenerate keys if they're exposed
- Monitor your usage at OpenRouter.ai

### 4. Start the Development Server

```bash
npm start
```

The application will automatically open in your default browser at [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
ProtoyotaAI/
├── public/
│   ├── cars/                 # Car images
│   ├── index.html
│   └── supra-outline2.png   # Intro animation image
├── src/
│   ├── components/
│   │   ├── CarGallery.jsx   # Gallery component (if used)
│   │   ├── ChatBot.jsx      # AI chatbot interface
│   │   ├── IntroAnimation.jsx # Startup animation
│   │   ├── Navbar.jsx       # Navigation bar
│   │   └── PageTransition.jsx # Page transition animations
│   ├── context/
│   │   └── ThemeContext.jsx # Light/Dark mode context
│   ├── data/
│   │   ├── cars.js          # Vehicle database
│   │   └── reviews.js       # Expert reviews data
│   ├── pages/
│   │   ├── Catalog.jsx      # Vehicle catalog with filters
│   │   └── Home.jsx         # Landing page
│   ├── Services/
│   │   └── aiService.js     # OpenRouter AI integration
│   ├── styles/
│   │   └── animations.css   # Global animations
│   ├── App.js               # Main app component
│   ├── App.css              # Main app styles
│   ├── index.js             # React entry point
│   └── index.css            # Global styles
├── .env                      # Environment variables (create this)
├── .gitignore
├── package.json
└── README.md
```

---

## 🎮 Usage Guide

### Home Page
- Navigate to the home page to see animated sliding lines
- Choose between "AI Vehicle Advisor" or "Browse Models"

### AI Vehicle Advisor (Chatbot)
1. Click on "AI Advisor" in the navbar or "AI Vehicle Advisor" on the home page
2. Answer the chatbot's questions about:
   - Primary vehicle use (commute, family, work, travel)
   - Budget range
   - Number of seats needed
   - Fuel preference (gas, hybrid, electric)
   - Body style preference
3. The AI will recommend 1-3 Toyota vehicles based on your needs
4. Click "View Recommendations in Catalog" to see highlighted vehicles
5. Use "New Chat" to start over

### Browse Models (Catalog)
1. Click "Browse Models" in the navbar
2. Use the search bar to filter by model name
3. Filter by category (Sedan, SUV, Truck, etc.)
4. Each vehicle card offers:
   - **Add to Compare**: Select up to 2 vehicles for comparison
   - **Finance Calculator**: Calculate monthly payments
   - **Find Dealership**: View nearby dealerships

### Comparison Tool
1. Select 2 vehicles using "Add to Compare"
2. Click the "Compare (2)" button
3. View side-by-side comparison with:
   - Green highlighting for better specs
   - Red highlighting for worse specs
   - Comparison symbols (>, <, =)

### Theme Toggle
- Click the sun/moon icon in the navbar to switch between light and dark modes
- Your preference is saved automatically

---

## 🔧 Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder
- Optimized and minified for best performance
- Ready for deployment

### `npm run eject`
⚠️ **Warning**: This is a one-way operation!
Ejects from Create React App to give you full control over configuration

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variable: `REACT_APP_OPENROUTER_API_KEY`
5. Deploy

### Deploy to Netlify
1. Build the production version: `npm run build`
2. Drag and drop the `build` folder to [Netlify](https://netlify.com)
3. Configure environment variables in Netlify dashboard

---

## 🔍 Troubleshooting

### Issue: "Module not found" errors
**Solution**: Run `npm install` to ensure all dependencies are installed

### Issue: Chatbot not responding
**Solution**: 
1. Check that your `.env` file exists and contains a valid OpenRouter API key
2. Verify the key format: `REACT_APP_OPENROUTER_API_KEY=sk-or-...`
3. Restart the development server after adding/changing environment variables

### Issue: Images not loading
**Solution**: Ensure all car images are in the `public/cars/` directory

### Issue: Port 3000 already in use
**Solution**: 
- Kill the process using port 3000, or
- Set a different port: `PORT=3001 npm start` (macOS/Linux) or modify `package.json` (Windows)

### Issue: Animation appears with grey background
**Solution**: The intro animation should have a black background. This is fixed in the latest version.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

---

## 📝 License

This project was created for HackUTD. All rights reserved.

---

## 👥 Authors

- Development Team: Vijaya-pixel and contributors
- Created at HackUTD 2025

---

## 🆘 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section above
2. Open an issue on GitHub
3. Contact the development team

---

## 📚 Technologies Used

- **Frontend**: React 19.2.0, React Router DOM 7.9.5
- **Styling**: Custom CSS with theme support
- **Icons**: Lucide React
- **AI**: DeepSeek via OpenRouter API
- **Build Tool**: Create React App

---

## 🎯 Future Enhancements

- Integration with real-time dealership inventory
- Live vehicle reviews from multiple sources
- User accounts and saved preferences
- Appointment scheduling with dealerships
- Test drive booking system
- More vehicle comparison metrics
- **Backend API proxy for secure API key management**
- User authentication and session management
- Request caching to reduce API costs
- Advanced rate limiting and abuse prevention

---

## ⚠️ Disclaimer

This project is for educational and demonstration purposes. The current implementation exposes the API key in the client-side code, which is acceptable for hackathons and demos using free-tier APIs. For production use, implement a backend proxy server to keep API keys secure.

---

**Version**: 0.67
**Last Updated**: November 2025
