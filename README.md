
# 🚀 Learning Pathway Generator


A smart, AI-powered web application that creates personalized learning roadmaps tailored to your goals and skill level. The system generates structured learning pathways using Google's Gemini AI and presents them through interactive visualizations.

## 🌟 Key Features

### 🧠 Intelligent Pathway Generation
- **AI-Powered Recommendations**: Leverages Google's Gemini API to create optimized learning sequences
- **Multi-Domain Support**: Generates pathways for various technical and non-technical domains
- **Adaptive Learning**: Pathways adjust based on user's existing knowledge (future enhancement)

### 📊 Interactive Visualization
- **Dynamic D3.js Graphs**: Beautifully renders learning pathways as interactive node graphs
- **Progress Tracking**: Visual indicators show completion status of each topic
- **Responsive Design**: Works across desktop and mobile devices

### 🔄 User Management
- **Session Persistence**: Saves user progress automatically
- **Pathway History**: View and revisit previously generated pathways
- **Customization**: Edit and personalize generated pathways (future enhancement)

## 🛠 Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | Component-based UI development |
| Tailwind CSS | Utility-first responsive styling |
| D3.js | Interactive data visualizations |
| Axios | HTTP client for API communication |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime environment |
| Express.js | Web application framework |
| Google Gemini API | AI-powered content generation |
| MongoDB | NoSQL database for persistent storage |
| Mongoose | MongoDB object modeling |

### Development Tools
- **VS Code**: Primary code editor
- **Postman**: API development environment
- **Git & GitHub**: Version control and collaboration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Google Gemini API key

### Installation
1. Clone the repository:
```bash
git clone https://github.com/AbhinandanPatil02/Learning_Pathway_Project.git
cd Learning_Pathway_Project
```

2. Install dependencies for both frontend and backend:
```bash
cd frontend && npm install
cd backend && npm install
```

3. Set up environment variables:
Create a `.env` file in the server directory with:
```
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

4. Run the application:
```bash
# Start backend server
cd backend && npm start

# In another terminal, start frontend
cd frontend && npm start
```


## 🔮 Future Roadmap

- **User Authentication**: Implement JWT-based auth for personalized experiences
- **Collaborative Learning**: Add social features to share and discuss pathways
- **Skill Assessment**: Pre-pathway quizzes to better tailor recommendations
- **Mobile Application**: React Native version for on-the-go learning
- **Gamification**: Badges and rewards for learning milestones



## ✉️ Contact

**Abhinandan Patil**  
📧 abhinandanpatil002@gmail.com  
🔗 [LinkedIn Profile](https://www.linkedin.com/in/abhinandan-patil-48970b258)  


---
