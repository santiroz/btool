import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText,
  Copy,
  Check,
  Info,
  Zap,
  Star,
  RefreshCw,
  Upload,
  BarChart3,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react'

const WordCounterTool = () => {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  })
  const [wordFrequency, setWordFrequency] = useState([])
  const [targets, setTargets] = useState({
    words: 500,
    characters: 2500
  })

  // Calculate statistics
  useEffect(() => {
    const calculateStats = () => {
      if (!text.trim()) {
        setStats({
          characters: 0,
          charactersNoSpaces: 0,
          words: 0,
          sentences: 0,
          paragraphs: 0,
          readingTime: 0,
          speakingTime: 0
        })
        setWordFrequency([])
        return
      }

      const characters = text.length
      const charactersNoSpaces = text.replace(/\s/g, '').length
      
      // Words count (split by whitespace and filter empty strings)
      const words = text.trim().split(/\s+/).filter(word => word.length > 0).length
      
      // Sentences count (split by sentence endings)
      const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length
      
      // Paragraphs count (split by double line breaks)
      const paragraphs = text.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0).length
      
      // Reading time (average 200 words per minute)
      const readingTime = Math.ceil(words / 200)
      
      // Speaking time (average 150 words per minute)
      const speakingTime = Math.ceil(words / 150)

      setStats({
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        readingTime,
        speakingTime
      })

      // Calculate word frequency
      if (words > 0) {
        const wordList = text.toLowerCase()
          .replace(/[^\w\s]/g, '')
          .split(/\s+/)
          .filter(word => word.length > 2) // Filter out short words
        
        const frequency = {}
        wordList.forEach(word => {
          frequency[word] = (frequency[word] || 0) + 1
        })

        const sortedWords = Object.entries(frequency)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10)
          .map(([word, count]) => ({ word, count }))

        setWordFrequency(sortedWords)
      } else {
        setWordFrequency([])
      }
    }

    calculateStats()
  }, [text])

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearText = () => {
    setText('')
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type === 'text/plain') {
      const reader = new FileReader()
      reader.onload = (e) => {
        setText(e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const loadSampleText = () => {
    const sample = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.`
    setText(sample)
  }

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100)
  }

  const getProgressColor = (percentage) => {
    if (percentage < 50) return 'bg-red-500'
    if (percentage < 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const formatTime = (minutes) => {
    if (minutes < 1) return 'Less than 1 minute'
    if (minutes === 1) return '1 minute'
    if (minutes < 60) return `${minutes} minutes`
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes}m`
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Word Counter & Text Analyzer</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Count words, characters, sentences, and paragraphs. Analyze reading time, 
            word frequency, and get detailed text statistics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Text Input */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Text Analyzer
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
                      onClick={loadSampleText}
                      className="flex items-center space-x-1"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Sample</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearText}
                      className="flex items-center space-x-1"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Clear</span>
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>
                  Type or paste your text below to get instant word count and analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="editor" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="frequency">Word Frequency</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="editor" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Text Content</Label>
                      <Textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Start typing or paste your text here..."
                        className="min-h-[400px] font-mono text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {stats.words} words • {stats.characters} characters
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyText}
                        disabled={!text}
                        className="flex items-center space-x-1"
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis" className="space-y-6">
                    {/* Progress Bars */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm">Word Count Progress</Label>
                          <span className="text-sm text-muted-foreground">
                            {stats.words} / {targets.words}
                          </span>
                        </div>
                        <Progress value={getProgressPercentage(stats.words, targets.words)} className="h-2">
                          <div 
                            className={`h-full rounded-full transition-all ${getProgressColor(getProgressPercentage(stats.words, targets.words))}`}
                            style={{ width: `${getProgressPercentage(stats.words, targets.words)}%` }}
                          />
                        </Progress>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm">Character Count Progress</Label>
                          <span className="text-sm text-muted-foreground">
                            {stats.characters} / {targets.characters}
                          </span>
                        </div>
                        <Progress value={getProgressPercentage(stats.characters, targets.characters)} className="h-2">
                          <div 
                            className={`h-full rounded-full transition-all ${getProgressColor(getProgressPercentage(stats.characters, targets.characters))}`}
                            style={{ width: `${getProgressPercentage(stats.characters, targets.characters)}%` }}
                          />
                        </Progress>
                      </div>
                    </div>

                    {/* Detailed Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{stats.sentences}</div>
                        <div className="text-sm text-muted-foreground">Sentences</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{stats.paragraphs}</div>
                        <div className="text-sm text-muted-foreground">Paragraphs</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{stats.charactersNoSpaces}</div>
                        <div className="text-sm text-muted-foreground">Characters (no spaces)</div>
                      </div>
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {stats.words > 0 ? (stats.characters / stats.words).toFixed(1) : 0}
                        </div>
                        <div className="text-sm text-muted-foreground">Avg. chars per word</div>
                      </div>
                    </div>

                    {/* Reading Time */}
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-semibold">Reading Time</span>
                          </div>
                          <div className="text-lg font-bold">{formatTime(stats.readingTime)}</div>
                          <div className="text-xs text-muted-foreground">At 200 words/min</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <span className="font-semibold">Speaking Time</span>
                          </div>
                          <div className="text-lg font-bold">{formatTime(stats.speakingTime)}</div>
                          <div className="text-xs text-muted-foreground">At 150 words/min</div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="frequency" className="space-y-4">
                    {wordFrequency.length > 0 ? (
                      <div className="space-y-3">
                        <Label>Most Frequent Words (3+ characters)</Label>
                        {wordFrequency.map((item, index) => (
                          <div key={item.word} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                                {index + 1}
                              </div>
                              <span className="font-medium">{item.word}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="text-sm text-muted-foreground">{item.count} times</div>
                              <div className="w-20 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${(item.count / wordFrequency[0].count) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter text to see word frequency analysis</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Words:</span>
                  <span className="font-bold text-primary">{stats.words}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Characters:</span>
                  <span className="font-bold text-primary">{stats.characters}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Characters (no spaces):</span>
                  <span className="font-bold text-primary">{stats.charactersNoSpaces}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sentences:</span>
                  <span className="font-bold text-primary">{stats.sentences}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Paragraphs:</span>
                  <span className="font-bold text-primary">{stats.paragraphs}</span>
                </div>
              </CardContent>
            </Card>

            {/* Target Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Writing Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm">Word Target</Label>
                  <input
                    type="number"
                    value={targets.words}
                    onChange={(e) => setTargets(prev => ({ ...prev, words: parseInt(e.target.value) || 0 }))}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm"
                    min="1"
                  />
                </div>
                <div>
                  <Label className="text-sm">Character Target</Label>
                  <input
                    type="number"
                    value={targets.characters}
                    onChange={(e) => setTargets(prev => ({ ...prev, characters: parseInt(e.target.value) || 0 }))}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm"
                    min="1"
                  />
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
                  <span className="text-sm">Real-time word counting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Character analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Reading time estimation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Word frequency analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Writing goal tracking</span>
                </div>
              </CardContent>
            </Card>

            {/* How to Use */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  How to Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong>Type or Paste:</strong> Enter your text in the editor for instant analysis.
                </div>
                <div>
                  <strong>Upload Files:</strong> Upload .txt files for quick analysis.
                </div>
                <div>
                  <strong>Set Goals:</strong> Define word and character targets to track progress.
                </div>
                <div>
                  <strong>Analyze:</strong> View detailed statistics and word frequency data.
                </div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Perfect For</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Academic essays and papers</div>
                <div>• Blog posts and articles</div>
                <div>• Social media content</div>
                <div>• Email and business writing</div>
                <div>• Creative writing projects</div>
                <div>• SEO content optimization</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default WordCounterTool

