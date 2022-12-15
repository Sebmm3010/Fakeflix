import { Navigate, Route, Routes } from 'react-router-dom'
import { Home, UserPage } from '../pages'

export const HomeRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<UserPage/>}/>
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
