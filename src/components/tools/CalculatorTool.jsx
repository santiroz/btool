import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calculator,
  Delete,
  RotateCcw,
  Copy,
  Check,
  Info,
  Zap,
  Star
} from 'lucide-react'

const CalculatorTool = () => {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [copied, setCopied] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const copyResult = async () => {
    try {
      await navigator.clipboard.writeText(display)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const scientificOperations = {
    sin: (x) => Math.sin(x * Math.PI / 180),
    cos: (x) => Math.cos(x * Math.PI / 180),
    tan: (x) => Math.tan(x * Math.PI / 180),
    log: (x) => Math.log10(x),
    ln: (x) => Math.log(x),
    sqrt: (x) => Math.sqrt(x),
    square: (x) => x * x,
    factorial: (x) => {
      if (x < 0) return NaN
      if (x === 0 || x === 1) return 1
      let result = 1
      for (let i = 2; i <= x; i++) {
        result *= i
      }
      return result
    }
  }

  const performScientificOperation = (func) => {
    const inputValue = parseFloat(display)
    const result = scientificOperations[func](inputValue)
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ]

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'log'],
    ['ln', '√', 'x²', 'x!'],
    ['π', 'e', '(', ')']
  ]

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
              <h1 className="text-3xl font-bold">Advanced Calculator</h1>
              <Badge variant="secondary" className="mt-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular Tool
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful calculator with basic arithmetic, scientific functions, and advanced operations. 
            Perfect for students, engineers, and professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Calculator
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyResult}
                      className="flex items-center space-x-1"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clear}
                      className="flex items-center space-x-1"
                    >
                      <RotateCcw className="h-4 w-4" />
                      <span>Clear</span>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic</TabsTrigger>
                    <TabsTrigger value="scientific">Scientific</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    {/* Display */}
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-right text-3xl font-mono font-bold min-h-[3rem] flex items-center justify-end">
                        {display}
                      </div>
                    </div>

                    {/* Basic Buttons */}
                    <div className="grid grid-cols-4 gap-2">
                      {buttons.flat().map((btn, index) => {
                        const isOperator = ['÷', '×', '-', '+', '='].includes(btn)
                        const isSpecial = ['C', '±', '%'].includes(btn)
                        const isZero = btn === '0'
                        
                        return (
                          <Button
                            key={index}
                            variant={isOperator ? "default" : isSpecial ? "secondary" : "outline"}
                            className={`h-12 text-lg font-semibold ${isZero ? 'col-span-2' : ''}`}
                            onClick={() => {
                              if (btn >= '0' && btn <= '9') {
                                inputNumber(btn)
                              } else if (btn === '.') {
                                inputDecimal()
                              } else if (btn === 'C') {
                                clear()
                              } else if (btn === '=') {
                                handleEquals()
                              } else if (btn === '±') {
                                setDisplay(String(-parseFloat(display)))
                              } else if (btn === '%') {
                                setDisplay(String(parseFloat(display) / 100))
                              } else {
                                performOperation(btn)
                              }
                            }}
                          >
                            {btn}
                          </Button>
                        )
                      })}
                    </div>
                  </TabsContent>

                  <TabsContent value="scientific" className="space-y-4">
                    {/* Display */}
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-right text-3xl font-mono font-bold min-h-[3rem] flex items-center justify-end">
                        {display}
                      </div>
                    </div>

                    {/* Scientific Buttons */}
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {scientificButtons.flat().map((btn, index) => (
                        <Button
                          key={index}
                          variant="secondary"
                          className="h-10 text-sm"
                          onClick={() => {
                            if (btn === 'π') {
                              setDisplay(String(Math.PI))
                              setWaitingForOperand(true)
                            } else if (btn === 'e') {
                              setDisplay(String(Math.E))
                              setWaitingForOperand(true)
                            } else if (['sin', 'cos', 'tan', 'log', 'ln'].includes(btn)) {
                              performScientificOperation(btn)
                            } else if (btn === '√') {
                              performScientificOperation('sqrt')
                            } else if (btn === 'x²') {
                              performScientificOperation('square')
                            } else if (btn === 'x!') {
                              performScientificOperation('factorial')
                            }
                          }}
                        >
                          {btn}
                        </Button>
                      ))}
                    </div>

                    {/* Basic Buttons for Scientific Mode */}
                    <div className="grid grid-cols-4 gap-2">
                      {buttons.flat().map((btn, index) => {
                        const isOperator = ['÷', '×', '-', '+', '='].includes(btn)
                        const isSpecial = ['C', '±', '%'].includes(btn)
                        const isZero = btn === '0'
                        
                        return (
                          <Button
                            key={index}
                            variant={isOperator ? "default" : isSpecial ? "secondary" : "outline"}
                            className={`h-10 text-sm ${isZero ? 'col-span-2' : ''}`}
                            onClick={() => {
                              if (btn >= '0' && btn <= '9') {
                                inputNumber(btn)
                              } else if (btn === '.') {
                                inputDecimal()
                              } else if (btn === 'C') {
                                clear()
                              } else if (btn === '=') {
                                handleEquals()
                              } else if (btn === '±') {
                                setDisplay(String(-parseFloat(display)))
                              } else if (btn === '%') {
                                setDisplay(String(parseFloat(display) / 100))
                              } else {
                                performOperation(btn)
                              }
                            }}
                          >
                            {btn}
                          </Button>
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
                  <span className="text-sm">Basic arithmetic operations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Scientific functions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Trigonometric operations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Logarithmic functions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Copy results to clipboard</span>
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
                  <strong>Basic Mode:</strong> Use for everyday calculations with standard arithmetic operations.
                </div>
                <div>
                  <strong>Scientific Mode:</strong> Access advanced functions like trigonometry, logarithms, and more.
                </div>
                <div>
                  <strong>Keyboard Support:</strong> Use your keyboard for faster input. Numbers, operators, and Enter key are supported.
                </div>
                <div>
                  <strong>Copy Results:</strong> Click the copy button to save results to your clipboard.
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>• Use scientific mode for complex calculations</div>
                <div>• Trigonometric functions work in degrees</div>
                <div>• Press C to clear all calculations</div>
                <div>• Results are automatically formatted</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorTool

