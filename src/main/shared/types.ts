export type ResponseData<T> = {
  statusCode: number
  message: string
  data: T
}

export type ResponseError = {
  statusCode: number
  message: string
}


