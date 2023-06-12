'use client'
import Image from 'next/image';
import logo from '/public/images/logo.jpg'

export default function Nav({minimal, authToken, setShowModal, showModal, setIsSignUp}) {
const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
}
  return (
    <nav>
        <div className="logo-container">
            <Image src={logo} alt="Swipe Right Logo" width={50} height={50} />
            {!authToken &&  !minimal && 
            <button className="nav-button" onClick={handleClick} disabled={showModal}>
                INICIAR SESION
            </button>}
        </div>
    </nav>
  );
}
