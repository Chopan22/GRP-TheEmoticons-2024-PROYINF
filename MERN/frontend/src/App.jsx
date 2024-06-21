import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

// Aqui van las paginas y los componentes
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Dicom from './pages/Dicom'
import Pacientes from './pages/Pacientes'

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navbar/>
				<div className="pages">
					<Routes>
						<Route path="/" element={<Home />}/>
						<Route path="/dicom" element={<Dicom/>}/>
						<Route path="/pacientes" element={<Pacientes/>}/>

						
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}


export default App
