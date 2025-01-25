import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
    const {logout} = useAuthStore();
    return (
        <div className="w-full h-full">
            <Navbar/>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default HomePage;