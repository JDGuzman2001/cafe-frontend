import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Coffee, CupSoda, Timer, CheckCircle, Loader2 } from "lucide-react"
import { useSetVariable } from "./hooks/useCoffeeAPI"

// Crear el cliente de Query
const queryClient = new QueryClient()

function AppContent() {
  const [selectedCoffee, setSelectedCoffee] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  // Usar el hook de mutación en lugar de query
  const coffeeMutation = useSetVariable()

  const coffeeTypes = [
    { id: 'americano', name: 'Americano', icon: Coffee, description: 'Café negro fuerte' },
    { id: 'tinto', name: 'Tinto', icon: Coffee, description: 'Café concentrado' },
    { id: 'cafe', name: 'Café', icon: Coffee, description: 'Café con leche' },
  ]

  const sizes = [
    { id: '100ml', name: 'Pequeño', volume: '100 ml' },
    { id: '150ml', name: 'Mediano', volume: '150 ml' },
    { id: '250ml', name: 'Grande', volume: '250 ml' }
  ]

  const handleStartOrder = async () => {
    if (!selectedCoffee || !selectedSize) {
      alert('Por favor selecciona un tipo de café y tamaño')
      return
    }
    
    setIsProcessing(true)
    
    try {
      coffeeMutation.mutate({
        variable_name: 'botoniniciocafe',
        variable_type: 'boolean',
        value: true
      })

      // Simular tiempo de procesamiento
      setTimeout(() => {
        setIsProcessing(false)
        setOrderComplete(true)
      }, 3000)
    } catch (error) {
      console.error('Error al procesar el pedido:', error)
      setIsProcessing(false)
      alert('Error al procesar el pedido')
    }
  }

  const handleCoffeeSelection = async (coffeeId) => {
    setSelectedCoffee(coffeeId)
    
    try {
      // Enviar inmediatamente la variable con el ID del café
      coffeeMutation.mutate({
        variable_name: coffeeId,
        variable_type: 'boolean',
        value: true
      })

      // Después de 3 segundos, enviar la variable tipodecafe con el valor numérico
      setTimeout(() => {
        const coffeeValues = {
          'americano': 0,
          'tinto': 1,
          'cafe': 2
        }
        
        coffeeMutation.mutate({
          variable_name: 'tipodecafe',
          variable_type: 'int16',
          value: coffeeValues[coffeeId]
        })
      }, 3000)
    } catch (error) {
      console.error('Error al enviar selección de café:', error)
    }
  }

  const handleSizeSelection = async (sizeId) => {
    setSelectedSize(sizeId)
    
    try {
      // Enviar inmediatamente la variable con el ID del café
      coffeeMutation.mutate({
        variable_name: sizeId,
        variable_type: 'boolean',
        value: true
      })

      // Después de 3 segundos, enviar la variable tipodecafe con el valor numérico
      setTimeout(() => {
        const coffeeValues = {
          '100ml': 0,
          '150ml': 1,
          '250ml': 2
        }
        
        coffeeMutation.mutate({
          variable_name: 'tipodebaso',
          variable_type: 'int16',
          value: coffeeValues[sizeId]
        })
      }, 3000)
    } catch (error) {
      console.error('Error al enviar selección de tamaño:', error)
    }
  }

  const handleReset = () => {
    setResetLoading(true)
    try {
      coffeeMutation.mutate({
        variable_name: 'sacarvaso',
        variable_type: 'boolean',
        value: true
      })

      // Simular tiempo de procesamiento
      setTimeout(() => {
        setSelectedCoffee(null)
        setSelectedSize(null)
        setIsProcessing(false)
        setOrderComplete(false)
        setResetLoading(false)
      }, 3000)
    } catch (error) {
      console.error('Error al procesar el pedido:', error)
      setIsProcessing(false)
      alert('Error al procesar el pedido')
    }
  }

  const SelectionSection = ({ title, options, selected, onSelect, icon: Icon }) => (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <Button
            key={option.id}
            variant={selected === option.id ? "default" : "outline"}
            className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-200 ${
              selected === option.id 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-105' 
                : 'hover:bg-gray-50 hover:scale-102'
            }`}
            onClick={() => onSelect(option.id)}
          >
            <span className="font-medium">{option.name}</span>
            {option.description && (
              <span className="text-xs opacity-80">{option.description}</span>
            )}
            {option.volume && (
              <span className="text-xs opacity-80">{option.volume}</span>
            )}

          </Button>
        ))}
      </div>
    </div>
  )

  if (isProcessing) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Preparando tu café</h2>
          <p className="text-gray-600">Por favor espera mientras preparamos tu bebida...</p>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Tu café está casi listo!</h2>
          <p className="text-gray-600 mb-6">Espera a que el café se termine de preparar para retirarlo</p>
          <Button onClick={handleReset} className="bg-green-600 hover:bg-green-700" disabled={resetLoading}>
            {resetLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sacar vaso'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Coffee className="w-8 h-8 text-amber-600" />
            Café Express
          </h1>
          <p className="text-gray-600">Selecciona tu bebida personalizada</p>
        </div>

        <div className="space-x-8 flex justify-center">
            <SelectionSection
              title="Tipo de Café"
              options={coffeeTypes}
              selected={selectedCoffee}
              onSelect={handleCoffeeSelection}
              icon={Coffee}
            />

            <SelectionSection
              title="Tamaño"
              options={sizes}
              selected={selectedSize}
              onSelect={handleSizeSelection}
              icon={CupSoda}
            />
          </div>

        {/* Order Summary and Actions */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-lg">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Resumen del Pedido</h3>
              <div className="text-sm text-gray-600 space-y-1">
                {selectedCoffee && (
                  <p>• Café: {coffeeTypes.find(c => c.id === selectedCoffee)?.name}</p>
                )}
                {selectedSize && (
                  <p>• Tamaño: {sizes.find(s => s.id === selectedSize)?.name} ({sizes.find(s => s.id === selectedSize)?.volume})</p>
                )}

              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleStartOrder}
                disabled={!selectedCoffee || !selectedSize}
                className="bg-amber-600 hover:bg-amber-700 flex items-center gap-2 disabled:opacity-50"
              >
                <Timer className="w-4 h-4" />
                Preparar Café
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}

export default App