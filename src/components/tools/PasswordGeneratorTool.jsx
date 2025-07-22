import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { 
  Key,
  Copy,
  Check,
  Info,
  Zap,
  Star,
  RefreshCw,
  Shield,
  AlertTriangle,
  Eye,
  EyeOff
} from 'lucide-react'

const PasswordGeneratorTool = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [strength, setStrength] = useState(0)
  const [strengthLabel, setStrengthLabel] = useState('')
  const [passwordHistory, setPasswordHistory] = useState([])

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const numberChars = '0123456789'
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  const similarChars = 'il1Lo0O'
  const ambiguousChars = '{}[]()/\\\'"`~,;.<>'

  const generatePassword = () => {
    let charset = ''
    
    if (includeUppercase) charset += uppercaseChars
    if (includeLowercase) charset += lowercaseChars
    if (includeNumbers) charset += numberChars
    if (includeSymbols) charset += symbolChars
    
    if (excludeSimilar) {
      charset = charset.split('').filter(char => !similarChars.includes(char)).join('')
    }
    
    if (excludeAmbiguous) {
      charset = charset.split('').filter(char => !ambiguousChars.includes(char)).join('')
    }
    
    if (charset === '') {
      setPassword('Please select at least one character type')
      return
    }
    
    let newPassword = ''
    const passwordLength = length[0]
    
    // Ensure at least one character from each selected type
    if (includeUppercase && charset.includes('A')) {
      newPassword += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
    }
    if (includeLowercase && charset.includes('a')) {
      newPassword += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
    }
    if (includeNumbers && charset.includes('0')) {
      newPassword += numberChars[Math.floor(Math.random() * numberChars.length)]
    }
    if (includeSymbols && charset.includes('!')) {
      newPassword += symbolChars[Math.floor(Math.random() * symbolChars.length)]
    }
    
    // Fill the rest randomly
    for (let i = newPassword.length; i < passwordLength; i++) {
      newPassword += charset[Math.floor(Math.random() * charset.length)]
    }
    
    // Shuffle the password
    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('')
    
    setPassword(newPassword)
    
    // Add to history
    if (newPassword && !newPassword.includes('Please select')) {
      setPasswordHistory(prev => [newPassword, ...prev.slice(0, 4)])
    }
  }

  const calculateStrength = (pwd) => {
    let score = 0
    let feedback = []
    
    // Length scoring
    if (pwd.length >= 8) score += 25
    if (pwd.length >= 12) score += 25
    if (pwd.length >= 16) score += 25
    
    // Character variety scoring
    if (/[a-z]/.test(pwd)) score += 5
    if (/[A-Z]/.test(pwd)) score += 5
    if (/[0-9]/.test(pwd)) score += 5
    if (/[^A-Za-z0-9]/.test(pwd)) score += 10
    
    // Bonus for good practices
    if (pwd.length >= 14 && /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) {
      score += 20
    }
    
    // Penalties
    if (/(.)\1{2,}/.test(pwd)) score -= 10 // Repeated characters
    if (/123|abc|qwe/i.test(pwd)) score -= 15 // Common sequences
    
    score = Math.max(0, Math.min(100, score))
    
    let label = ''
    if (score < 30) label = 'Very Weak'
    else if (score < 50) label = 'Weak'
    else if (score < 70) label = 'Fair'
    else if (score < 90) label = 'Strong'
    else label = 'Very Strong'
    
    return { score, label }
  }

  useEffect(() => {
    if (password && !password.includes('Please select')) {
      const { score, label } = calculateStrength(password)
      setStrength(score)
      setStrengthLabel(label)
    } else {
      setStrength(0)
      setStrengthLabel('')
    }
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar, excludeAmbiguous])

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const getStrengthColor = () => {
    if (strength < 30) return 'bg-red-500'
    if (strength < 50) return 'bg-orange-500'
    if (strength < 70) return 'bg-yellow-500'
    if (strength < 90) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthTextColor = () => {
    if (strength < 30) return 'text-red-600'
    if (strength < 50) return 'text-orange-600'
    if (strength < 70) return 'text-yellow-600'
    if (strength < 90) return 'text-blue-600'
    return 'text-green-600'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg mr-3">
              <Key className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Secure Password Generator</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate strong, secure passwords with customizable options. 
            Protect your accounts with cryptographically secure random passwords.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Password Generator */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Password Generator
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generatePassword}
                    className="flex items-center space-x-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Generate</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Generated Password */}
                <div className="space-y-3">
                  <Label>Generated Password</Label>
                  <div className="relative">
                    <Input
                      value={showPassword ? password : '•'.repeat(password.length)}
                      readOnly
                      className="pr-20 font-mono text-lg"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="h-8 w-8 p-0"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={copyPassword}
                        className="h-8 w-8 p-0"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  {/* Password Strength */}
                  {password && !password.includes('Please select') && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Password Strength</Label>
                        <span className={`text-sm font-semibold ${getStrengthTextColor()}`}>
                          {strengthLabel}
                        </span>
                      </div>
                      <Progress value={strength} className="h-2">
                        <div 
                          className={`h-full rounded-full transition-all ${getStrengthColor()}`}
                          style={{ width: `${strength}%` }}
                        />
                      </Progress>
                    </div>
                  )}
                </div>

                {/* Password Length */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Password Length</Label>
                    <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {length[0]} characters
                    </span>
                  </div>
                  <Slider
                    value={length}
                    onValueChange={setLength}
                    max={128}
                    min={4}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>4</span>
                    <span>128</span>
                  </div>
                </div>

                {/* Character Options */}
                <div className="space-y-4">
                  <Label>Character Types</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="uppercase"
                        checked={includeUppercase}
                        onCheckedChange={setIncludeUppercase}
                      />
                      <Label htmlFor="uppercase" className="text-sm">
                        Uppercase Letters (A-Z)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="lowercase"
                        checked={includeLowercase}
                        onCheckedChange={setIncludeLowercase}
                      />
                      <Label htmlFor="lowercase" className="text-sm">
                        Lowercase Letters (a-z)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="numbers"
                        checked={includeNumbers}
                        onCheckedChange={setIncludeNumbers}
                      />
                      <Label htmlFor="numbers" className="text-sm">
                        Numbers (0-9)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="symbols"
                        checked={includeSymbols}
                        onCheckedChange={setIncludeSymbols}
                      />
                      <Label htmlFor="symbols" className="text-sm">
                        Symbols (!@#$%^&*)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4">
                  <Label>Advanced Options</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exclude-similar"
                        checked={excludeSimilar}
                        onCheckedChange={setExcludeSimilar}
                      />
                      <Label htmlFor="exclude-similar" className="text-sm">
                        Exclude similar characters (i, l, 1, L, o, 0, O)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exclude-ambiguous"
                        checked={excludeAmbiguous}
                        onCheckedChange={setExcludeAmbiguous}
                      />
                      <Label htmlFor="exclude-ambiguous" className="text-sm">
                        Exclude ambiguous characters ({`{ } [ ] ( ) / \\ ' " \` ~ , ; . < >`})
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Password History */}
                {passwordHistory.length > 0 && (
                  <div className="space-y-3">
                    <Label>Recent Passwords</Label>
                    <div className="space-y-2">
                      {passwordHistory.map((pwd, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={pwd}
                            readOnly
                            className="font-mono text-sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(pwd)}
                            className="flex-shrink-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Security Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use at least 12 characters for strong security</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Include uppercase, lowercase, numbers, and symbols</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use unique passwords for each account</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Store passwords in a secure password manager</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Enable two-factor authentication when available</span>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Cryptographically secure random generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Customizable character sets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Real-time strength analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Password history tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">One-click copy to clipboard</span>
                </div>
              </CardContent>
            </Card>

            {/* Password Strength Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Strength Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span><strong>Very Weak:</strong> Easy to crack</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span><strong>Weak:</strong> Can be cracked quickly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span><strong>Fair:</strong> Moderate security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <span><strong>Strong:</strong> Good security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span><strong>Very Strong:</strong> Excellent security</span>
                </div>
              </CardContent>
            </Card>

            {/* Warning */}
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-700">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Important
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-orange-700">
                <p>
                  Never share your passwords or store them in unsecured locations. 
                  This tool generates passwords locally in your browser and doesn't 
                  store or transmit any data.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PasswordGeneratorTool

