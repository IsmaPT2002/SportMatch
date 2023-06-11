'use c'
import { useEffect, useState } from 'react'
import ChatContainer from '@/components/ChatContainer'
import { useCookies } from 'react-cookie'
import axios from 'axios'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user', {
        params: { userId }
      })
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: { gender: user?.gender_interest }
      })
      setGenderedUsers(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    getGenderedUsers()
  }, [user, getGenderedUsers])

  console.log(user)
  console.log(genderedUsers)

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="card-container">
            {genderedUsers?.map((character) => (
              <div
                className="card"
                key={character.user_id}
              >
                <div
                  style={{ backgroundImage: "url(" + character.url + ")" }}
                  className="card-background"
                />
                <h3>{character.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
