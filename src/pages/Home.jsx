import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  Calculator,
  Palette,
  Code,
  TrendingUp,
  Shield,
  Zap,
  Star,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  Target,
  Globe,
  Heart
} from 'lucide-react'

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [stats, setStats] = useState({
    tools: 50,
    users: 10000,
    countries: 150
  })

  // Animate stats on mount
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps
      
      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        
        setStats({
          tools: Math.floor(50 * progress),
          users: Math.floor(10000 * progress),
          countries: Math.floor(150 * progress)
        })
        
        if (currentStep >= steps) {
          clearInterval(interval)
          setStats({ tools: 50, users: 10000, countries: 150 })
        }
      }, stepDuration)
      
      return () => clearInterval(interval)
    }
    
    const timer = setTimeout(animateStats, 500)
    return () => clearTimeout(timer)
  }, [])

  const featuredTools = [
    {
      name: 'Advanced Calculator',
      description: 'Scientific calculator with unit conversion and advanced functions',
      icon: Calculator,
      href: '/tools/calculator',
      category: 'Productivity',
      popular: true
    },
    {
      name: 'Color Palette Generator',
      description: 'Create beautiful color palettes for your design projects',
      icon: Palette,
      href: '/tools/color-picker',
      category: 'Design',
      popular: true
    },
    {
      name: 'JSON Formatter',
      description: 'Format, validate and beautify JSON data with syntax highlighting',
      icon: Code,
      href: '/tools/json-formatter',
      category: 'Developer',
      popular: true
    },
    {
      name: 'Password Generator',
      description: 'Generate secure passwords with customizable options',
      icon: Shield,
      href: '/tools/password-generator',
      category: 'Security',
      popular: false
    },
    {
      name: 'Meta Tag Generator',
      description: 'Generate SEO-optimized meta tags for your website',
      icon: TrendingUp,
      href: '/tools/meta-generator',
      category: 'SEO',
      popular: false
    },
    {
      name: 'QR Code Generator',
      description: 'Create custom QR codes for URLs, text, and more',
      icon: Zap,
      href: '/tools/qr-generator',
      category: 'Utility',
      popular: true
    }
  ]

  const categories = [
    {
      name: 'Productivity Tools',
      description: 'Calculators, converters, and time-saving utilities',
      icon: Calculator,
      count: 12,
      color: 'bg-blue-500'
    },
    {
      name: 'Design Tools',
      description: 'Color tools, image utilities, and creative resources',
      icon: Palette,
      count: 8,
      color: 'bg-purple-500'
    },
    {
      name: 'Developer Tools',
      description: 'Code formatters, validators, and development utilities',
      icon: Code,
      count: 15,
      color: 'bg-green-500'
    },
    {
      name: 'SEO Tools',
      description: 'Meta generators, analyzers, and optimization tools',
      icon: TrendingUp,
      count: 7,
      color: 'bg-orange-500'
    },
    {
      name: 'Security Tools',
      description: 'Password generators, hash tools, and privacy utilities',
      icon: Shield,
      count: 6,
      color: 'bg-red-500'
    }
  ]

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'All tools are optimized for speed and performance'
    },
    {
      icon: Globe,
      title: 'Works Everywhere',
      description: 'Responsive design that works on all devices'
    },
    {
      icon: Heart,
      title: 'Always Free',
      description: 'No hidden fees, no subscriptions, completely free'
    },
    {
      icon: Target,
      title: 'Privacy First',
      description: 'Your data stays in your browser, never stored'
    }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to tools page with search query
      window.location.href = `/tools?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                50+ Free Tools Available
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Ultimate Online Tools
                <br />
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Collection
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Boost your productivity with our comprehensive collection of free web tools. 
                From calculators to code formatters, we've got everything you need in one place.
              </p>

              {/* Search Bar */}
              <motion.form
                onSubmit={handleSearch}
                className="max-w-md mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search for tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 text-lg"
                  />
                  <Button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                    size="sm"
                  >
                    Search
                  </Button>
                </div>
              </motion.form>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link to="/tools">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore All Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Read Our Blog
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stats.tools}+</div>
              <div className="text-muted-foreground">Free Tools</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stats.users.toLocaleString()}+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{stats.countries}+</div>
              <div className="text-muted-foreground">Countries</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Popular Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular and frequently used tools that help thousands 
              of users boost their productivity every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={tool.href}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
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
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="outline" className="text-xs">
                          {tool.category}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Tool Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our organized collection of tools across different categories 
              to find exactly what you need for your projects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={`/tools?category=${category.name.toLowerCase().replace(' tools', '')}`}>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`p-3 ${category.color} rounded-lg group-hover:scale-110 transition-transform`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="group-hover:text-primary transition-colors">
                              {category.name}
                            </CardTitle>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {category.count} tools
                            </Badge>
                          </div>
                        </div>
                        <CardDescription>{category.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose B-Tool?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best online tools experience with 
              these core principles in mind.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust B-Tool for their daily productivity needs. 
              Start exploring our tools today and see the difference.
            </p>
            <Link to="/tools">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home


