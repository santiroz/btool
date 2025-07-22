import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ToolsPage from './pages/ToolsPage'
import BlogPage from './pages/BlogPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import CalculatorTool from './components/tools/CalculatorTool'
import ColorPickerTool from './components/tools/ColorPickerTool'
import JSONFormatterTool from './components/tools/JSONFormatterTool'
import PasswordGeneratorTool from './components/tools/PasswordGeneratorTool'
import QRGeneratorTool from './components/tools/QRGeneratorTool'
import WordCounterTool from './components/tools/WordCounterTool'
import UnitConverterTool from './components/tools/UnitConverterTool'
import Base64Tool from './components/tools/Base64Tool'
import HashGeneratorTool from './components/tools/HashGeneratorTool'
import URLEncoderTool from './components/tools/URLEncoderTool'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <div className="flex">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
          
          <main className="flex-1 transition-all duration-300">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tools/calculator" element={<CalculatorTool />} />
              <Route path="/tools/color-picker" element={<ColorPickerTool />} />
              <Route path="/tools/json-formatter" element={<JSONFormatterTool />} />
              <Route path="/tools/password-generator" element={<PasswordGeneratorTool />} />
              <Route path="/tools/qr-generator" element={<QRGeneratorTool />} />
              <Route path="/tools/word-counter" element={<WordCounterTool />} />
              <Route path="/tools/unit-converter" element={<UnitConverterTool />} />
              <Route path="/tools/base64" element={<Base64Tool />} />
              <Route path="/tools/hash-generator" element={<HashGeneratorTool />} />
              <Route path="/tools/url-encoder" element={<URLEncoderTool />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </main>
        </div>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App

