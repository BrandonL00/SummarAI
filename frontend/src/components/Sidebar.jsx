import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
    const {logout} = useAuthStore();
    return (
      <div className="h-screen w-1/5 pt-10 px-4 text-center">
        <h1>Sidebar</h1>
        <button onClick={logout} className="text-red-500 underline absolute bottom-10">logout</button>
      </div>
    );
  };
  
  export default Sidebar;
  