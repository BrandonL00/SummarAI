import Navbar from '../components/Navbar';
import Bookshelf from '../components/Bookshelf';
import Sidebar from '../components/Sidebar';


const HomePage = () => {

    return (
        <div className="w-full h-screen overflow-hidden">
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                <Bookshelf/>
            </div>

        </div>
    )
}

export default HomePage;