import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  QrCode,
  Download,
  Copy,
  Check,
  Info,
  Zap,
  Star,
  RefreshCw,
  Smartphone,
  Globe,
  Mail,
  Phone,
  Wifi,
  MapPin
} from 'lucide-react'

const QRGeneratorTool = () => {
  const [qrData, setQrData] = useState('')
  const [qrType, setQrType] = useState('text')
  const [size, setSize] = useState('256')
  const [errorLevel, setErrorLevel] = useState('M')
  const [qrCode, setQrCode] = useState('')
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef(null)

  // Form data for different QR types
  const [formData, setFormData] = useState({
    url: '',
    text: '',
    email: { to: '', subject: '', body: '' },
    phone: '',
    sms: { number: '', message: '' },
    wifi: { ssid: '', password: '', security: 'WPA', hidden: false },
    vcard: { 
      firstName: '', lastName: '', organization: '', title: '', 
      phone: '', email: '', website: '', address: '' 
    },
    location: { latitude: '', longitude: '', query: '' }
  })

  const qrTypes = [
    { value: 'text', label: 'Plain Text', icon: QrCode },
    { value: 'url', label: 'Website URL', icon: Globe },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'phone', label: 'Phone Number', icon: Phone },
    { value: 'sms', label: 'SMS Message', icon: Smartphone },
    { value: 'wifi', label: 'WiFi Network', icon: Wifi },
    { value: 'vcard', label: 'Contact Card', icon: QrCode },
    { value: 'location', label: 'Location', icon: MapPin }
  ]

  const errorLevels = [
    { value: 'L', label: 'Low (~7%)', description: 'Good for clean environments' },
    { value: 'M', label: 'Medium (~15%)', description: 'Balanced option (recommended)' },
    { value: 'Q', label: 'Quartile (~25%)', description: 'Good for industrial use' },
    { value: 'H', label: 'High (~30%)', description: 'Best for damaged/dirty surfaces' }
  ]

  const sizes = [
    { value: '128', label: '128x128 px' },
    { value: '256', label: '256x256 px' },
    { value: '512', label: '512x512 px' },
    { value: '1024', label: '1024x1024 px' }
  ]

  const generateQRData = () => {
    let data = ''
    
    switch (qrType) {
      case 'text':
        data = formData.text
        break
      case 'url':
        data = formData.url.startsWith('http') ? formData.url : `https://${formData.url}`
        break
      case 'email':
        data = `mailto:${formData.email.to}?subject=${encodeURIComponent(formData.email.subject)}&body=${encodeURIComponent(formData.email.body)}`
        break
      case 'phone':
        data = `tel:${formData.phone}`
        break
      case 'sms':
        data = `sms:${formData.sms.number}?body=${encodeURIComponent(formData.sms.message)}`
        break
      case 'wifi':
        data = `WIFI:T:${formData.wifi.security};S:${formData.wifi.ssid};P:${formData.wifi.password};H:${formData.wifi.hidden ? 'true' : 'false'};;`
        break
      case 'vcard':
        data = `BEGIN:VCARD
VERSION:3.0
FN:${formData.vcard.firstName} ${formData.vcard.lastName}
ORG:${formData.vcard.organization}
TITLE:${formData.vcard.title}
TEL:${formData.vcard.phone}
EMAIL:${formData.vcard.email}
URL:${formData.vcard.website}
ADR:;;${formData.vcard.address};;;;
END:VCARD`
        break
      case 'location':
        if (formData.location.latitude && formData.location.longitude) {
          data = `geo:${formData.location.latitude},${formData.location.longitude}`
        } else if (formData.location.query) {
          data = `geo:0,0?q=${encodeURIComponent(formData.location.query)}`
        }
        break
      default:
        data = qrData
    }
    
    return data
  }

  const generateQR = async () => {
    const data = generateQRData()
    if (!data.trim()) return

    try {
      // Using QR Server API for QR code generation
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&ecc=${errorLevel}`
      setQrCode(qrUrl)
      setQrData(data)
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const downloadQR = () => {
    if (!qrCode) return
    
    const link = document.createElement('a')
    link.href = qrCode
    link.download = `qr-code-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyQRData = async () => {
    try {
      await navigator.clipboard.writeText(qrData)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const updateFormData = (type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: typeof prev[type] === 'object' 
        ? { ...prev[type], [field]: value }
        : value
    }))
  }

  const renderForm = () => {
    switch (qrType) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text Content</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => updateFormData('text', null, e.target.value)}
                placeholder="Enter any text to encode in QR code..."
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'url':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">Website URL</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => updateFormData('url', null, e.target.value)}
                placeholder="example.com or https://example.com"
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-to">Email Address</Label>
              <Input
                id="email-to"
                value={formData.email.to}
                onChange={(e) => updateFormData('email', 'to', e.target.value)}
                placeholder="recipient@example.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email-subject">Subject (Optional)</Label>
              <Input
                id="email-subject"
                value={formData.email.subject}
                onChange={(e) => updateFormData('email', 'subject', e.target.value)}
                placeholder="Email subject"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="email-body">Message (Optional)</Label>
              <Textarea
                id="email-body"
                value={formData.email.body}
                onChange={(e) => updateFormData('email', 'body', e.target.value)}
                placeholder="Email message"
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'phone':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', null, e.target.value)}
                placeholder="+1234567890"
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="sms-number">Phone Number</Label>
              <Input
                id="sms-number"
                value={formData.sms.number}
                onChange={(e) => updateFormData('sms', 'number', e.target.value)}
                placeholder="+1234567890"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="sms-message">Message</Label>
              <Textarea
                id="sms-message"
                value={formData.sms.message}
                onChange={(e) => updateFormData('sms', 'message', e.target.value)}
                placeholder="SMS message content"
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
              <Input
                id="wifi-ssid"
                value={formData.wifi.ssid}
                onChange={(e) => updateFormData('wifi', 'ssid', e.target.value)}
                placeholder="MyWiFiNetwork"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="wifi-password">Password</Label>
              <Input
                id="wifi-password"
                type="password"
                value={formData.wifi.password}
                onChange={(e) => updateFormData('wifi', 'password', e.target.value)}
                placeholder="WiFi password"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="wifi-security">Security Type</Label>
              <Select value={formData.wifi.security} onValueChange={(value) => updateFormData('wifi', 'security', value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="wifi-hidden"
                checked={formData.wifi.hidden}
                onChange={(e) => updateFormData('wifi', 'hidden', e.target.checked)}
              />
              <Label htmlFor="wifi-hidden">Hidden Network</Label>
            </div>
          </div>
        )

      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vcard-firstname">First Name</Label>
                <Input
                  id="vcard-firstname"
                  value={formData.vcard.firstName}
                  onChange={(e) => updateFormData('vcard', 'firstName', e.target.value)}
                  placeholder="John"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="vcard-lastname">Last Name</Label>
                <Input
                  id="vcard-lastname"
                  value={formData.vcard.lastName}
                  onChange={(e) => updateFormData('vcard', 'lastName', e.target.value)}
                  placeholder="Doe"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="vcard-org">Organization</Label>
              <Input
                id="vcard-org"
                value={formData.vcard.organization}
                onChange={(e) => updateFormData('vcard', 'organization', e.target.value)}
                placeholder="Company Name"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="vcard-title">Job Title</Label>
              <Input
                id="vcard-title"
                value={formData.vcard.title}
                onChange={(e) => updateFormData('vcard', 'title', e.target.value)}
                placeholder="Software Developer"
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="vcard-phone">Phone</Label>
                <Input
                  id="vcard-phone"
                  value={formData.vcard.phone}
                  onChange={(e) => updateFormData('vcard', 'phone', e.target.value)}
                  placeholder="+1234567890"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="vcard-email">Email</Label>
                <Input
                  id="vcard-email"
                  value={formData.vcard.email}
                  onChange={(e) => updateFormData('vcard', 'email', e.target.value)}
                  placeholder="john@example.com"
                  className="mt-2"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="vcard-website">Website</Label>
              <Input
                id="vcard-website"
                value={formData.vcard.website}
                onChange={(e) => updateFormData('vcard', 'website', e.target.value)}
                placeholder="https://example.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="vcard-address">Address</Label>
              <Input
                id="vcard-address"
                value={formData.vcard.address}
                onChange={(e) => updateFormData('vcard', 'address', e.target.value)}
                placeholder="123 Main St, City, State, ZIP"
                className="mt-2"
              />
            </div>
          </div>
        )

      case 'location':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location-lat">Latitude</Label>
                <Input
                  id="location-lat"
                  value={formData.location.latitude}
                  onChange={(e) => updateFormData('location', 'latitude', e.target.value)}
                  placeholder="40.7128"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="location-lng">Longitude</Label>
                <Input
                  id="location-lng"
                  value={formData.location.longitude}
                  onChange={(e) => updateFormData('location', 'longitude', e.target.value)}
                  placeholder="-74.0060"
                  className="mt-2"
                />
              </div>
            </div>
            <div className="text-center text-muted-foreground">
              <span>OR</span>
            </div>
            <div>
              <Label htmlFor="location-query">Search Query</Label>
              <Input
                id="location-query"
                value={formData.location.query}
                onChange={(e) => updateFormData('location', 'query', e.target.value)}
                placeholder="New York City, NY"
                className="mt-2"
              />
            </div>
          </div>
        )

      default:
        return null
    }
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
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">QR Code Generator</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate QR codes for text, URLs, WiFi, contact cards, and more. 
            Customize size and error correction for optimal scanning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* QR Generator */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Generate QR Code</CardTitle>
                <CardDescription>
                  Choose the type of content and fill in the details to generate your QR code.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-6">
                    {/* QR Type Selection */}
                    <div>
                      <Label>QR Code Type</Label>
                      <Select value={qrType} onValueChange={setQrType}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {qrTypes.map((type) => {
                            const Icon = type.icon
                            return (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center space-x-2">
                                  <Icon className="h-4 w-4" />
                                  <span>{type.label}</span>
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Dynamic Form */}
                    {renderForm()}

                    {/* Generate Button */}
                    <Button onClick={generateQR} className="w-full">
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR Code
                    </Button>
                  </TabsContent>

                  <TabsContent value="settings" className="space-y-6">
                    {/* Size Selection */}
                    <div>
                      <Label>QR Code Size</Label>
                      <Select value={size} onValueChange={setSize}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((sizeOption) => (
                            <SelectItem key={sizeOption.value} value={sizeOption.value}>
                              {sizeOption.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Error Correction Level */}
                    <div>
                      <Label>Error Correction Level</Label>
                      <Select value={errorLevel} onValueChange={setErrorLevel}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {errorLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              <div>
                                <div className="font-medium">{level.label}</div>
                                <div className="text-xs text-muted-foreground">{level.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Settings Info */}
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-2">Settings Guide</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Larger sizes provide better scanning from distance</li>
                        <li>• Higher error correction allows scanning damaged codes</li>
                        <li>• Medium error correction is recommended for most uses</li>
                        <li>• Use high error correction for outdoor/industrial use</li>
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* QR Code Display */}
                {qrCode && (
                  <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="p-4 bg-white rounded-lg border-2 border-border inline-block">
                      <img 
                        src={qrCode} 
                        alt="Generated QR Code" 
                        className="max-w-full h-auto"
                      />
                    </div>
                    
                    <div className="mt-4 flex justify-center space-x-2">
                      <Button onClick={downloadQR} variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button onClick={copyQRData} variant="outline">
                        {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                        {copied ? 'Copied!' : 'Copy Data'}
                      </Button>
                    </div>

                    {qrData && (
                      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                        <Label className="text-sm font-medium">Encoded Data:</Label>
                        <p className="text-sm text-muted-foreground mt-1 break-all">
                          {qrData}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
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
                  <span className="text-sm">Multiple QR code types</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Customizable size and quality</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Error correction levels</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Instant download</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">No data storage</span>
                </div>
              </CardContent>
            </Card>

            {/* QR Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Supported Types
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <strong>Text:</strong> Plain text content
                </div>
                <div>
                  <strong>URL:</strong> Website links
                </div>
                <div>
                  <strong>Email:</strong> Pre-filled email composition
                </div>
                <div>
                  <strong>Phone:</strong> Direct phone dialing
                </div>
                <div>
                  <strong>SMS:</strong> Pre-filled text messages
                </div>
                <div>
                  <strong>WiFi:</strong> Network connection details
                </div>
                <div>
                  <strong>vCard:</strong> Contact information
                </div>
                <div>
                  <strong>Location:</strong> GPS coordinates or addresses
                </div>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Test QR codes before printing or sharing</div>
                <div>• Use appropriate size for viewing distance</div>
                <div>• Ensure good contrast with background</div>
                <div>• Include instructions for users when needed</div>
                <div>• Consider error correction for outdoor use</div>
              </CardContent>
            </Card>

            {/* Use Cases */}
            <Card>
              <CardHeader>
                <CardTitle>Common Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Business cards and contact sharing</div>
                <div>• WiFi password sharing</div>
                <div>• Event tickets and check-ins</div>
                <div>• Product information and manuals</div>
                <div>• Social media and website promotion</div>
                <div>• Restaurant menus and ordering</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default QRGeneratorTool

