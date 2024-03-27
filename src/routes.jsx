import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { Adv } from './pages/adv';
import Seller from './pages/sellers';
import { Myprofile } from './pages/profile';
import { Myadv } from './pages/myadv';
import { useSelector } from "react-redux";



export const AppRoutes = () => {
    const isTokenGlobal = useSelector(state => state.product.tokenExists);
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/product/:id" element={<Adv />} />
            <Route path="/product/:id/seller/:sellerId" element={<Seller />} />
            <Route path="/profile" element = {<Myprofile isAuthenticated={isTokenGlobal} />}/>
            <Route path="/profile/:id" element={<Myadv isAuthenticated={isTokenGlobal} />} />
        </Routes>
    )
}
