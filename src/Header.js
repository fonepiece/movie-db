import { Container, Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import logo from './images/logo.png'; // with import


function Header() {
    const {pathname} = useLocation();
    
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md">
                <Container>
                    <Navbar.Brand href="/"> 
                        <img className="logo-header" src={logo} alt="cinefun logo" />
                        <span style={{position: 'relative', top: '7px', left: '4px'}}>CineFun</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/" active={pathname === '/'}>Home</Nav.Link>
                        <Nav.Link href="/about" active={pathname === '/about'}>About</Nav.Link>
                        <Nav.Link href="/favorites" active={pathname === '/favorites'}>Favorites</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header