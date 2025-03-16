import './ScannerQR.css'
import { useState } from 'react'
import { Container } from '../Container/Container.jsx'
import { QRCodeContainer } from '../QRContainer/QRCodeContainer.jsx';
import { ButtonsContainer } from '../ButtonsContainer/ButtonsContainer.jsx';



export const ScannerQR = () => {
  const [active, setActive] = useState(false);
  const [textQR, setTextQR] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null);
  const [loadImg, setLoadImg] = useState(false);

  const readFile = (e) => {
    const newFile = e.target.files[0];
    if (newFile.name.includes(".png") || newFile.name.includes(".jpg") || newFile.name.includes(".jpeg") || newFile.name.includes(".gif")) {
      setFile(newFile)
      const imgURL = URL.createObjectURL(newFile);
      setImg(imgURL);
    } else {
      setFile(null);
      return alert("El archivo tiene que ser .png, .jpg, .jpeg o .gif .");
    }

    // Clean up
    return e.target.value = null;
  }

  const SubmitFile = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const API_URL = `https://api.qrserver.com/v1/read-qr-code/`;
    try {
      fetch(API_URL, {
        method: "POST",
        body: formData
      }).then(res => res.json())
        .then(data => {
          const qrValue = data[0].symbol[0].data;
          setTextQR(qrValue);
          setActive(true);
          setLoadImg(false);
        })
        .catch (() => {
          setImg(null);
          setLoadImg(false);
          return alert("Error al cargar la imagen.");
        });

    } catch {
      setImg(null);
      setLoadImg(false)
      return alert("Error al cargar la imagen.");
    }
  }

  const copy = () => {
    if (!textQR) return;
    navigator.clipboard.writeText(textQR);
  }

  const closeQRContainer = () => {
    setActive(false);
    setTextQR(null);
    setFile(null);
    setImg(null);
  }


  return (
    <Container scanner isActive={active}>
      <label>
        <input 
          type='file' 
          accept='.png, .jpeg, .jpg, .gif'
          onInput={readFile}
          onChange={SubmitFile} 
        />

        <i className="bi bi-cloud-arrow-up"></i>
        {loadImg ? "Uploading... qr code" : "Upload qr code to scanned"}

      </label>

      <QRCodeContainer 
        img={img} 
        loadImageEnd={() => setLoadImg(true)}
      >
        <textarea className='text-qr-code' value={textQR} readOnly></textarea>

        <ButtonsContainer closeQRContainer={closeQRContainer}>
          <button className='btn btn-copy' type='button' onClick={copy}>
            <i className="bi bi-clipboard"></i> Copy
          </button>
        </ButtonsContainer>

      </QRCodeContainer>
    </Container>
  )
}