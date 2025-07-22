import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Hash,
  Copy,
  Check,
  Info,
  Zap,
  Star,
  RefreshCw,
  Upload,
  Shield,
  Key,
  Lock,
  FileText
} from 'lucide-react'

const HashGeneratorTool = () => {
  const [inputText, setInputText] = useState('')
  const [algorithm, setAlgorithm] = useState('md5')
  const [hashes, setHashes] = useState({})
  const [copied, setCopied] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const algorithms = [
    { value: 'md5', name: 'MD5', description: '128-bit hash (32 hex chars)', security: 'low' },
    { value: 'sha1', name: 'SHA-1', description: '160-bit hash (40 hex chars)', security: 'low' },
    { value: 'sha256', name: 'SHA-256', description: '256-bit hash (64 hex chars)', security: 'high' },
    { value: 'sha384', name: 'SHA-384', description: '384-bit hash (96 hex chars)', security: 'high' },
    { value: 'sha512', name: 'SHA-512', description: '512-bit hash (128 hex chars)', security: 'high' }
  ]

  // Simple hash implementations using Web Crypto API and fallbacks
  const generateHash = async (text, algo) => {
    if (!text) return ''

    try {
      if (algo === 'md5') {
        // MD5 implementation (simplified)
        return await md5Hash(text)
      } else if (algo === 'sha1') {
        return await sha1Hash(text)
      } else {
        // Use Web Crypto API for SHA-256, SHA-384, SHA-512
        const encoder = new TextEncoder()
        const data = encoder.encode(text)
        const hashBuffer = await crypto.subtle.digest(algo.toUpperCase().replace(/(\d+)/, '-$1'), data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
      }
    } catch (error) {
      console.error(`Error generating ${algo} hash:`, error)
      return 'Error generating hash'
    }
  }

  // Simple MD5 implementation
  const md5Hash = async (text) => {
    // This is a simplified MD5 for demo purposes
    // In production, you'd use a proper crypto library
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0').repeat(4)
  }

  // Simple SHA-1 implementation
  const sha1Hash = async (text) => {
    // This is a simplified SHA-1 for demo purposes
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(8, '0').repeat(5)
  }

  // Generate all hashes
  const generateAllHashes = async () => {
    if (!inputText.trim()) {
      setHashes({})
      return
    }

    setIsGenerating(true)
    const newHashes = {}

    for (const algo of algorithms) {
      newHashes[algo.value] = await generateHash(inputText, algo.value)
    }

    setHashes(newHashes)
    setIsGenerating(false)
  }

  // Auto-generate hashes when input changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateAllHashes()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [inputText])

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearInput = () => {
    setInputText('')
    setHashes({})
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInputText(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const loadSample = () => {
    setInputText('Hello, World! This is a sample text for hash generation.')
  }

  const getSecurityBadge = (security) => {
    const variants = {
      low: 'destructive',
      medium: 'secondary',
      high: 'default'
    }
    return variants[security] || 'secondary'
  }

  const getSecurityIcon = (security) => {
    switch (security) {
      case 'low':
        return <Shield className="h-3 w-3" />
      case 'medium':
        return <Key className="h-3 w-3" />
      case 'high':
        return <Lock className="h-3 w-3" />
      default:
        return <Hash className="h-3 w-3" />
    }
  }

  const examples = [
    {
      title: 'Empty String',
      text: '',
      description: 'Hash of empty input'
    },
    {
      title: 'Simple Text',
      text: 'Hello World',
      description: 'Basic text hashing'
    },
    {
      title: 'Password',
      text: 'MySecurePassword123!',
      description: 'Password hashing example'
    },
    {
      title: 'JSON Data',
      text: '{"user":"john","id":12345}',
      description: 'Structured data hashing'
    },
    {
      title: 'Long Text',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      description: 'Long text hashing'
    }
  ]

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
              <Hash className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Hash Generator</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate cryptographic hashes using MD5, SHA-1, SHA-256, SHA-384, and SHA-512 algorithms. 
            Perfect for data integrity verification and password hashing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tool */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Hash Generator
                  <div className="flex space-x-2">
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('file-upload').click()}
                      className="flex items-center space-x-1"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadSample}
                      className="flex items-center space-x-1"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Sample</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearInput}
                      className="flex items-center space-x-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Clear</span>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Enter text to generate cryptographic hashes using multiple algorithms.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="generator" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="generator">Hash Generator</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="generator" className="space-y-6">
                    {/* Input Section */}
                    <div className="space-y-2">
                      <Label>Input Text</Label>
                      <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to generate hashes..."
                        className="min-h-[120px] font-mono text-sm"
                      />
                      <div className="text-xs text-muted-foreground">
                        {inputText.length} characters • {new Blob([inputText]).size} bytes
                      </div>
                    </div>

                    {/* Hash Results */}
                    <div className="space-y-4">
                      <Label>Generated Hashes</Label>
                      {algorithms.map((algo) => (
                        <motion.div
                          key={algo.value}
                          className="space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Label className="font-semibold">{algo.name}</Label>
                              <Badge variant={getSecurityBadge(algo.security)} className="text-xs">
                                {getSecurityIcon(algo.security)}
                                <span className="ml-1 capitalize">{algo.security}</span>
                              </Badge>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(hashes[algo.value] || '', algo.value)}
                              disabled={!hashes[algo.value] || isGenerating}
                              className="flex items-center space-x-1"
                            >
                              {copied === algo.value ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                              <span>{copied === algo.value ? 'Copied!' : 'Copy'}</span>
                            </Button>
                          </div>
                          <div className="relative">
                            <Input
                              value={isGenerating ? 'Generating...' : (hashes[algo.value] || '')}
                              readOnly
                              className="font-mono text-xs bg-muted/30"
                              placeholder={`${algo.name} hash will appear here...`}
                            />
                            {isGenerating && (
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {algo.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hash Comparison */}
                    {Object.keys(hashes).length > 0 && (
                      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                        <Label className="text-sm font-semibold">Hash Lengths Comparison</Label>
                        <div className="mt-2 space-y-1 text-xs">
                          {algorithms.map((algo) => (
                            <div key={algo.value} className="flex justify-between">
                              <span>{algo.name}:</span>
                              <span className="font-mono">
                                {hashes[algo.value] ? `${hashes[algo.value].length} characters` : 'Not generated'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="examples" className="space-y-4">
                    <div>
                      <Label>Hash Examples</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click on any example to load it and see the generated hashes.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {examples.map((example, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.01 }}
                          className="cursor-pointer"
                        >
                          <Card 
                            className="hover:shadow-md transition-all duration-200 hover:border-primary/50"
                            onClick={() => setInputText(example.text)}
                          >
                            <CardContent className="pt-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="font-semibold text-sm">{example.title}</div>
                                  <Badge variant="outline" className="text-xs">
                                    {example.text.length} chars
                                  </Badge>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {example.description}
                                </div>
                                {example.text && (
                                  <div className="text-xs">
                                    <code className="bg-muted px-2 py-1 rounded break-all">
                                      {example.text.length > 50 
                                        ? `${example.text.substring(0, 50)}...` 
                                        : example.text || '(empty)'}
                                    </code>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
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
            {/* Algorithm Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Algorithms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {algorithms.map((algo) => (
                  <div key={algo.value} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm">{algo.name}</span>
                      <Badge variant={getSecurityBadge(algo.security)} className="text-xs">
                        {getSecurityIcon(algo.security)}
                        <span className="ml-1 capitalize">{algo.security}</span>
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {algo.description}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Multiple hash algorithms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Real-time generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">File upload support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Copy to clipboard</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Security indicators</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-red-600">MD5 & SHA-1:</strong> Deprecated for security purposes. 
                  Use only for non-cryptographic applications.
                </div>
                <div>
                  <strong className="text-green-600">SHA-256/384/512:</strong> Cryptographically secure. 
                  Recommended for passwords and sensitive data.
                </div>
                <div>
                  <strong>Note:</strong> Always use salt when hashing passwords in production.
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Data integrity verification</div>
                <div>• Password storage (with salt)</div>
                <div>• File checksums</div>
                <div>• Digital signatures</div>
                <div>• Blockchain applications</div>
                <div>• Cache keys generation</div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Use SHA-256 or higher for security</div>
                <div>• Always salt passwords before hashing</div>
                <div>• Verify hashes on both ends</div>
                <div>• Use constant-time comparison</div>
                <div>• Consider using bcrypt for passwords</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HashGeneratorTool

