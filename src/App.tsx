import './App.css'
import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';


const Home = lazy(() => import("./pages/Home/Home"));
const Create = lazy(() => import("./pages/Home/Home"));
const List = lazy(() => import("./pages/List/List"));

function App() {

  return (
    <HashRouter>
      <Layout>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  )
}

export default App
