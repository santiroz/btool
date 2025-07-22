import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield,
  Zap,
  Users,
  Globe,
  Heart,
  Target,
  Award,
  TrendingUp,
  Code,
  Palette,
  Calculator,
  Lock,
  Mail,
  Github,
  Twitter
} from 'lucide-react'

const AboutPage = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "All tools are optimized for speed and performance, providing instant results."
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays in your browser. We don't store or transmit any personal information."
    },
    {
      icon: Globe,
      title: "Works Everywhere",
      description: "Responsive design that works perfectly on desktop, tablet, and mobile devices."
    },
    {
      icon: Heart,
      title: "Always Free",
      description: "No hidden fees, no subscriptions, no registration required. Completely free forever."
    }
  ]

  const stats = [
    { label: "Tools Available", value: "50+", icon: Calculator },
    { label: "Happy Users", value: "10K+", icon: Users },
    { label: "Countries Served", value: "150+", icon: Globe },
    { label: "Uptime", value: "99.9%", icon: TrendingUp }
  ]

  const toolCategories = [
    {
      name: "Productivity Tools",
      description: "Calculators, converters, and time-saving utilities",
      icon: Calculator,
      count: 12,
      color: "bg-blue-500"
    },
    {
      name: "Design Tools",
      description: "Color tools, image utilities, and creative resources",
      icon: Palette,
      count: 8,
      color: "bg-purple-500"
    },
    {
      name: "Developer Tools",
      description: "Code formatters, validators, and development utilities",
      icon: Code,
      count: 15,
      color: "bg-green-500"
    },
    {
      name: "Security Tools",
      description: "Password generators, hash tools, and privacy utilities",
      icon: Lock,
      count: 6,
      color: "bg-red-500"
    }
  ]

  const team = [
    {
      name: "Development Team",
      role: "Full-Stack Developers",
      description: "Passionate developers creating innovative tools for productivity and efficiency.",
      icon: Code
    },
    {
      name: "Design Team",
      role: "UI/UX Designers",
      description: "Creative minds focused on delivering beautiful and intuitive user experiences.",
      icon: Palette
    },
    {
      name: "Security Team",
      role: "Security Experts",
      description: "Dedicated professionals ensuring your data privacy and security.",
      icon: Shield
    }
  ]

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
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">About B-Tool</h1>
              <p className="text-muted-foreground mt-2">
                Your ultimate collection of free online tools
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Our Mission</CardTitle>
              <CardDescription className="text-lg max-w-3xl mx-auto">
                We believe that powerful tools should be accessible to everyone. Our mission is to provide 
                a comprehensive collection of free, high-quality online tools that boost productivity, 
                enhance creativity, and simplify complex tasks for users worldwide.
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.section>

        {/* Stats */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="p-3 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-muted-foreground text-sm">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose B-Tool?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best online tools experience with these core principles in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="pt-6 text-center">
                      <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Tool Categories */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Tool Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our organized collection of tools across different categories to find exactly what you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 ${category.color} rounded-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="group-hover:text-primary transition-colors">
                            {category.name}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {category.count} tools
                          </Badge>
                        </div>
                      </div>
                      <CardDescription className="mt-2">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate professionals behind B-Tool who work tirelessly to bring you the best online tools experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => {
              const Icon = member.icon
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="p-4 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary text-sm mb-3">{member.role}</p>
                      <p className="text-muted-foreground text-sm">{member.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-muted/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">User-Centric</h3>
                  <p className="text-muted-foreground text-sm">
                    Every tool is designed with the user experience in mind, ensuring simplicity and effectiveness.
                  </p>
                </div>
                <div>
                  <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Quality First</h3>
                  <p className="text-muted-foreground text-sm">
                    We maintain high standards for all our tools, ensuring reliability and accuracy.
                  </p>
                </div>
                <div>
                  <div className="p-3 bg-primary/10 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Community Driven</h3>
                  <p className="text-muted-foreground text-sm">
                    We listen to our users and continuously improve based on feedback and suggestions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="mb-6 opacity-90">
                Have questions, suggestions, or feedback? We'd love to hear from you!
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Twitter className="mr-2 h-4 w-4" />
                  Twitter
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}

export default AboutPage

