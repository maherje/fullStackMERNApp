import { Link } from 'react-router-dom';

function Navigation(){
    return (
        <>
            <header>
                <h1>Exercise Database</h1>
                <p>A FULL STACK MERN APP</p>
            </header>
            <nav className="app-nav">
                <Link to="/">Home</Link>
                <Link to="/create-exercise">Create Exercise</Link>
            </nav>
        </>
    );
}

export default Navigation;