import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator,
  ArrowLeftRight,
  Copy,
  Check,
  Info,
  Zap,
  Star,
  RefreshCw,
  Ruler,
  Weight,
  Thermometer,
  Clock,
  Zap as Lightning,
  Droplets
} from 'lucide-react'

const UnitConverterTool = () => {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')
  const [copied, setCopied] = useState(false)

  const conversions = {
    length: {
      name: 'Length',
      icon: Ruler,
      units: {
        mm: { name: 'Millimeter', factor: 0.001 },
        cm: { name: 'Centimeter', factor: 0.01 },
        m: { name: 'Meter', factor: 1 },
        km: { name: 'Kilometer', factor: 1000 },
        in: { name: 'Inch', factor: 0.0254 },
        ft: { name: 'Foot', factor: 0.3048 },
        yd: { name: 'Yard', factor: 0.9144 },
        mi: { name: 'Mile', factor: 1609.344 },
        nm: { name: 'Nautical Mile', factor: 1852 }
      }
    },
    weight: {
      name: 'Weight',
      icon: Weight,
      units: {
        mg: { name: 'Milligram', factor: 0.000001 },
        g: { name: 'Gram', factor: 0.001 },
        kg: { name: 'Kilogram', factor: 1 },
        oz: { name: 'Ounce', factor: 0.0283495 },
        lb: { name: 'Pound', factor: 0.453592 },
        st: { name: 'Stone', factor: 6.35029 },
        ton: { name: 'Metric Ton', factor: 1000 }
      }
    },
    temperature: {
      name: 'Temperature',
      icon: Thermometer,
      units: {
        c: { name: 'Celsius' },
        f: { name: 'Fahrenheit' },
        k: { name: 'Kelvin' },
        r: { name: 'Rankine' }
      }
    },
    area: {
      name: 'Area',
      icon: Calculator,
      units: {
        mm2: { name: 'Square Millimeter', factor: 0.000001 },
        cm2: { name: 'Square Centimeter', factor: 0.0001 },
        m2: { name: 'Square Meter', factor: 1 },
        km2: { name: 'Square Kilometer', factor: 1000000 },
        in2: { name: 'Square Inch', factor: 0.00064516 },
        ft2: { name: 'Square Foot', factor: 0.092903 },
        yd2: { name: 'Square Yard', factor: 0.836127 },
        ac: { name: 'Acre', factor: 4046.86 },
        ha: { name: 'Hectare', factor: 10000 }
      }
    },
    volume: {
      name: 'Volume',
      icon: Droplets,
      units: {
        ml: { name: 'Milliliter', factor: 0.001 },
        l: { name: 'Liter', factor: 1 },
        m3: { name: 'Cubic Meter', factor: 1000 },
        in3: { name: 'Cubic Inch', factor: 0.0163871 },
        ft3: { name: 'Cubic Foot', factor: 28.3168 },
        gal: { name: 'Gallon (US)', factor: 3.78541 },
        qt: { name: 'Quart (US)', factor: 0.946353 },
        pt: { name: 'Pint (US)', factor: 0.473176 },
        cup: { name: 'Cup (US)', factor: 0.236588 },
        floz: { name: 'Fluid Ounce (US)', factor: 0.0295735 }
      }
    },
    time: {
      name: 'Time',
      icon: Clock,
      units: {
        ms: { name: 'Millisecond', factor: 0.001 },
        s: { name: 'Second', factor: 1 },
        min: { name: 'Minute', factor: 60 },
        h: { name: 'Hour', factor: 3600 },
        d: { name: 'Day', factor: 86400 },
        wk: { name: 'Week', factor: 604800 },
        mo: { name: 'Month', factor: 2629746 },
        yr: { name: 'Year', factor: 31556952 }
      }
    },
    speed: {
      name: 'Speed',
      icon: Lightning,
      units: {
        mps: { name: 'Meters per Second', factor: 1 },
        kph: { name: 'Kilometers per Hour', factor: 0.277778 },
        mph: { name: 'Miles per Hour', factor: 0.44704 },
        fps: { name: 'Feet per Second', factor: 0.3048 },
        knot: { name: 'Knot', factor: 0.514444 }
      }
    },
    energy: {
      name: 'Energy',
      icon: Zap,
      units: {
        j: { name: 'Joule', factor: 1 },
        kj: { name: 'Kilojoule', factor: 1000 },
        cal: { name: 'Calorie', factor: 4.184 },
        kcal: { name: 'Kilocalorie', factor: 4184 },
        wh: { name: 'Watt Hour', factor: 3600 },
        kwh: { name: 'Kilowatt Hour', factor: 3600000 },
        btu: { name: 'BTU', factor: 1055.06 }
      }
    }
  }

  // Initialize default units when category changes
  useEffect(() => {
    const units = Object.keys(conversions[category].units)
    if (units.length >= 2) {
      setFromUnit(units[0])
      setToUnit(units[1])
    }
  }, [category])

  // Convert temperature
  const convertTemperature = (value, from, to) => {
    let celsius
    
    // Convert to Celsius first
    switch (from) {
      case 'c':
        celsius = value
        break
      case 'f':
        celsius = (value - 32) * 5/9
        break
      case 'k':
        celsius = value - 273.15
        break
      case 'r':
        celsius = (value - 491.67) * 5/9
        break
      default:
        return 0
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'c':
        return celsius
      case 'f':
        return celsius * 9/5 + 32
      case 'k':
        return celsius + 273.15
      case 'r':
        return celsius * 9/5 + 491.67
      default:
        return 0
    }
  }

  // Convert units
  const convertUnits = (value, from, to, categoryType) => {
    if (!value || !from || !to) return ''
    
    const numValue = parseFloat(value)
    if (isNaN(numValue)) return ''
    
    if (categoryType === 'temperature') {
      return convertTemperature(numValue, from, to).toFixed(6).replace(/\.?0+$/, '')
    }
    
    const units = conversions[categoryType].units
    const fromFactor = units[from]?.factor || 1
    const toFactor = units[to]?.factor || 1
    
    const result = (numValue * fromFactor) / toFactor
    return result.toFixed(6).replace(/\.?0+$/, '')
  }

  // Handle value changes
  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      const result = convertUnits(fromValue, fromUnit, toUnit, category)
      setToValue(result)
    } else {
      setToValue('')
    }
  }, [fromValue, fromUnit, toUnit, category])

  const swapUnits = () => {
    const tempUnit = fromUnit
    const tempValue = fromValue
    
    setFromUnit(toUnit)
    setToUnit(tempUnit)
    setFromValue(toValue)
    setToValue(tempValue)
  }

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(toValue)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const clearValues = () => {
    setFromValue('')
    setToValue('')
  }

  const commonConversions = [
    { category: 'length', from: 'ft', to: 'm', label: 'Feet to Meters' },
    { category: 'length', from: 'mi', to: 'km', label: 'Miles to Kilometers' },
    { category: 'weight', from: 'lb', to: 'kg', label: 'Pounds to Kilograms' },
    { category: 'temperature', from: 'f', to: 'c', label: 'Fahrenheit to Celsius' },
    { category: 'volume', from: 'gal', to: 'l', label: 'Gallons to Liters' },
    { category: 'speed', from: 'mph', to: 'kph', label: 'MPH to KPH' }
  ]

  const quickConvert = (conv) => {
    setCategory(conv.category)
    setFromUnit(conv.from)
    setToUnit(conv.to)
    setFromValue('1')
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
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Universal Unit Converter</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Convert between different units of measurement including length, weight, temperature, 
            area, volume, time, speed, and energy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Converter */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Unit Converter
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearValues}
                    className="flex items-center space-x-1"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Clear</span>
                  </Button>
                </CardTitle>
                <CardDescription>
                  Select a category and units to convert between different measurements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="converter" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="converter">Converter</TabsTrigger>
                    <TabsTrigger value="quick">Quick Convert</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="converter" className="space-y-6">
                    {/* Category Selection */}
                    <div>
                      <Label>Conversion Category</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(conversions).map(([key, conv]) => {
                            const Icon = conv.icon
                            return (
                              <SelectItem key={key} value={key}>
                                <div className="flex items-center space-x-2">
                                  <Icon className="h-4 w-4" />
                                  <span>{conv.name}</span>
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* From Unit */}
                    <div className="space-y-4">
                      <div>
                        <Label>From</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <Input
                            type="number"
                            value={fromValue}
                            onChange={(e) => setFromValue(e.target.value)}
                            placeholder="Enter value"
                            className="col-span-2"
                          />
                          <Select value={fromUnit} onValueChange={setFromUnit}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(conversions[category].units).map(([key, unit]) => (
                                <SelectItem key={key} value={key}>
                                  {unit.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Swap Button */}
                      <div className="flex justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={swapUnits}
                          className="flex items-center space-x-1"
                        >
                          <ArrowLeftRight className="h-4 w-4" />
                          <span>Swap</span>
                        </Button>
                      </div>

                      {/* To Unit */}
                      <div>
                        <Label>To</Label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <Input
                            type="number"
                            value={toValue}
                            readOnly
                            placeholder="Result"
                            className="col-span-2 bg-muted/30"
                          />
                          <Select value={toUnit} onValueChange={setToUnit}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(conversions[category].units).map(([key, unit]) => (
                                <SelectItem key={key} value={key}>
                                  {unit.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Result Display */}
                    {toValue && (
                      <motion.div
                        className="p-4 bg-primary/5 border border-primary/20 rounded-lg"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground">Result</div>
                            <div className="text-lg font-bold">
                              {fromValue} {conversions[category].units[fromUnit]?.name} = {toValue} {conversions[category].units[toUnit]?.name}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyResult}
                            className="flex items-center space-x-1"
                          >
                            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </TabsContent>

                  <TabsContent value="quick" className="space-y-4">
                    <div>
                      <Label>Common Conversions</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click on any conversion to quickly set it up with a value of 1.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {commonConversions.map((conv, index) => {
                        const Icon = conversions[conv.category].icon
                        return (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card 
                              className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50"
                              onClick={() => quickConvert(conv)}
                            >
                              <CardContent className="pt-4">
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <Icon className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-sm">{conv.label}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {conversions[conv.category].name}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )
                      })}
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
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(conversions).map(([key, conv]) => {
                  const Icon = conv.icon
                  return (
                    <div 
                      key={key}
                      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        category === key ? 'bg-primary/10 text-primary' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setCategory(key)}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{conv.name}</span>
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {Object.keys(conv.units).length}
                      </Badge>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">8 conversion categories</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">60+ units supported</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Instant conversion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Bidirectional conversion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">High precision results</span>
                </div>
              </CardContent>
            </Card>

            {/* Current Category Units */}
            {category && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {React.createElement(conversions[category].icon, { className: "h-5 w-5 mr-2" })}
                    {conversions[category].name} Units
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {Object.entries(conversions[category].units).map(([key, unit]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span>{unit.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {key}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Use the swap button to quickly reverse conversion</div>
                <div>• Results are automatically calculated as you type</div>
                <div>• Copy results to clipboard with one click</div>
                <div>• Try quick conversions for common use cases</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default UnitConverterTool

