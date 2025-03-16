import './CreateQR.css';
import { useEffect, useState } from 'react';
import { Container } from '../Container/Container.jsx';
import { QRCodeContainer } from '../QRContainer/QRCodeContainer.jsx';
import { ButtonsContainer } from '../ButtonsContainer/ButtonsContainer.jsx';


export const CreateQR = () => {
  const [active, setActive] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [imgURL, setImgURL] = useState(null);
  const [generate, setGenerate] = useState(false);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!textareaValue) {
      setActive(false)
      setGenerate(false)
    } ;
  }, [textareaValue])

  const closeQRContainer = () => {
    setImgURL(null);
    setActive(false);
    setTextareaValue("");
  }

  const create = async () => {
    if (!textareaValue) return;
    
    try {
      setGenerate(true);
      const API_URL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&charset-source=UTF-8&data=${textareaValue}`;
      const res = await fetch(API_URL);
      const data = await res.blob()
      const urlImg = URL.createObjectURL(data);
      
      setImgURL(urlImg);
  
      URL.revokeObjectURL(data);
    } catch {
      setGenerate(false);
      return alert("Error al enviar los datos.");
    }
  }

  useEffect(() => {
    if (load) {
      setGenerate(false)
      setActive(true)
    }

    // Clean up
    return () => setLoad(false);
  }, [load])


  const changeInput = (e) => {
    setTextareaValue(e.target.value)
    setImgURL(null);
    setActive(false);

    return e.target.vale = "";
  }


  return (
    <Container createQR isActive={active}>
      <div className="div-create-qr-code">
        <h1>Generate QR Code</h1> 
        <textarea 
          className='text-to-convert' 
          placeholder='Enter text or url' 
          required
          value={textareaValue} 
          onChange={changeInput}
        ></textarea>

        <button className='btn btn-create' type='button' onClick={create}>
          {generate ? "Generating QR code...": "Generate QR code"}
        </button>
      </div>
      
      <QRCodeContainer 
        img={imgURL} 
        loadImageEnd={() => setLoad(true)}
      >

        <ButtonsContainer closeQRContainer={closeQRContainer}>
          <a 
            className='btn btn-download' 
            href={imgURL}
            rel='noopener-noreferrer' 
            download={`${textareaValue}-qr-code.png`} 
          >
            <i className="bi bi-download"></i> Download
          </a>
        </ButtonsContainer>

      </QRCodeContainer>
    </Container>
  )
}