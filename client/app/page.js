'use client'
import { useState } from 'react';
import Nav from '../components/Nav'
import AuthModal from '../components/AuthModal'


export default function Home() {

  const [showModal, setShowModal] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const authToken = false

  function handleClick() {
    console.log("Clicked");
    setShowModal(true);
    setIsSignUp(true);
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
    </div>
  );
}


