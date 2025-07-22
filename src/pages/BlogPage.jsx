import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  TrendingUp,
  Shield,
  Code,
  Zap
} from 'lucide-react'

const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Online Tools Every Developer Needs",
      excerpt: "Discover the must-have tools that can boost your productivity and streamline your development workflow.",
      content: "In today's fast-paced development environment, having the right tools at your fingertips can make all the difference. From code formatters to password generators, these essential online tools will help you work more efficiently and securely.",
      author: "B-Tool Team",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Development",
      tags: ["productivity", "development", "tools"],
      featured: true
    },
    {
      id: 2,
      title: "The Ultimate Guide to Password Security",
      excerpt: "Learn how to create and manage strong passwords to protect your digital life.",
      content: "Password security is more important than ever. With cyber threats on the rise, understanding how to create, store, and manage secure passwords is crucial for protecting your personal and professional data.",
      author: "Security Expert",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Security",
      tags: ["security", "passwords", "cybersecurity"],
      featured: true
    },
    {
      id: 3,
      title: "JSON Best Practices for Web Developers",
      excerpt: "Master JSON formatting, validation, and optimization techniques.",
      content: "JSON is the backbone of modern web applications. Learn the best practices for working with JSON data, including formatting, validation, and performance optimization techniques.",
      author: "Web Developer",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Web Development",
      tags: ["json", "web development", "api"],
      featured: false
    },
    {
      id: 4,
      title: "Color Theory for Digital Designers",
      excerpt: "Understanding color psychology and how to choose the perfect palette.",
      content: "Color plays a crucial role in design. Learn about color theory, psychology, and practical techniques for creating harmonious color palettes that enhance user experience.",
      author: "Design Team",
      date: "2024-01-01",
      readTime: "7 min read",
      category: "Design",
      tags: ["design", "color theory", "ui/ux"],
      featured: false
    },
    {
      id: 5,
      title: "Productivity Hacks with Online Calculators",
      excerpt: "Maximize your efficiency with advanced calculator features and shortcuts.",
      content: "Online calculators are more powerful than you might think. Discover advanced features, shortcuts, and productivity tips that can save you time in your daily calculations.",
      author: "Productivity Expert",
      date: "2023-12-28",
      readTime: "4 min read",
      category: "Productivity",
      tags: ["productivity", "calculators", "efficiency"],
      featured: false
    },
    {
      id: 6,
      title: "QR Codes: Beyond the Basics",
      excerpt: "Explore advanced QR code applications and best practices.",
      content: "QR codes have evolved far beyond simple URL sharing. Learn about advanced applications, security considerations, and creative uses for QR codes in modern digital experiences.",
      author: "Tech Innovator",
      date: "2023-12-25",
      readTime: "5 min read",
      category: "Technology",
      tags: ["qr codes", "technology", "innovation"],
      featured: false
    }
  ]

  const categories = [
    { name: "All", count: blogPosts.length, icon: BookOpen },
    { name: "Development", count: blogPosts.filter(post => post.category === "Development").length, icon: Code },
    { name: "Security", count: blogPosts.filter(post => post.category === "Security").length, icon: Shield },
    { name: "Design", count: blogPosts.filter(post => post.category === "Design").length, icon: TrendingUp },
    { name: "Productivity", count: blogPosts.filter(post => post.category === "Productivity").length, icon: Zap }
  ]

  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.slice(0, 4)

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
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-lg mr-3">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">B-Tool Blog</h1>
              <p className="text-muted-foreground mt-2">
                Tips, tutorials, and insights about online tools and productivity
              </p>
            </div>
          </div>
        </motion.div>

        {/* Featured Posts */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="default">{post.category}</Badge>
                      <Badge variant="secondary">Featured</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="group-hover:text-primary">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
            <div className="space-y-6">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <Clock className="h-3 w-3 ml-2" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription>
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {post.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm" className="group-hover:text-primary">
                            Read More
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <div key={category.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['productivity', 'security', 'development', 'design', 'tools', 'web development', 'api', 'json', 'passwords'].map(tag => (
                    <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>
                  Get the latest tips and tutorials delivered to your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button className="w-full">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About B-Tool Blog</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Our blog features expert insights, tutorials, and tips about online tools, 
                  productivity, security, and web development. Stay informed with the latest 
                  trends and best practices.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default BlogPage

