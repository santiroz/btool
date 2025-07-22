import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield,
  Eye,
  Lock,
  Database,
  Globe,
  UserCheck,
  AlertTriangle,
  Calendar,
  Mail,
  FileText
} from 'lucide-react'

const PrivacyPage = () => {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          text: "We do not collect, store, or process any personal information through our tools. All data processing happens locally in your browser."
        },
        {
          subtitle: "Usage Analytics",
          text: "We may collect anonymous usage statistics to improve our services, including page views, tool usage frequency, and general geographic location (country level only)."
        },
        {
          subtitle: "Technical Information",
          text: "We automatically collect certain technical information such as browser type, device type, and IP address for security and performance optimization purposes."
        }
      ]
    },
    {
      id: "data-processing",
      title: "How We Process Your Data",
      icon: Lock,
      content: [
        {
          subtitle: "Local Processing",
          text: "All tool operations are performed locally in your browser. Your data never leaves your device unless you explicitly choose to share or download results."
        },
        {
          subtitle: "No Server Storage",
          text: "We do not store any user-generated content, calculations, or processed data on our servers. Everything is processed client-side."
        },
        {
          subtitle: "Temporary Data",
          text: "Any temporary data created during tool usage is automatically cleared when you close your browser or navigate away from the page."
        }
      ]
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      icon: Eye,
      content: [
        {
          subtitle: "Essential Cookies",
          text: "We use only essential cookies required for website functionality, such as remembering your preferences and maintaining security."
        },
        {
          subtitle: "Analytics Cookies",
          text: "We may use analytics cookies to understand how our website is used and to improve user experience. These are anonymous and do not identify individual users."
        },
        {
          subtitle: "No Third-Party Tracking",
          text: "We do not use third-party tracking scripts or advertising cookies that could compromise your privacy."
        }
      ]
    },
    {
      id: "data-sharing",
      title: "Data Sharing and Disclosure",
      icon: UserCheck,
      content: [
        {
          subtitle: "No Data Sharing",
          text: "We do not sell, trade, or otherwise transfer your personal information to third parties. Your privacy is our priority."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information if required by law, court order, or government regulation, but only to the extent necessary."
        },
        {
          subtitle: "Service Providers",
          text: "We may share anonymous, aggregated data with trusted service providers who help us operate our website and improve our services."
        }
      ]
    },
    {
      id: "security",
      title: "Data Security",
      icon: Shield,
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmission between your browser and our servers is encrypted using industry-standard SSL/TLS protocols."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls and security measures to protect our systems from unauthorized access."
        },
        {
          subtitle: "Regular Updates",
          text: "We regularly update our security measures and conduct security audits to ensure the highest level of protection."
        }
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights and Choices",
      icon: UserCheck,
      content: [
        {
          subtitle: "Data Control",
          text: "Since we don't store your personal data, you maintain complete control over your information at all times."
        },
        {
          subtitle: "Opt-Out Options",
          text: "You can opt out of analytics tracking by using browser settings or privacy extensions. Our tools will continue to work normally."
        },
        {
          subtitle: "Data Portability",
          text: "All tool results can be downloaded or copied by you. We don't lock your data in our systems."
        }
      ]
    }
  ]

  const principles = [
    {
      icon: Shield,
      title: "Privacy by Design",
      description: "Privacy is built into every tool from the ground up, not added as an afterthought."
    },
    {
      icon: Lock,
      title: "Data Minimization",
      description: "We collect only the minimum data necessary to provide our services effectively."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "We are open about our data practices and provide clear information about how we handle your data."
    },
    {
      icon: UserCheck,
      title: "User Control",
      description: "You have complete control over your data and how our tools process it."
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
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <Badge variant="secondary">
                  <Calendar className="w-3 h-3 mr-1" />
                  Last Updated: January 2024
                </Badge>
                <Badge variant="outline">
                  <FileText className="w-3 h-3 mr-1" />
                  Version 2.0
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            At B-Tool, we are committed to protecting your privacy and ensuring the security of your data. 
            This privacy policy explains how we collect, use, and protect your information when you use our online tools.
          </p>
        </motion.div>

        {/* Privacy Principles */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Privacy Principles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide every decision we make about data handling and user privacy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="p-3 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{principle.title}</h3>
                      <p className="text-muted-foreground text-sm">{principle.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Key Highlights */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Shield className="h-6 w-6 mr-2" />
                Privacy Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-green-700">No Data Storage:</strong>
                    <p className="text-green-600">All processing happens in your browser. We don't store your data.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-green-700">No Registration:</strong>
                    <p className="text-green-600">Use all tools without creating accounts or providing personal information.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <strong className="text-green-700">No Tracking:</strong>
                    <p className="text-green-600">We don't use invasive tracking or advertising cookies.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Detailed Sections */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Icon className="h-6 w-6 mr-3 text-primary" />
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <h4 className="font-semibold mb-2 text-primary">{item.subtitle}</h4>
                            <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Third-Party Services */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-6 w-6 mr-3 text-primary" />
                Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Content Delivery Network (CDN)</h4>
                  <p className="text-muted-foreground text-sm">
                    We use a CDN to deliver our website content faster and more reliably. 
                    The CDN may collect basic technical information such as IP addresses for performance optimization.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Analytics Service</h4>
                  <p className="text-muted-foreground text-sm">
                    We use privacy-focused analytics to understand how our tools are used. 
                    This helps us improve our services while respecting your privacy.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security Services</h4>
                  <p className="text-muted-foreground text-sm">
                    We employ security services to protect against malicious attacks and ensure website availability. 
                    These services may process IP addresses and request patterns for security purposes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Children's Privacy */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700">
                <AlertTriangle className="h-6 w-6 mr-3" />
                Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="text-orange-700">
              <p className="mb-4">
                Our services are designed to be safe for users of all ages. We do not knowingly collect 
                personal information from children under 13 years of age. Since our tools process data 
                locally and don't require registration, children can use our tools safely under parental guidance.
              </p>
              <p>
                If you are a parent or guardian and believe your child has provided personal information 
                to us, please contact us immediately so we can address the situation.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Contact and Updates */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, 
                  please don't hesitate to contact us.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@b-tool.com</p>
                  <p><strong>Response Time:</strong> Within 48 hours</p>
                  <p><strong>Address:</strong> 123 Innovation Street, Tech District, TD 12345</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Policy Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time to reflect changes 
                  in our practices or for legal reasons.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Notification:</strong> We'll notify users of significant changes</p>
                  <p><strong>Effective Date:</strong> Changes take effect 30 days after posting</p>
                  <p><strong>Version History:</strong> Previous versions available upon request</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Footer Note */}
        <motion.div
          className="text-center text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <p>
            This Privacy Policy is part of our Terms of Service and constitutes a legally binding agreement. 
            By using B-Tool, you agree to the terms outlined in this policy.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPage

