

import './TailwindCss/output.css';
import './Css/App.css';

import { Rough } from './Pages/rough';
import { Home } from './Pages/Home';
import { Nothing } from './Pages/Nothing';
import { DashBoard } from './Pages/DashBoard';
import { WelcomeUser } from './Pages/WelcomeUser';
import { JobDetail } from './Pages/JobDetail';
import { CreatePost } from './Components/CreatePost/CreatePost';
import { Search } from './Pages/Search';
import { UpdateProfile } from './Pages/UpdateProfile';
import { Provider } from './Pages/Provider';
import { ProviderJobDetail } from './Pages/ProviderJobDetail';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>


      <BrowserRouter>
        <Routes>


          <Route path='/' element={<Home />}></Route>
          <Route path='/theSearch/:search' element={<Search />}></Route>
          <Route path='/rough' element={<Rough></Rough>}></Route>
          <Route path='/dashboard' element={<DashBoard />}></Route>
          <Route path='/provider' element={<Provider />}></Route>
          <Route path='/updateProfile' element={<UpdateProfile />}></Route>
          <Route path='/welcomeUser' element={<WelcomeUser />}></Route>
          <Route path='/createPost' element={<CreatePost />}></Route>
          <Route path='/jobDetail/:no' element={<JobDetail />}></Route>
          <Route path='/providerJobDetail/:no' element={<ProviderJobDetail />}></Route>


          <Route path='*' element={<Nothing />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
