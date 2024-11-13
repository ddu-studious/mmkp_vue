declare global {
  interface Window {
    __INITIAL_STATE__?: any
    __APP_VERSION__: string
  }

  type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
  }

  type Nullable<T> = T | null

  type ValueOf<T> = T[keyof T]

  type Awaited<T> = T extends Promise<infer U> ? U : T

  type UnwrapRef<T> = T extends Ref<infer U> ? U : T

  type RemoveIndex<T> = {
    [P in keyof T as string extends P ? never : number extends P ? never : P]: T[P]
  }
}

export {} 