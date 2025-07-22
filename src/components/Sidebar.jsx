import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  X,
  Calculator,
  Palette,
  Type,
  Code,
  TrendingUp,
  Shield,
  Clock,
  Image,
  FileText,
  Hash,
  Search,
  Key,
  Zap,
  Home,
  BookOpen,
  Settings,
  Globe
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const toolCategories = [
    {
      name: 'Productivity Tools',
      icon: Calculator,
      items: [
        { name: 'Calculator', href: '/tools/calculator', icon: Calculator },
        { name: 'Unit Converter', href: '/tools/unit-converter', icon: Settings },
        { name: 'Word Counter', href: '/tools/word-counter', icon: Type }
      ]
    },
    {
      name: 'Design Tools',
      icon: Palette,
      items: [
        { name: 'Color Picker', href: '/tools/color-picker', icon: Palette },
        { name: 'QR Code Generator', href: '/tools/qr-generator', icon: Image }
      ]
    },
    {
      name: 'Developer Tools',
      icon: Code,
      items: [
        { name: 'JSON Formatter', href: '/tools/json-formatter', icon: Code },
        { name: 'Base64 Encoder', href: '/tools/base64', icon: Hash },
        { name: 'URL Encoder', href: '/tools/url-encoder', icon: Globe },
        { name: 'Hash Generator', href: '/tools/hash-generator', icon: Hash }
      ]
    },
    {
      name: 'Security Tools',
      icon: Shield,
      items: [
        { name: 'Password Generator', href: '/tools/password-generator', icon: Key }
      ]
    }
  ]

  const mainNavigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'All Tools', href: '/tools', icon: Zap },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'About', href: '/about', icon: Shield }
  ]

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    }
  }

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed left-0 top-0 z-50 h-full w-80 bg-background border-r shadow-lg lg:relative lg:translate-x-0"
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">B-Tool</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-80px)]">
              <div className="p-4 space-y-6">
                {/* Main Navigation */}
                <div>
                  <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Navigation
                  </h3>
                  <div className="space-y-1">
                    {mainNavigation.map((item) => {
                      const Icon = item.icon
                      const isActive = location.pathname === item.href
                      
                      return (
                        <Link key={item.name} to={item.href} onClick={onClose}>
                          <Button
                            variant={isActive ? "secondary" : "ghost"}
                            className="w-full justify-start"
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Tool Categories */}
                {toolCategories.map((category) => {
                  const CategoryIcon = category.icon
                  
                  return (
                    <div key={category.name}>
                      <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center">
                        <CategoryIcon className="mr-2 h-4 w-4" />
                        {category.name}
                      </h3>
                      <div className="space-y-1">
                        {category.items.map((tool) => {
                          const ToolIcon = tool.icon
                          const isActive = location.pathname === tool.href
                          
                          return (
                            <Link key={tool.name} to={tool.href} onClick={onClose}>
                              <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className="w-full justify-start text-sm"
                                size="sm"
                              >
                                <ToolIcon className="mr-2 h-3 w-3" />
                                {tool.name}
                              </Button>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default Sidebar

