// Context, Reducer, Provider, Hook
import { createContext, ReactNode, useContext, useReducer } from 'react'

type State = {
  name: string
  lastName: string
  currentStep: number
  birthDate: string
  occupation: string
  careerTime: string
  email: string
  password: string
  confirmPassword: string
}
type Action = {
  type: FormActions
  payload: any
}
type ContextType = {
  state: State
  dispatch: (action: Action) => void
}
type FormProviderProps = {
  children: ReactNode
}

const initialData = {
  name: '',
  lastName: '',
  currentStep: 0,
  birthDate: '',
  occupation: '',
  careerTime: '',
  email: '',
  password: '',
  confirmPassword: ''
}

// Context
const FormContext = createContext<ContextType | undefined>(undefined)

// Reducer
export enum FormActions {
  setName,
  setLastName,
  setCurrentStep,
  setBirthDate,
  setOccupation,
  setCareerTime,
  setEmail,
  setPassword,
  setConfirmPassword
}
const formReducer = (state: State, action: Action) => {
  switch (action.type) {
    case FormActions.setName:
      return { ...state, name: action.payload }
    case FormActions.setLastName:
      return { ...state, lastName: action.payload }
    case FormActions.setCurrentStep:
      return { ...state, currentStep: action.payload }
    case FormActions.setBirthDate:
      return { ...state, birthDate: action.payload }
    case FormActions.setOccupation:
      return { ...state, occupation: action.payload }
    case FormActions.setCareerTime:
      return { ...state, careerTime: action.payload }
    case FormActions.setEmail:
      return { ...state, email: action.payload }
    case FormActions.setPassword:
      return { ...state, password: action.payload }
    case FormActions.setConfirmPassword:
      return { ...state, confirmPassword: action.payload }
    default:
      return state
  }
}

// Provider
export const FormProvider = ({ children }: FormProviderProps) => {
  const [state, dispatch] = useReducer(formReducer, initialData)
  const value = { state, dispatch }
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

// Context Hook
export const useForm = () => {
  const context = useContext(FormContext)
  if (context === undefined) {
    throw new Error('useForm prescisa ser usado dentro do FormProvider')
  }
  return context
}
