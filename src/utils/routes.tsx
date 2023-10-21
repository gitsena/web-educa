import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Teacher } from '../pages/Teacher'
import { FormStep1 } from '../pages/SignUp/FormStep1'
import { FormStep2 } from '../pages/SignUp/FormStep2'
import { FormStudent } from '../pages/SignUp/FormStudent'
import NotFound from '../pages/NotFound'
import { Student } from '../pages/Student'

  export const RoutesApp = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro/professor/etapa1" element={<FormStep1 />} />
        <Route path="/cadastro/professor/etapa2" element={<FormStep2 />} />
        <Route path="/cadastro/estudante" element={<FormStudent />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/professor" element={<Teacher />} />
        <Route path="/estudante" element={<Student />} />
      </Routes>
    </Router>
  )
}
