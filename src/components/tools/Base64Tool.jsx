import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Code,
  Copy,
  Check,
  Info,
  Zap,
  Star,
  RefreshCw,
  Upload,
  Download,
  ArrowLeftRight,
  Lock,
  Unlock
} from 'lucide-react'

const Base64Tool = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState('encode')
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  const encodeBase64 = (text) => {
    try {
      return btoa(unescape(encodeURIComponent(text)))
    } catch (err) {
      throw new Error('Failed to encode: Invalid characters')
    }
  }

  const decodeBase64 = (text) => {
    try {
      return decodeURIComponent(escape(atob(text)))
    } catch (err) {
      throw new Error('Failed to decode: Invalid Base64 string')
    }
  }

  const processText = () => {
    if (!inputText.trim()) {
      setError('Please enter text to process')
      setOutputText('')
      return
    }

    try {
      let result
      if (mode === 'encode') {
        result = encodeBase64(inputText)
      } else {
        result = decodeBase64(inputText)
      }
      setOutputText(result)
      setError('')
    } catch (err) {
      setError(err.message)
      setOutputText('')
    }
  }

  const swapMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode'
    setMode(newMode)
    
    // Swap input and output if both have content
    if (inputText && outputText) {
      setInputText(outputText)
      setOutputText(inputText)
    }
  }

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearAll = () => {
    setInputText('')
    setOutputText('')
    setError('')
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (mode === 'encode') {
          setInputText(e.target.result)
        } else {
          // For decode mode, read as base64
          const base64 = btoa(e.target.result)
          setInputText(base64)
        }
      }
      
      if (mode === 'encode') {
        reader.readAsText(file)
      } else {
        reader.readAsBinaryString(file)
      }
    }
  }

  const downloadResult = () => {
    if (!outputText) return
    
    const blob = new Blob([outputText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = mode === 'encode' ? 'encoded.txt' : 'decoded.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const loadSample = () => {
    if (mode === 'encode') {
      setInputText('Hello, World! This is a sample text for Base64 encoding.')
    } else {
      setInputText('SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4=')
    }
  }

  const examples = [
    {
      title: 'Simple Text',
      input: 'Hello World',
      encoded: 'SGVsbG8gV29ybGQ='
    },
    {
      title: 'Special Characters',
      input: 'Hello, 世界! 🌍',
      encoded: 'SGVsbG8sIOS4lueVjCEg8J+MjQ=='
    },
    {
      title: 'JSON Data',
      input: '{"name":"John","age":30}',
      encoded: 'eyJuYW1lIjoiSm9obiIsImFnZSI6MzB9'
    },
    {
      title: 'URL',
      input: 'https://example.com/path?param=value',
      encoded: 'aHR0cHM6Ly9leGFtcGxlLmNvbS9wYXRoP3BhcmFtPXZhbHVl'
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
              <Code className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Base64 Encoder & Decoder</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encode and decode text using Base64 encoding. Perfect for data transmission, 
            URL encoding, and storing binary data in text format.
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
                  <div className="flex items-center space-x-2">
                    {mode === 'encode' ? <Lock className="h-5 w-5" /> : <Unlock className="h-5 w-5" />}
                    <span>Base64 {mode === 'encode' ? 'Encoder' : 'Decoder'}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={swapMode}
                      className="flex items-center space-x-1"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                      <span>Switch</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAll}
                      className="flex items-center space-x-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Clear</span>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  {mode === 'encode' 
                    ? 'Convert plain text to Base64 encoded format'
                    : 'Convert Base64 encoded text back to plain text'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tool" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="tool">Encoder/Decoder</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tool" className="space-y-6">
                    {/* Input Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>
                          {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
                        </Label>
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
                            <Upload className="h-3 w-3" />
                            <span>Upload</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={loadSample}
                            className="flex items-center space-x-1"
                          >
                            <Code className="h-3 w-3" />
                            <span>Sample</span>
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={mode === 'encode' 
                          ? 'Enter text to encode...'
                          : 'Enter Base64 encoded text to decode...'
                        }
                        className="min-h-[150px] font-mono text-sm"
                      />
                    </div>

                    {/* Process Button */}
                    <Button onClick={processText} className="w-full">
                      {mode === 'encode' ? (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          Encode to Base64
                        </>
                      ) : (
                        <>
                          <Unlock className="mr-2 h-4 w-4" />
                          Decode from Base64
                        </>
                      )}
                    </Button>

                    {/* Error Display */}
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Output Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>
                          {mode === 'encode' ? 'Base64 Output' : 'Plain Text Output'}
                        </Label>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(outputText, 'output')}
                            disabled={!outputText}
                            className="flex items-center space-x-1"
                          >
                            {copied === 'output' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            <span>{copied === 'output' ? 'Copied!' : 'Copy'}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={downloadResult}
                            disabled={!outputText}
                            className="flex items-center space-x-1"
                          >
                            <Download className="h-3 w-3" />
                            <span>Download</span>
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={outputText}
                        readOnly
                        placeholder={mode === 'encode' 
                          ? 'Base64 encoded result will appear here...'
                          : 'Decoded text will appear here...'
                        }
                        className="min-h-[150px] font-mono text-sm bg-muted/30"
                      />
                    </div>

                    {/* Stats */}
                    {(inputText || outputText) && (
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="font-semibold">Input</div>
                          <div className="text-muted-foreground">
                            {inputText.length} characters
                          </div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="font-semibold">Output</div>
                          <div className="text-muted-foreground">
                            {outputText.length} characters
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="examples" className="space-y-4">
                    <div>
                      <Label>Base64 Examples</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click on any example to load it into the tool.
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
                            onClick={() => {
                              if (mode === 'encode') {
                                setInputText(example.input)
                              } else {
                                setInputText(example.encoded)
                              }
                            }}
                          >
                            <CardContent className="pt-4">
                              <div className="space-y-2">
                                <div className="font-semibold text-sm">{example.title}</div>
                                <div className="space-y-1 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">Plain:</span>
                                    <code className="ml-2 bg-muted px-1 rounded">{example.input}</code>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Base64:</span>
                                    <code className="ml-2 bg-muted px-1 rounded break-all">{example.encoded}</code>
                                  </div>
                                </div>
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
                  <span className="text-sm">Encode & decode Base64</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">UTF-8 character support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">File upload support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Download results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Copy to clipboard</span>
                </div>
              </CardContent>
            </Card>

            {/* What is Base64 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  What is Base64?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Base64 is a binary-to-text encoding scheme that represents binary data 
                  in an ASCII string format using 64 printable characters.
                </p>
                <p>
                  It's commonly used for encoding data in email, storing complex data 
                  in XML or JSON, and embedding images in HTML/CSS.
                </p>
                <p>
                  The encoded data is about 33% larger than the original, but it's 
                  safe for transmission over text-based protocols.
                </p>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Email attachments (MIME)</div>
                <div>• Data URLs for images</div>
                <div>• API authentication tokens</div>
                <div>• Storing binary data in JSON</div>
                <div>• URL-safe data transmission</div>
                <div>• Configuration files</div>
              </CardContent>
            </Card>

            {/* Character Set */}
            <Card>
              <CardHeader>
                <CardTitle>Base64 Character Set</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-2">
                  <div>
                    <strong>A-Z:</strong> <code className="text-xs">ABCDEFGHIJKLMNOPQRSTUVWXYZ</code>
                  </div>
                  <div>
                    <strong>a-z:</strong> <code className="text-xs">abcdefghijklmnopqrstuvwxyz</code>
                  </div>
                  <div>
                    <strong>0-9:</strong> <code className="text-xs">0123456789</code>
                  </div>
                  <div>
                    <strong>Special:</strong> <code className="text-xs">+ / =</code>
                  </div>
                </div>
                <p className="text-muted-foreground text-xs mt-3">
                  The '=' character is used for padding when needed.
                </p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Base64 is encoding, not encryption</div>
                <div>• Always validate decoded data</div>
                <div>• Use URL-safe Base64 for URLs</div>
                <div>• Remove line breaks for pure Base64</div>
                <div>• Check for proper padding (=)</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Base64Tool

