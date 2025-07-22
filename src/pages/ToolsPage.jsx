import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search,
  Calculator,
  Palette,
  Code,
  TrendingUp,
  Shield,
  Zap,
  Star,
  Filter,
  Grid,
  List,
  Type,
  Hash,
  Key,
  Globe,
  Settings
} from 'lucide-react'

const ToolsPage = () => {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [filteredTools, setFilteredTools] = useState([])

  const allTools = [
    {
      name: 'Calculator',
      description: 'Advanced scientific calculator with unit conversion and mathematical functions',
      icon: Calculator,
      href: '/tools/calculator',
      category: 'productivity',
      popular: true,
      tags: ['math', 'calculation', 'scientific']
    },
    {
      name: 'Color Picker',
      description: 'Pick colors, generate palettes, and convert between color formats',
      icon: Palette,
      href: '/tools/color-picker',
      category: 'design',
      popular: true,
      tags: ['color', 'design', 'palette']
    },
    {
      name: 'JSON Formatter',
      description: 'Format, validate, and beautify JSON data with syntax highlighting',
      icon: Code,
      href: '/tools/json-formatter',
      category: 'developer',
      popular: true,
      tags: ['json', 'format', 'validate']
    },
    {
      name: 'Password Generator',
      description: 'Generate secure passwords with customizable length and character sets',
      icon: Key,
      href: '/tools/password-generator',
      category: 'security',
      popular: true,
      tags: ['password', 'security', 'generate']
    },
    {
      name: 'QR Code Generator',
      description: 'Create QR codes for URLs, text, WiFi credentials, and more',
      icon: Zap,
      href: '/tools/qr-generator',
      category: 'utility',
      popular: true,
      tags: ['qr', 'code', 'generate']
    },
    {
      name: 'Word Counter',
      description: 'Count words, characters, sentences, and analyze text statistics',
      icon: Type,
      href: '/tools/word-counter',
      category: 'productivity',
      popular: false,
      tags: ['text', 'count', 'analysis']
    },
    {
      name: 'Unit Converter',
      description: 'Convert between different units of measurement',
      icon: Settings,
      href: '/tools/unit-converter',
      category: 'productivity',
      popular: false,
      tags: ['convert', 'units', 'measurement']
    },
    {
      name: 'Base64 Encoder/Decoder',
      description: 'Encode and decode Base64 strings with ease',
      icon: Hash,
      href: '/tools/base64',
      category: 'developer',
      popular: false,
      tags: ['base64', 'encode', 'decode']
    },
    {
      name: 'URL Encoder/Decoder',
      description: 'Encode and decode URLs for web development',
      icon: Globe,
      href: '/tools/url-encoder',
      category: 'developer',
      popular: false,
      tags: ['url', 'encode', 'decode']
    },
    {
      name: 'Hash Generator',
      description: 'Generate MD5, SHA1, SHA256, and other hash values',
      icon: Hash,
      href: '/tools/hash-generator',
      category: 'security',
      popular: false,
      tags: ['hash', 'md5', 'sha256']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Tools', icon: Zap },
    { id: 'productivity', name: 'Productivity', icon: Calculator },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'developer', name: 'Developer', icon: Code },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'utility', name: 'Utility', icon: TrendingUp }
  ]

  useEffect(() => {
    let filtered = allTools

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tool => tool.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    setFilteredTools(filtered)
  }, [selectedCategory, searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is handled by useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">All Tools</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of free online tools designed to boost your productivity 
            and streamline your workflow.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Results Count */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-muted-foreground">
            Showing {filteredTools.length} of {allTools.length} tools
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </motion.div>

        {/* Tools Grid/List */}
        <motion.div
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredTools.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link to={tool.href}>
                  <Card className={`h-full hover:shadow-lg transition-all duration-300 group cursor-pointer ${
                    viewMode === 'list' ? 'flex items-center' : ''
                  }`}>
                    <CardHeader className={viewMode === 'list' ? 'flex-shrink-0' : ''}>
                      <div className={`flex items-center ${viewMode === 'list' ? 'space-x-4' : 'justify-between mb-2'}`}>
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {tool.popular && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1 fill-current" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className={viewMode === 'list' ? 'flex-1' : ''}>
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className={viewMode === 'list' ? 'flex-shrink-0' : ''}>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {tool.category}
                        </Badge>
                        {tool.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-4 bg-muted/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or browse different categories.
            </p>
            <Button onClick={() => {
              setSearchQuery('')
              setSelectedCategory('all')
            }}>
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Popular Tools Section */}
        {selectedCategory === 'all' && !searchQuery && (
          <motion.section
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Most Popular Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTools.filter(tool => tool.popular).map((tool, index) => {
                const Icon = tool.icon
                return (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={tool.href}>
                      <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-primary/20">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <Badge className="text-xs">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Popular
                            </Badge>
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {tool.name}
                          </CardTitle>
                          <CardDescription>{tool.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}

export default ToolsPage

