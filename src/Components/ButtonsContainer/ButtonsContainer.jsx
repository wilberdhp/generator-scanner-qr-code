import './ButtonsContainerStyles.css';

export const ButtonsContainer = ({ children, closeQRContainer }) => {

  const handleClick = () => {
    closeQRContainer()
  }

  return (
    <div className='buttons-container'>

      {children}

      <button onClick={handleClick} className='btn btn-cancel'>
        <i className="bi bi-x-circle-fill"></i> Close
      </button>
    </div>
  )
}