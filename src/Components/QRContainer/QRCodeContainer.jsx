import './QRCodeContainerStyles.css'

export const QRCodeContainer = ({ children, img, loadImageEnd }) => {

  const handleLoad = () => {
    loadImageEnd()
  }

  return (
    <>
      <div className='qr-code-container'>
        <div className='qr-img-container'>
          <img onLoad={handleLoad} className='qr-code-img' src={img} alt='QR Code'/>
        </div>
        {children}
      </div>
    </>
  )
}