import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Github, 
  Twitter, 
  Mail, 
  Heart,
  Calculator,
  Palette,
  Code,
  Shield
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    'Tools': [
      { name: 'Calculator', href: '/tools/calculator' },
      { name: 'Color Picker', href: '/tools/color-picker' },
      { name: 'JSON Formatter', href: '/tools/json-formatter' },
      { name: 'Password Generator', href: '/tools/password-generator' },
      { name: 'QR Generator', href: '/tools/qr-generator' }
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ],
    'Resources': [
      { name: 'All Tools', href: '/tools' },
      { name: 'API Documentation', href: '/docs' },
      { name: 'Help Center', href: '/help' },
      { name: 'Status', href: '/status' }
    ]
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/b-tool' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/btool' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@b-tool.com' }
  ]

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                B-Tool
              </span>
            </motion.div>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              Your ultimate collection of free online tools. Boost your productivity with our 
              comprehensive suite of utilities designed for developers, designers, and professionals.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-muted-foreground mb-4 md:mb-0">
            <span>© {currentYear} B-Tool. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for productivity enthusiasts.</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

