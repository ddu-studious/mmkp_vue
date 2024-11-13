// 邮箱验证
export const isEmail = (value: string): boolean => {
  const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return pattern.test(value)
}

// URL验证
export const isURL = (value: string): boolean => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

// 手机号验证（中国大陆）
export const isPhoneNumber = (value: string): boolean => {
  const pattern = /^1[3-9]\d{9}$/
  return pattern.test(value)
}

// 密码强度验证
export const isStrongPassword = (value: string): boolean => {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
  return pattern.test(value)
}

// 身份证号验证（中国大陆）
export const isIDCard = (value: string): boolean => {
  const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return pattern.test(value)
}

// 表单验证规则
export interface ValidationRule {
  required?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (value: any) => boolean | Promise<boolean>
  message?: string
}

// 表单验证函数
export const validate = async (value: any, rules: ValidationRule[]): Promise<string[]> => {
  const errors: string[] = []

  for (const rule of rules) {
    if (rule.required && !value) {
      errors.push(rule.message || '此字段是必填的')
      continue
    }

    if (value) {
      if (rule.min && value.length < rule.min) {
        errors.push(rule.message || `最小长度为 ${rule.min}`)
      }

      if (rule.max && value.length > rule.max) {
        errors.push(rule.message || `最大长度为 ${rule.max}`)
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        errors.push(rule.message || '格式不正确')
      }

      if (rule.validator) {
        try {
          const result = await rule.validator(value)
          if (!result) {
            errors.push(rule.message || '验证失败')
          }
        } catch (error) {
          errors.push(rule.message || '验证失败')
        }
      }
    }
  }

  return errors
}

// 常用验证规则
export const commonRules = {
  required: { required: true, message: '此字段是必填的' },
  email: { pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, message: '请输入有效的邮箱地址' },
  url: { validator: isURL, message: '请输入有效的URL' },
  phone: { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
  password: { 
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
    message: '密码必须包含大小写字母、数字和特殊字符，且长度不少于8位'
  }
} 