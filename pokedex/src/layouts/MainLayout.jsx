import { Link, Outlet } from "react-router";
import imatgeInici from '../img/logo_pokedex.png';
export default function MainLayout() {
  return (
    <div>
      <header className="header">
        <nav> 
          <Link to="/"><img style={{height: '70px'}} src={imatgeInici}/></Link>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
