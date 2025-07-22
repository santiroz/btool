import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Link,
  Copy,
  Check,
  Info,
  Zap,
  Star,
  RefreshCw,
  ArrowLeftRight,
  Globe,
  Code,
  AlertTriangle
} from 'lucide-react'

const URLEncoderTool = () => {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [mode, setMode] = useState('encode')
  const [copied, setCopied] = useState('')
  const [error, setError] = useState('')

  const encodeURL = (text) => {
    try {
      return encodeURIComponent(text)
    } catch (err) {
      throw new Error('Failed to encode URL')
    }
  }

  const decodeURL = (text) => {
    try {
      return decodeURIComponent(text)
    } catch (err) {
      throw new Error('Failed to decode URL: Invalid URL encoding')
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
        result = encodeURL(inputText)
      } else {
        result = decodeURL(inputText)
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

  const loadSample = () => {
    if (mode === 'encode') {
      setInputText('Hello World! This is a test with special characters: @#$%^&*()+=[]{}|;:,.<>?')
    } else {
      setInputText('Hello%20World%21%20This%20is%20a%20test%20with%20special%20characters%3A%20%40%23%24%25%5E%26*%28%29%2B%3D%5B%5D%7B%7D%7C%3B%3A%2C.%3C%3E%3F')
    }
  }

  const examples = [
    {
      title: 'Simple Text with Spaces',
      original: 'Hello World',
      encoded: 'Hello%20World',
      description: 'Basic space encoding'
    },
    {
      title: 'Special Characters',
      original: 'user@example.com',
      encoded: 'user%40example.com',
      description: 'Email address encoding'
    },
    {
      title: 'Query Parameters',
      original: 'name=John Doe&age=30&city=New York',
      encoded: 'name%3DJohn%20Doe%26age%3D30%26city%3DNew%20York',
      description: 'URL query string encoding'
    },
    {
      title: 'Unicode Characters',
      original: 'Hello 世界 🌍',
      encoded: 'Hello%20%E4%B8%96%E7%95%8C%20%F0%9F%8C%8D',
      description: 'Unicode and emoji encoding'
    },
    {
      title: 'Full URL',
      original: 'https://example.com/search?q=hello world&lang=en',
      encoded: 'https%3A//example.com/search%3Fq%3Dhello%20world%26lang%3Den',
      description: 'Complete URL encoding'
    }
  ]

  const reservedCharacters = [
    { char: ' ', encoded: '%20', name: 'Space' },
    { char: '!', encoded: '%21', name: 'Exclamation' },
    { char: '"', encoded: '%22', name: 'Quote' },
    { char: '#', encoded: '%23', name: 'Hash' },
    { char: '$', encoded: '%24', name: 'Dollar' },
    { char: '%', encoded: '%25', name: 'Percent' },
    { char: '&', encoded: '%26', name: 'Ampersand' },
    { char: "'", encoded: '%27', name: 'Apostrophe' },
    { char: '(', encoded: '%28', name: 'Left Parenthesis' },
    { char: ')', encoded: '%29', name: 'Right Parenthesis' },
    { char: '*', encoded: '%2A', name: 'Asterisk' },
    { char: '+', encoded: '%2B', name: 'Plus' },
    { char: ',', encoded: '%2C', name: 'Comma' },
    { char: '/', encoded: '%2F', name: 'Forward Slash' },
    { char: ':', encoded: '%3A', name: 'Colon' },
    { char: ';', encoded: '%3B', name: 'Semicolon' },
    { char: '<', encoded: '%3C', name: 'Less Than' },
    { char: '=', encoded: '%3D', name: 'Equals' },
    { char: '>', encoded: '%3E', name: 'Greater Than' },
    { char: '?', encoded: '%3F', name: 'Question Mark' },
    { char: '@', encoded: '%40', name: 'At Symbol' },
    { char: '[', encoded: '%5B', name: 'Left Bracket' },
    { char: '\\', encoded: '%5C', name: 'Backslash' },
    { char: ']', encoded: '%5D', name: 'Right Bracket' },
    { char: '^', encoded: '%5E', name: 'Caret' },
    { char: '`', encoded: '%60', name: 'Backtick' },
    { char: '{', encoded: '%7B', name: 'Left Brace' },
    { char: '|', encoded: '%7C', name: 'Pipe' },
    { char: '}', encoded: '%7D', name: 'Right Brace' },
    { char: '~', encoded: '%7E', name: 'Tilde' }
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
              <Link className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">URL Encoder & Decoder</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Encode and decode URLs and URI components. Convert special characters to percent-encoded format 
            for safe transmission in URLs and web applications.
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
                    {mode === 'encode' ? <Code className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                    <span>URL {mode === 'encode' ? 'Encoder' : 'Decoder'}</span>
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
                    ? 'Convert text to URL-safe percent-encoded format'
                    : 'Convert percent-encoded URLs back to readable text'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tool" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tool">Encoder/Decoder</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="reference">Reference</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tool" className="space-y-6">
                    {/* Input Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>
                          {mode === 'encode' ? 'Text to Encode' : 'URL to Decode'}
                        </Label>
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
                      <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={mode === 'encode' 
                          ? 'Enter text to encode for URL use...'
                          : 'Enter percent-encoded URL to decode...'
                        }
                        className="min-h-[120px] font-mono text-sm"
                      />
                    </div>

                    {/* Process Button */}
                    <Button onClick={processText} className="w-full">
                      {mode === 'encode' ? (
                        <>
                          <Code className="mr-2 h-4 w-4" />
                          Encode URL
                        </>
                      ) : (
                        <>
                          <Globe className="mr-2 h-4 w-4" />
                          Decode URL
                        </>
                      )}
                    </Button>

                    {/* Error Display */}
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* Output Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>
                          {mode === 'encode' ? 'Encoded URL' : 'Decoded Text'}
                        </Label>
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
                      </div>
                      <Textarea
                        value={outputText}
                        readOnly
                        placeholder={mode === 'encode' 
                          ? 'URL-encoded result will appear here...'
                          : 'Decoded text will appear here...'
                        }
                        className="min-h-[120px] font-mono text-sm bg-muted/30"
                      />
                    </div>

                    {/* Stats */}
                    {(inputText || outputText) && (
                      <div className="grid grid-cols-3 gap-4 text-sm">
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
                        <div className="p-3 bg-muted/30 rounded-lg">
                          <div className="font-semibold">Size Change</div>
                          <div className="text-muted-foreground">
                            {inputText.length > 0 ? 
                              `${((outputText.length - inputText.length) / inputText.length * 100).toFixed(1)}%` 
                              : '0%'
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="examples" className="space-y-4">
                    <div>
                      <Label>URL Encoding Examples</Label>
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
                                setInputText(example.original)
                              } else {
                                setInputText(example.encoded)
                              }
                            }}
                          >
                            <CardContent className="pt-4">
                              <div className="space-y-2">
                                <div className="font-semibold text-sm">{example.title}</div>
                                <div className="text-xs text-muted-foreground">{example.description}</div>
                                <div className="space-y-1 text-xs">
                                  <div>
                                    <span className="text-muted-foreground">Original:</span>
                                    <code className="ml-2 bg-muted px-1 rounded break-all">{example.original}</code>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Encoded:</span>
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

                  <TabsContent value="reference" className="space-y-4">
                    <div>
                      <Label>URL Encoding Reference</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Common characters and their percent-encoded equivalents.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {reservedCharacters.map((item, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <code className="bg-background px-2 py-1 rounded font-mono">
                              {item.char === ' ' ? '(space)' : item.char}
                            </code>
                            <span className="text-muted-foreground">{item.name}</span>
                          </div>
                          <code className="bg-primary/10 text-primary px-2 py-1 rounded font-mono">
                            {item.encoded}
                          </code>
                        </div>
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
                  <span className="text-sm">Encode & decode URLs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Unicode character support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Bidirectional conversion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Character reference table</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Copy to clipboard</span>
                </div>
              </CardContent>
            </Card>

            {/* What is URL Encoding */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  What is URL Encoding?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  URL encoding (percent-encoding) converts characters into a format 
                  that can be transmitted over the Internet safely.
                </p>
                <p>
                  Special characters are replaced with a percent sign (%) followed 
                  by two hexadecimal digits representing the character's ASCII code.
                </p>
                <p>
                  This ensures that URLs work correctly across different systems 
                  and don't break due to special characters.
                </p>
              </CardContent>
            </Card>

            {/* When to Use */}
            <Card>
              <CardHeader>
                <CardTitle>When to Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• URL query parameters with spaces</div>
                <div>• Form data submission</div>
                <div>• API endpoint parameters</div>
                <div>• File names in URLs</div>
                <div>• Search queries in URLs</div>
                <div>• International characters in URLs</div>
              </CardContent>
            </Card>

            {/* Reserved Characters */}
            <Card>
              <CardHeader>
                <CardTitle>Reserved Characters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>Always Encode:</strong>
                  <div className="text-muted-foreground mt-1">
                    Space, !, &quot;, #, $, %, &amp;, &apos;, (, ), *, +, ,, /, :, ;, =, ?, @, [, \, ], ^, `, {'{'}', |, {'}'}, ~
                  </div>
                </div>
                <div>
                  <strong>Safe Characters:</strong>
                  <div className="text-muted-foreground mt-1">
                    A-Z, a-z, 0-9, -, ., _, ~
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Always encode user input in URLs</div>
                <div>• Decode URLs before displaying to users</div>
                <div>• Use proper encoding for different URL parts</div>
                <div>• Test with international characters</div>
                <div>• Validate decoded output for security</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default URLEncoderTool

