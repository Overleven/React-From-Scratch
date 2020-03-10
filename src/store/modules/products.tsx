import { typedAction } from './user'
import { Dispatch, AnyAction } from 'redux'

type Product = {
  id: number
  name: string
  price: number
  img: string
}

type CartItem = {
  id: number
  quantity: number
}

type ProductState = {
  products: Product[]
  loading: boolean
  cart: CartItem[]
}

const initialState: ProductState = {
  products: [],
  loading: false,
  cart: []
}

const addProducts = (products: Product[]) => {
  return typedAction('products/ADD_PRODUCTS', products);
}

export const addToCart = (product: Product, quantity: number) => {
  return typedAction('products/ADD_TO_CART', { product, quantity });
}

export const loadProducts = () => {
  return (dispatch: Dispatch<AnyAction>) => {
    setTimeout(() => {
      dispatch(
        addProducts([
          {
            id: 1,
            name: 'Cool Headphones',
            price: 4999,
            img: 'https://placeimg.com/640/480/tech/5'
          }
        ])
      )
    }, 500)
  }
}

type ProductAction = ReturnType<typeof addProducts | typeof addToCart>

export const productReducer = (
  state = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case 'products/ADD_PRODUCTS':
      return {
        ...state,
        products: [...state.products, ...action.payload]
      }
    case 'products/ADD_TO_CART':
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            id: action.payload.product.id,
            quantity: action.payload.quantity
          }
        ]
      }
    default:
      return state
  }
}