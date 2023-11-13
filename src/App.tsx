import './App.css'
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
// import List from './pages/List/List';

const Home = lazy(() => import("./pages/Home/Home"));
const Create = lazy(() => import("./pages/Home/Home"));
const List = lazy(() => import("./pages/List/List"));

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
