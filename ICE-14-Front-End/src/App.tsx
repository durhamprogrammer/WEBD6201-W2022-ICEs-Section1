import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

// Common Components
import Header from './components/header';
import Footer from './components/footer';

// Content Components
import Home from './content/home';
import About from './content/about';
import Projects from './content/projects';
import Services from './content/services';
import Contact from './content/contact';
import PageNotFound from './content/PageNotFound';

// Authentication Components
import Login from './authentication/login';
import Register from './authentication/register';
import Logout from './authentication/logout';
import RequireAuth from './authentication/requireAuth';

// Contact-List Components
import ContactList from './contact-list/contact-list';
import AddContact from './contact-list/add';
import EditContact from './contact-list/edit';

// Styles and Fonts
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import './App.css';

// App Template
class App extends React.Component
{
  constructor(props:any) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  render()
  {
    return (
      <div className="App">
        <BrowserRouter>
          <Header></Header>
  
          {/* Client-Side Routing */}
          <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/contact-list" element={<RequireAuth><ContactList /></RequireAuth>} />
                  <Route path="/add" element={<RequireAuth><AddContact /></RequireAuth>} />
                  <Route path="/edit/:id" element={<RequireAuth><EditContact /></RequireAuth>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="*" element={<PageNotFound />} />
              </Routes>
          </div>
            
          <Footer></Footer>
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
