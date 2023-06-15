'use client'
import { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie'

export default function AuthModal({setShowModal, isSignUp}) {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie] = useCookies([null])

    const router = useRouter();

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Las contraseñas no coinciden !!')
                return
            }

            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })

            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201
          
            if (success && isSignUp) router.push ('/Onboarding')
            if (success && !isSignUp) router.push ('/Dashboard')

            //window.location.reload()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>ⓧ</div>

            <h2>{isSignUp ? 'CREAR CUENTA': 'INCIAR SESIÓN'}</h2>
            <p>Al hacer clic en Iniciar sesión, acepta nuestros términos. Conoce cómo procesamos tus datos en nuestra Política de Privacidad y Política de Cookies.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo electronico"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="Confirmar contraseña"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
        </div>
    )
}