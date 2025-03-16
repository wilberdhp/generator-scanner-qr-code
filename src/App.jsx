import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { CreateQR } from './Components/CreateQR/CreateQR.jsx'
import { ScannerQR } from './Components/ScannerQR/ScannerQR.jsx'

function App() {

  return (
    <>
      <CreateQR />
      <ScannerQR />
    </>
  )
}

export default App
