import { reactive, ref } from 'vue'
import type { ValidationRule } from '@/utils/validation'
import { validate } from '@/utils/validation'

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Record<keyof T, ValidationRule[]>,
  onSubmit: (values: T) => Promise<void>
) {
  const values = reactive<T>({ ...initialValues })
  const errors = reactive<Record<keyof T, string[]>>({} as Record<keyof T, string[]>)
  const touched = reactive<Record<keyof T, boolean>>({} as Record<keyof T, boolean>)
  const isSubmitting = ref(false)
  const isValid = ref(true)

  const validateField = async (field: keyof T) => {
    const rules = validationRules[field]
    if (!rules) return
    errors[field] = await validate(values[field], rules)
    touched[field] = true
  }

  const validateForm = async () => {
    const validations = Object.keys(validationRules).map(field => 
      validateField(field as keyof T)
    )
    await Promise.all(validations)
    isValid.value = Object.values(errors).every(fieldErrors => fieldErrors.length === 0)
    return isValid.value
  }

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    isSubmitting.value = true
    
    try {
      const isValid = await validateForm()
      if (isValid) {
        await onSubmit(values)
      }
    } finally {
      isSubmitting.value = false
    }
  }

  const resetForm = () => {
    Object.assign(values, initialValues)
    Object.keys(errors).forEach(key => {
      errors[key as keyof T] = []
    })
    Object.keys(touched).forEach(key => {
      touched[key as keyof T] = false
    })
    isValid.value = true
  }

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    validateField,
    validateForm,
    handleSubmit,
    resetForm
  }
} 