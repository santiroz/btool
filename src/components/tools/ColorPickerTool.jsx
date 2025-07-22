import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { 
  Palette,
  Copy,
  Check,
  Info,
  Zap,
  Star,
  RefreshCw,
  Download,
  Eye
} from 'lucide-react'

const ColorPickerTool = () => {
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [copied, setCopied] = useState('')
  const [colorFormat, setColorFormat] = useState('hex')
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 })
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 })
  const [palette, setPalette] = useState([])

  // Convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  // Convert RGB to hex
  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  // Convert HSL to RGB
  const hslToRgb = (h, s, l) => {
    h /= 360
    s /= 100
    l /= 100
    const a = s * Math.min(l, 1 - l)
    const f = n => {
      const k = (n + h * 12) % 12
      return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    }
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255)
    }
  }

  // Update color when selectedColor changes
  useEffect(() => {
    const rgbColor = hexToRgb(selectedColor)
    if (rgbColor) {
      setRgb(rgbColor)
      setHsl(rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b))
    }
  }, [selectedColor])

  // Generate color palette
  const generatePalette = () => {
    const baseHsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
    const colors = []
    
    // Monochromatic palette
    for (let i = 0; i < 5; i++) {
      const lightness = 20 + (i * 20)
      const color = hslToRgb(baseHsl.h, baseHsl.s, lightness)
      colors.push(rgbToHex(color.r, color.g, color.b))
    }
    
    // Complementary colors
    const complementaryHue = (baseHsl.h + 180) % 360
    for (let i = 0; i < 3; i++) {
      const lightness = 30 + (i * 20)
      const color = hslToRgb(complementaryHue, baseHsl.s, lightness)
      colors.push(rgbToHex(color.r, color.g, color.b))
    }
    
    setPalette(colors)
  }

  useEffect(() => {
    generatePalette()
  }, [rgb])

  const getColorValue = () => {
    switch (colorFormat) {
      case 'hex':
        return selectedColor.toUpperCase()
      case 'rgb':
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
      case 'hsl':
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
      case 'rgba':
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`
      default:
        return selectedColor
    }
  }

  const copyColor = async (color, format = colorFormat) => {
    let colorValue = color
    
    if (format !== 'hex' && color.startsWith('#')) {
      const rgbColor = hexToRgb(color)
      const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b)
      
      switch (format) {
        case 'rgb':
          colorValue = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`
          break
        case 'hsl':
          colorValue = `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`
          break
        case 'rgba':
          colorValue = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 1)`
          break
      }
    }
    
    try {
      await navigator.clipboard.writeText(colorValue)
      setCopied(color)
      setTimeout(() => setCopied(''), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const updateColorFromRgb = (component, value) => {
    const newRgb = { ...rgb, [component]: value }
    setRgb(newRgb)
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setSelectedColor(hex)
  }

  const updateColorFromHsl = (component, value) => {
    const newHsl = { ...hsl, [component]: value }
    setHsl(newHsl)
    const rgbColor = hslToRgb(newHsl.h, newHsl.s, newHsl.l)
    setRgb(rgbColor)
    const hex = rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b)
    setSelectedColor(hex)
  }

  const randomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    setSelectedColor(randomHex)
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
              <Palette className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Color Picker & Palette Generator</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pick colors, generate palettes, and convert between different color formats. 
            Perfect for designers, developers, and creative professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Color Picker */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Color Picker
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={randomColor}
                    className="flex items-center space-x-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Random</span>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="picker" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="picker">Color Picker</TabsTrigger>
                    <TabsTrigger value="sliders">RGB/HSL</TabsTrigger>
                    <TabsTrigger value="palette">Palette</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="picker" className="space-y-6">
                    {/* Color Display */}
                    <div className="space-y-4">
                      <div 
                        className="w-full h-32 rounded-lg border-2 border-border shadow-inner"
                        style={{ backgroundColor: selectedColor }}
                      ></div>
                      
                      {/* Color Input */}
                      <div className="flex space-x-2">
                        <Input
                          type="color"
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="w-16 h-12 p-1 border-2"
                        />
                        <Input
                          type="text"
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                          className="flex-1"
                          placeholder="#000000"
                        />
                      </div>
                    </div>

                    {/* Color Formats */}
                    <div className="space-y-4">
                      <Label>Color Formats</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {['hex', 'rgb', 'hsl', 'rgba'].map((format) => (
                          <div key={format} className="flex items-center space-x-2">
                            <Label className="w-12 text-xs uppercase font-mono">
                              {format}:
                            </Label>
                            <Input
                              value={format === 'hex' ? selectedColor.toUpperCase() :
                                     format === 'rgb' ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` :
                                     format === 'hsl' ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` :
                                     `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`}
                              readOnly
                              className="flex-1 font-mono text-sm"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyColor(selectedColor, format)}
                              className="flex items-center space-x-1"
                            >
                              {copied === selectedColor ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="sliders" className="space-y-6">
                    {/* RGB Sliders */}
                    <div className="space-y-4">
                      <Label>RGB Values</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <Label className="w-8 text-red-500">R:</Label>
                          <Slider
                            value={[rgb.r]}
                            onValueChange={(value) => updateColorFromRgb('r', value[0])}
                            max={255}
                            step={1}
                            className="flex-1"
                          />
                          <span className="w-12 text-sm font-mono">{rgb.r}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Label className="w-8 text-green-500">G:</Label>
                          <Slider
                            value={[rgb.g]}
                            onValueChange={(value) => updateColorFromRgb('g', value[0])}
                            max={255}
                            step={1}
                            className="flex-1"
                          />
                          <span className="w-12 text-sm font-mono">{rgb.g}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Label className="w-8 text-blue-500">B:</Label>
                          <Slider
                            value={[rgb.b]}
                            onValueChange={(value) => updateColorFromRgb('b', value[0])}
                            max={255}
                            step={1}
                            className="flex-1"
                          />
                          <span className="w-12 text-sm font-mono">{rgb.b}</span>
                        </div>
                      </div>
                    </div>

                    {/* HSL Sliders */}
                    <div className="space-y-4">
                      <Label>HSL Values</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <Label className="w-8">H:</Label>
                          <Slider
                            value={[hsl.h]}
                            onValueChange={(value) => updateColorFromHsl('h', value[0])}
                            max={360}
                            step={1}
                            className="flex-1"
                          />
                          <span className="w-12 text-sm font-mono">{hsl.h}°</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Label className="w-8">S:</Label>
                          <Slider
                            value={[hsl.s]}
                            onValueChange={(value) => updateColorFromHsl('s', value[0])}
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                          <span className="w-12 text-sm font-mono">{hsl.s}%</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Label className="w-8">L:</Label>
                          <Slider
                            value={[hsl.l]}
                            onValueChange={(value) => updateColorFromHsl('l', value[0])}
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                          <span className="w-12 text-sm font-mono">{hsl.l}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Color Preview */}
                    <div 
                      className="w-full h-20 rounded-lg border-2 border-border"
                      style={{ backgroundColor: selectedColor }}
                    ></div>
                  </TabsContent>

                  <TabsContent value="palette" className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Label>Generated Palette</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generatePalette}
                        className="flex items-center space-x-1"
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>Regenerate</span>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {palette.map((color, index) => (
                        <motion.div
                          key={index}
                          className="group cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setSelectedColor(color)}
                        >
                          <div 
                            className="w-full h-20 rounded-lg border-2 border-border group-hover:border-primary transition-colors"
                            style={{ backgroundColor: color }}
                          ></div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs font-mono">{color.toUpperCase()}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                copyColor(color)
                              }}
                              className="h-6 w-6 p-0"
                            >
                              {copied === color ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
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
                  <span className="text-sm">Visual color picker</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">RGB/HSL sliders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Multiple color formats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Automatic palette generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Copy to clipboard</span>
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
                  <strong>Color Picker:</strong> Click the color input or enter a hex value to select colors.
                </div>
                <div>
                  <strong>RGB/HSL:</strong> Use sliders for precise color adjustment and real-time preview.
                </div>
                <div>
                  <strong>Palette:</strong> Generate harmonious color schemes based on your selected color.
                </div>
                <div>
                  <strong>Copy Colors:</strong> Click copy buttons to save color values in different formats.
                </div>
              </CardContent>
            </Card>

            {/* Color Theory */}
            <Card>
              <CardHeader>
                <CardTitle>Color Formats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div><strong>HEX:</strong> Web standard format (#RRGGBB)</div>
                <div><strong>RGB:</strong> Red, Green, Blue values (0-255)</div>
                <div><strong>HSL:</strong> Hue, Saturation, Lightness</div>
                <div><strong>RGBA:</strong> RGB with alpha transparency</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ColorPickerTool

