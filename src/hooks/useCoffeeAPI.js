import { useMutation } from "@tanstack/react-query"

const API_URL = 'https://d931-191-156-43-204.ngrok-free.app/'


// Hook específico para el endpoint set-variable
export const useSetVariable = () => {
  return useMutation({
    mutationFn: async ({ variable_name, variable_type, value }) => {
      const response = await fetch(`${API_URL}set-variable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          variable_name,
          variable_type,
          value
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'Error estableciendo variable')
      }
      
      return response.json()
    },
    onSuccess: (data) => {
      console.log('Variable establecida exitosamente:', data)
    },
    onError: (error) => {
      console.error('Error estableciendo variable:', error)
    }
  })
}
