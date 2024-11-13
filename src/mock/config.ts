export const MOCK_CONFIG = {
  // API 延迟配置
  delay: {
    default: 300,
    list: 500,
    detail: 200,
    create: 800,
    update: 600,
    delete: 400
  },

  // 分页配置
  pagination: {
    defaultPage: 1,
    defaultLimit: 10,
    maxLimit: 50
  },

  // 错误配置
  errors: {
    notFound: {
      code: 404,
      message: '请求的资源不存在'
    },
    unauthorized: {
      code: 401,
      message: '未授权，请先登录'
    },
    forbidden: {
      code: 403,
      message: '没有权限执行此操作'
    },
    badRequest: {
      code: 400,
      message: '请求参数错误'
    },
    serverError: {
      code: 500,
      message: '服务器错误'
    }
  },

  // 响应配置
  response: {
    successCode: 200,
    errorCode: 500,
    defaultMessage: 'success'
  }
} 