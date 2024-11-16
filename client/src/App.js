

import './TailwindCss/output.css';
import './Css/App.css';

import { Rough } from './Pages/rough';
import { HomeWithoutLogin } from './Pages/HomeWithoutLogin';
import { Nothing } from './Pages/Nothing';


import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
   <>
    

      <BrowserRouter>
      <Routes>
      
        <Route path='/' element={<HomeWithoutLogin/>}></Route>
        <Route path='/rough' element={<Rough></Rough>}></Route>
       
       <Route path='*' element={<Nothing/>}></Route>
      
      </Routes>
      </BrowserRouter>
   </>
  );
}

export default App;
