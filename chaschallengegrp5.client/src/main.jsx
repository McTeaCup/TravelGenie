import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import style from './style.module.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './components/Auth';
import { AnswerProvider } from './components/AnswerContext.jsx';
import { ChoiceProvider } from './components/landingchoice-logic.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <AnswerProvider>
          <ChoiceProvider>
            <App />
          </ChoiceProvider>
        </AnswerProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
)
