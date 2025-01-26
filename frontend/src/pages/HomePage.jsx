import Navbar from '../components/Navbar';
import Bookshelf from '../components/Bookshelf';
import Sidebar from '../components/Sidebar';


const HomePage = () => {

    return (
        <div className="w-full h-full">
            <Navbar/>
            <div className="flex">
                <Sidebar/>
                <Bookshelf/>
            </div>

        </div>
    )
}

export default HomePage;