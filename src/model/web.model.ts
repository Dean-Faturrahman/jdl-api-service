export class WebResponse<T> {
    status_code: number
    message?: string
    data?: T
    errors?: string
}