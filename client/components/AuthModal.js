'use client'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function AuthModal({setShowModal, isSignUp}) {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    // let navigate = useNavigate()

    console.log(email, password, confirmPassword)

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords do not match')
                return
            }
            console.log('posting', email, password)
            const response = await axios.post('http://localhost:8000/signup', { email, password })

            const sucess = response.status === 201

            if (sucess) navigate ('/onboarding')

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="auth-modal">
        <div className="close-icon" onClick={handleClick}>ⓧ</div>
        <h2>{isSignUp ? 'CREAR CUENTA' : 'INICIAR SESION'}</h2>
        <p>Logueandote estas acceptando los terminos. Procesaremos sus datos tal y como pone en nuestra Política de Privacidad y de Cookies.</p>
        <form onSubmit={handleSubmit}>
        <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="contraseña"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirmar contraseña"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
        </form>
        <hr/>
        <h2>CONSIGUE LA APP</h2>
    </div>
  );
}