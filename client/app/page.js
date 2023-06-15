'use client'
import { useState } from 'react';
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'
import {useCookies} from "react-cookie"


export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken

  const handleClick = () => {
      if (authToken) {
          removeCookie('UserId', cookies.UserId)
          removeCookie('AuthToken', cookies.AuthToken)
          window.location.reload()
          return
      }
      setShowModal(true)
      setIsSignUp(true)
  }

  return (
    <div className="overlay">
      <Nav
        minimal={false}
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Sport Match®</h1>
        <button className="primary-button" onClick={handleClick}>
          {authToken ? "Desconectar" : "CREAR CUENTA"}
        </button>

        {showModal && 
          <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
        }
      </div>
      <div className="footer">
      <p className="left">&copy; 2023 SportMatch </p>
  <p className="right">Contacto: ismaelpereztierra@gmail.com | Teléfono: +34644379573</p>
            </div>
    </div>
  );
}


