import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText,
  Scale,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Mail,
  Globe,
  Users,
  Lock,
  Gavel
} from 'lucide-react'

const TermsPage = () => {
  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        {
          text: "By accessing and using B-Tool's website and services, you accept and agree to be bound by the terms and provision of this agreement."
        },
        {
          text: "If you do not agree to abide by the above, please do not use this service."
        },
        {
          text: "These terms apply to all visitors, users, and others who access or use the service."
        }
      ]
    },
    {
      id: "description",
      title: "Description of Service",
      icon: Globe,
      content: [
        {
          text: "B-Tool provides a collection of free online tools including calculators, converters, formatters, generators, and other utilities."
        },
        {
          text: "All tools are provided as-is and are designed to process data locally in your browser for privacy and security."
        },
        {
          text: "We reserve the right to modify, suspend, or discontinue any part of our service at any time without notice."
        }
      ]
    },
    {
      id: "user-conduct",
      title: "User Conduct and Responsibilities",
      icon: Users,
      content: [
        {
          text: "You agree to use our services only for lawful purposes and in accordance with these Terms of Service."
        },
        {
          text: "You are prohibited from using our services to transmit, distribute, or store material that is unlawful, harmful, threatening, abusive, or otherwise objectionable."
        },
        {
          text: "You may not attempt to gain unauthorized access to our systems, other users' accounts, or computer systems connected to our service."
        },
        {
          text: "You are responsible for maintaining the confidentiality of any data you process using our tools."
        }
      ]
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property Rights",
      icon: Lock,
      content: [
        {
          text: "The service and its original content, features, and functionality are and will remain the exclusive property of B-Tool and its licensors."
        },
        {
          text: "The service is protected by copyright, trademark, and other laws. You may not reproduce, distribute, or create derivative works without our express written permission."
        },
        {
          text: "You retain all rights to any content you create or process using our tools. We do not claim ownership of your data or results."
        }
      ]
    },
    {
      id: "privacy",
      title: "Privacy and Data Protection",
      icon: Shield,
      content: [
        {
          text: "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service."
        },
        {
          text: "We process data locally in your browser and do not store personal information on our servers."
        },
        {
          text: "You are responsible for ensuring that any data you process complies with applicable privacy laws and regulations."
        }
      ]
    },
    {
      id: "disclaimers",
      title: "Disclaimers and Limitations",
      icon: AlertTriangle,
      content: [
        {
          text: "Our tools are provided 'as is' without any warranties, express or implied. We do not guarantee accuracy, completeness, or reliability of results."
        },
        {
          text: "You use our services at your own risk. We are not liable for any damages arising from your use of our tools."
        },
        {
          text: "We do not warrant that our service will be uninterrupted, secure, or error-free."
        },
        {
          text: "Results from our tools should be verified independently for critical applications."
        }
      ]
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: Scale,
      content: [
        {
          text: "In no event shall B-Tool, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages."
        },
        {
          text: "Our total liability to you for all damages shall not exceed the amount you paid for using our services (which is zero for free services)."
        },
        {
          text: "Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so these limitations may not apply to you."
        }
      ]
    },
    {
      id: "termination",
      title: "Termination",
      icon: XCircle,
      content: [
        {
          text: "We may terminate or suspend your access immediately, without prior notice, for any reason whatsoever, including breach of these Terms."
        },
        {
          text: "Upon termination, your right to use the service will cease immediately."
        },
        {
          text: "You may discontinue use of our services at any time without notice."
        }
      ]
    },
    {
      id: "changes",
      title: "Changes to Terms",
      icon: Calendar,
      content: [
        {
          text: "We reserve the right to modify or replace these Terms at any time at our sole discretion."
        },
        {
          text: "If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect."
        },
        {
          text: "Your continued use of the service after any changes constitutes acceptance of the new Terms."
        }
      ]
    }
  ]

  const keyPoints = [
    {
      icon: CheckCircle,
      title: "Free to Use",
      description: "All tools are completely free with no hidden fees or subscriptions"
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Data processing happens locally in your browser for maximum privacy"
    },
    {
      icon: Globe,
      title: "No Registration",
      description: "Use all tools without creating accounts or providing personal information"
    },
    {
      icon: Lock,
      title: "Your Data Rights",
      description: "You retain full ownership and control of any data you process"
    }
  ]

  const prohibited = [
    "Using tools for illegal activities or purposes",
    "Attempting to hack, disrupt, or damage our systems",
    "Violating intellectual property rights",
    "Transmitting malicious code or harmful content",
    "Impersonating others or providing false information",
    "Commercial use without proper licensing (where applicable)"
  ]

  const allowed = [
    "Personal and educational use of all tools",
    "Commercial use for business purposes",
    "Sharing results and outputs from tools",
    "Accessing tools from any device or location",
    "Using tools without registration or payment",
    "Processing sensitive data (stays in your browser)"
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Terms of Service</h1>
              <div className="flex items-center justify-center mt-2 space-x-2">
                <Badge variant="secondary">
                  <Calendar className="w-3 h-3 mr-1" />
                  Last Updated: January 2024
                </Badge>
                <Badge variant="outline">
                  <Gavel className="w-3 h-3 mr-1" />
                  Version 2.0
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            These Terms of Service govern your use of B-Tool's website and services. 
            Please read these terms carefully before using our online tools.
          </p>
        </motion.div>

        {/* Key Points */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Key Points</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Here are the most important things you should know about using B-Tool.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyPoints.map((point, index) => {
              const Icon = point.icon
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="p-3 bg-primary/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{point.title}</h3>
                      <p className="text-muted-foreground text-sm">{point.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* What's Allowed vs Prohibited */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  What's Allowed
                </CardTitle>
                <CardDescription className="text-green-600">
                  You are free to use our services for these purposes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {allowed.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-green-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <XCircle className="h-6 w-6 mr-2" />
                  What's Prohibited
                </CardTitle>
                <CardDescription className="text-red-600">
                  These activities are not allowed and may result in termination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prohibited.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-red-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Detailed Terms */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Detailed Terms</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete terms and conditions governing your use of B-Tool services.
            </p>
          </div>

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
                      <div className="space-y-4">
                        {section.content.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-muted-foreground leading-relaxed">
                            {item.text}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Governing Law */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gavel className="h-6 w-6 mr-3 text-primary" />
                Governing Law and Jurisdiction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  These Terms shall be interpreted and governed by the laws of the United States, 
                  without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising from these Terms or your use of our services shall be 
                  resolved through binding arbitration in accordance with the rules of the 
                  American Arbitration Association.
                </p>
                <p>
                  If any provision of these Terms is held to be invalid or unenforceable, 
                  the remaining provisions will remain in full force and effect.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Contact Information */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-6 w-6 mr-3 text-primary" />
                Questions About These Terms?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Email:</strong> legal@b-tool.com<br />
                  <strong>Response Time:</strong> Within 48 hours<br />
                  <strong>Business Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
                </div>
                <div>
                  <strong>Mailing Address:</strong><br />
                  B-Tool Legal Department<br />
                  123 Innovation Street<br />
                  Tech District, TD 12345<br />
                  United States
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Acknowledgment */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-blue-600/5 border-primary/20">
            <CardContent className="pt-6 pb-6">
              <h3 className="text-lg font-semibold mb-4">Acknowledgment</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                By using B-Tool, you acknowledge that you have read these Terms of Service, 
                understand them, and agree to be bound by them. If you do not agree to these terms, 
                please do not use our services.
              </p>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}

export default TermsPage

