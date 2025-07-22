import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Code,
  Copy,
  Check,
  Info,
  Zap,
  Star,
  RefreshCw,
  Download,
  Upload,
  AlertCircle,
  CheckCircle
} from 'lucide-react'

const JSONFormatterTool = () => {
  const [inputJson, setInputJson] = useState('')
  const [outputJson, setOutputJson] = useState('')
  const [isValid, setIsValid] = useState(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [indentSize, setIndentSize] = useState('2')
  const [sortKeys, setSortKeys] = useState(false)

  const formatJSON = () => {
    try {
      if (!inputJson.trim()) {
        setError('Please enter JSON data to format')
        setIsValid(false)
        setOutputJson('')
        return
      }

      const parsed = JSON.parse(inputJson)
      const indent = parseInt(indentSize)
      
      let formatted
      if (sortKeys) {
        formatted = JSON.stringify(sortObjectKeys(parsed), null, indent)
      } else {
        formatted = JSON.stringify(parsed, null, indent)
      }
      
      setOutputJson(formatted)
      setIsValid(true)
      setError('')
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      setIsValid(false)
      setOutputJson('')
    }
  }

  const minifyJSON = () => {
    try {
      if (!inputJson.trim()) {
        setError('Please enter JSON data to minify')
        setIsValid(false)
        setOutputJson('')
        return
      }

      const parsed = JSON.parse(inputJson)
      const minified = JSON.stringify(parsed)
      
      setOutputJson(minified)
      setIsValid(true)
      setError('')
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      setIsValid(false)
      setOutputJson('')
    }
  }

  const validateJSON = () => {
    try {
      if (!inputJson.trim()) {
        setError('Please enter JSON data to validate')
        setIsValid(false)
        return
      }

      JSON.parse(inputJson)
      setIsValid(true)
      setError('')
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`)
      setIsValid(false)
    }
  }

  const sortObjectKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys)
    } else if (obj !== null && typeof obj === 'object') {
      const sorted = {}
      Object.keys(obj).sort().forEach(key => {
        sorted[key] = sortObjectKeys(obj[key])
      })
      return sorted
    }
    return obj
  }

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearAll = () => {
    setInputJson('')
    setOutputJson('')
    setIsValid(null)
    setError('')
  }

  const loadSampleJSON = () => {
    const sample = {
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com",
      "address": {
        "street": "123 Main St",
        "city": "New York",
        "zipCode": "10001",
        "country": "USA"
      },
      "hobbies": ["reading", "swimming", "coding"],
      "isActive": true,
      "balance": 1250.75,
      "friends": [
        {
          "name": "Jane Smith",
          "age": 28
        },
        {
          "name": "Bob Johnson",
          "age": 32
        }
      ]
    }
    setInputJson(JSON.stringify(sample))
  }

  const downloadJSON = () => {
    if (!outputJson) return
    
    const blob = new Blob([outputJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'formatted.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInputJson(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const getJsonStats = () => {
    if (!outputJson) return null
    
    try {
      const parsed = JSON.parse(outputJson)
      const stats = {
        size: new Blob([outputJson]).size,
        lines: outputJson.split('\n').length,
        characters: outputJson.length,
        objects: 0,
        arrays: 0,
        strings: 0,
        numbers: 0,
        booleans: 0,
        nulls: 0
      }
      
      const countTypes = (obj) => {
        if (Array.isArray(obj)) {
          stats.arrays++
          obj.forEach(countTypes)
        } else if (obj === null) {
          stats.nulls++
        } else if (typeof obj === 'object') {
          stats.objects++
          Object.values(obj).forEach(countTypes)
        } else if (typeof obj === 'string') {
          stats.strings++
        } else if (typeof obj === 'number') {
          stats.numbers++
        } else if (typeof obj === 'boolean') {
          stats.booleans++
        }
      }
      
      countTypes(parsed)
      return stats
    } catch {
      return null
    }
  }

  const stats = getJsonStats()

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
              <h1 className="text-3xl font-bold">JSON Formatter & Validator</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Format, validate, and beautify JSON data with syntax highlighting and error detection. 
            Perfect for developers and API testing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* JSON Editor */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  JSON Formatter
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={loadSampleJSON}
                      className="flex items-center space-x-1"
                    >
                      <Code className="h-4 w-4" />
                      <span>Sample</span>
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
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="formatter" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="formatter">Format</TabsTrigger>
                    <TabsTrigger value="validator">Validate</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="formatter" className="space-y-4">
                    {/* Input Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Input JSON</Label>
                        <div className="flex space-x-2">
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="json-upload"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('json-upload').click()}
                            className="flex items-center space-x-1"
                          >
                            <Upload className="h-3 w-3" />
                            <span>Upload</span>
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={inputJson}
                        onChange={(e) => setInputJson(e.target.value)}
                        placeholder="Paste your JSON here..."
                        className="min-h-[200px] font-mono text-sm"
                      />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={formatJSON} className="flex items-center space-x-1">
                        <Code className="h-4 w-4" />
                        <span>Format</span>
                      </Button>
                      <Button onClick={minifyJSON} variant="outline" className="flex items-center space-x-1">
                        <Zap className="h-4 w-4" />
                        <span>Minify</span>
                      </Button>
                      <Button onClick={validateJSON} variant="outline" className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Validate</span>
                      </Button>
                    </div>

                    {/* Status */}
                    {isValid !== null && (
                      <div className={`flex items-center space-x-2 p-3 rounded-lg ${
                        isValid ? 'bg-green-50 text-green-700 border border-green-200' : 
                                 'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {isValid ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <span className="text-sm">
                          {isValid ? 'Valid JSON' : error}
                        </span>
                      </div>
                    )}

                    {/* Output Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Formatted JSON</Label>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(outputJson)}
                            disabled={!outputJson}
                            className="flex items-center space-x-1"
                          >
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={downloadJSON}
                            disabled={!outputJson}
                            className="flex items-center space-x-1"
                          >
                            <Download className="h-3 w-3" />
                            <span>Download</span>
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={outputJson}
                        readOnly
                        placeholder="Formatted JSON will appear here..."
                        className="min-h-[300px] font-mono text-sm bg-muted/30"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="validator" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label>JSON to Validate</Label>
                        <Textarea
                          value={inputJson}
                          onChange={(e) => setInputJson(e.target.value)}
                          placeholder="Enter JSON to validate..."
                          className="min-h-[200px] font-mono text-sm mt-2"
                        />
                      </div>
                      
                      <Button onClick={validateJSON} className="w-full">
                        Validate JSON
                      </Button>

                      {isValid !== null && (
                        <div className={`p-4 rounded-lg border ${
                          isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center space-x-2 mb-2">
                            {isValid ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <AlertCircle className="h-5 w-5 text-red-600" />
                            )}
                            <span className={`font-semibold ${
                              isValid ? 'text-green-700' : 'text-red-700'
                            }`}>
                              {isValid ? 'Valid JSON' : 'Invalid JSON'}
                            </span>
                          </div>
                          {!isValid && (
                            <p className="text-red-600 text-sm">{error}</p>
                          )}
                          {isValid && stats && (
                            <div className="text-green-600 text-sm space-y-1">
                              <p>✓ JSON is well-formed and valid</p>
                              <p>✓ {stats.characters} characters, {stats.lines} lines</p>
                              <p>✓ Contains {stats.objects} objects, {stats.arrays} arrays</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <Label>Indentation Size</Label>
                        <Select value={indentSize} onValueChange={setIndentSize}>
                          <SelectTrigger className="w-full mt-2">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 spaces</SelectItem>
                            <SelectItem value="4">4 spaces</SelectItem>
                            <SelectItem value="8">8 spaces</SelectItem>
                            <SelectItem value="tab">Tab</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="sort-keys"
                          checked={sortKeys}
                          onChange={(e) => setSortKeys(e.target.checked)}
                          className="rounded"
                        />
                        <Label htmlFor="sort-keys">Sort object keys alphabetically</Label>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-semibold mb-2">Formatting Options</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Indentation controls the spacing of nested elements</li>
                          <li>• Sort keys option arranges object properties alphabetically</li>
                          <li>• Minify removes all unnecessary whitespace</li>
                          <li>• Format adds proper indentation and line breaks</li>
                        </ul>
                      </div>
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
            {/* Statistics */}
            {stats && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    JSON Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span>{stats.size} bytes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lines:</span>
                    <span>{stats.lines}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Characters:</span>
                    <span>{stats.characters}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between">
                    <span>Objects:</span>
                    <span>{stats.objects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Arrays:</span>
                    <span>{stats.arrays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Strings:</span>
                    <span>{stats.strings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Numbers:</span>
                    <span>{stats.numbers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Booleans:</span>
                    <span>{stats.booleans}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nulls:</span>
                    <span>{stats.nulls}</span>
                  </div>
                </CardContent>
              </Card>
            )}

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
                  <span className="text-sm">Format & beautify JSON</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Validate JSON syntax</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Minify JSON data</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Sort object keys</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Upload/download files</span>
                </div>
              </CardContent>
            </Card>

            {/* How to Use */}
            <Card>
              <CardHeader>
                <CardTitle>How to Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong>Format:</strong> Paste JSON and click Format to beautify with proper indentation.
                </div>
                <div>
                  <strong>Validate:</strong> Check if your JSON syntax is correct and get detailed error messages.
                </div>
                <div>
                  <strong>Minify:</strong> Remove all whitespace to reduce file size for production.
                </div>
                <div>
                  <strong>Upload:</strong> Load JSON files directly from your computer.
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Use 2-space indentation for web standards</div>
                <div>• Sort keys for consistent formatting</div>
                <div>• Validate before using in production</div>
                <div>• Minify to reduce bandwidth usage</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default JSONFormatterTool

