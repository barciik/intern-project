import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <div className='wrapper'>
        
        <BrowserRouter>
        <Navigation />
          <Routes>
            <Route path='/' element={<h1>test</h1>}/>
            <Route path='/1' element={<h1>skrrt</h1>} />
          </Routes>
        </BrowserRouter>
        
      </div>
    )

  }
}

export default App;
