export interface OrderDetails {
  total: number
  items: OrderItem[]
}

export interface OrderItem {
  name: string
  quantity: number
  price: number
  item_total: number
}

export interface Order {
  customer_name: string
  customer_phone: string
  location: string
  customer_email?: string
  payment_proof?: File
  order_details: OrderDetails
  status: 'unconfirmed'
  custom_location?: string
  total: number
  items: number
}
