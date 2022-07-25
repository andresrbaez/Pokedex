import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import UserInput from './components/UserInput'
import Pokedex from './components/Pokedex'
import PokemonDetail from './components/PokemonDetail'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <HashRouter>
      <div className="body-center">
        <Routes>
          <Route path='/' element={<UserInput/>} />

          <Route element={<ProtectedRoutes/>}>
            <Route path='/pokedex' element={<Pokedex/>} />
            <Route path='/pokedex/:id' element={<PokemonDetail/>}/>
          </Route>

        </Routes>
      </div>

    </HashRouter>

  )
}

export default App
