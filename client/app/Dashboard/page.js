'use client'
import { useEffect, useState } from 'react'
import ChatContainer from '@/components/ChatContainer'
import { useCookies } from 'react-cookie'
import TinderCard from 'react-tinder-card'
import axios from 'axios'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [cookies] = useCookies(['user'])

  const userId = cookies.UserId

  useEffect(() => {
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
  
    getUser();
  }, [userId])
  
  useEffect(() => {
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
  
    if (user?.gender_interest) {
      getGenderedUsers();
    }
  }, [user])

  const updateMatches = async (matchedUserId) => {
    try {
        await axios.put('http://localhost:8000/addmatch', {
            userId,
            matchedUserId
        })
        getUser()
    } catch (err) {
        console.log(err)
    }
}


  const swiped = (direction, swipedUserId) => {
    if (direction === 'right' || direction === 'up') {
        updateMatches(swipedUserId)
    }
    setLastDirection(direction)
}

const outOfFrame = (name) => {
    console.log('Te gusta ' + name + '!!')
}

const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))

  return (
    <>
            {user &&
            <div className="dashboard">
                <ChatContainer user={user}/>
                <div className="swipe-container">
                    <div className="card-container">
                    <div className="expli">
                    <h1 className="expli1">Desliza según tus preferencias !!!</h1>
                    <h1 className="expli2">- Si te gusta desliza arriba o derecha</h1>
                    <h1 className="expli2">- Si no te gusta desliza abajo o izquierda</h1>
                    </div>
                        {filteredGenderedUsers?.map((genderedUser) =>
                            <TinderCard
                                className="swipe"
                                key={genderedUser.user_id}
                                onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                                  <div className="person">
                                  <div className="info">
                                    <h1>{genderedUser.first_name}</h1>
                                    <div className="sport">
                                    <h4>{genderedUser.discipline}</h4><h4>-</h4><h4>{genderedUser.experience_level}</h4>
                                    </div>
                                    <div className="text">
                                    <p>{genderedUser.training_preferences}</p>
                                      </div>
                                </div>
                                <div
                                    style={{backgroundImage: "url(" + genderedUser.url + ")"}}
                                    className="card">
                                    
                                </div>
                                </div>
                                
                            </TinderCard>
                        )}
                        {/* <div className="swipe-info">
                            {lastDirection ? <p> {lastDirection}</p> : <p/>}
                        </div> */}
                    </div>
                </div>
            </div>}
        </>
  )
}
