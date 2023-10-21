import { RoutesApp } from './utils/routes'
import './styles/global/reset.css'
import './styles/global/typography.css'
import { FormProvider } from '../src/utils/contexts/FormContext'
import AuthService from './services/auth.service'
import { useEffect, useState } from 'react'

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
    }
  }, [])

  // const logOut = () => {
  //   AuthService.logout();
  // };

  return (
    <>
      <FormProvider>
        <RoutesApp />
      </FormProvider>
    </>
  )
}

export default App
