import { useState } from 'react'
import './App.css'
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';

const Home = lazy(() => import("./pages/home/Home"));

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
