  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useCookies } from "react-cookie";
  import { useRouter } from 'next/router'
  
  export default function MatchesDisplay({ matches, setClickedUser }) {
    const [matchedProfiles, setMatchedProfiles] = useState(null);
    const [cookies] = useCookies(null);
  
    const matchedUserIds = matches.map(({ user_id }) => user_id);
    const userId = cookies.UserId;
  
    const getMatches = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users", {
          params: { userIds: JSON.stringify(matchedUserIds) },
        });
        setMatchedProfiles(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getMatches();
    }, []);

  
    const filteredMatchedProfiles = matchedProfiles?.filter(
      (matchedProfile) =>
        matchedProfile.matches.filter((profile) => profile.user_id == userId)
          .length > 0
    );
  

    const reload = () => {window.location.href = '/Dashboard'}
    
  return (
    <div className="matches-display">
      <button className="refres" onClick={reload}>Refrescar</button>
      {filteredMatchedProfiles?.map((match) => (
        <div
          key={match.user_id}
          className="match-card"
          onClick={() => setClickedUser(match)}
        >
          <div className="img-container">
            <img src={match?.url} alt={match?.first_name + " profile"} />
          </div>
          <h3>{match?.first_name}</h3>
        </div>
      ))}
    </div>
  )
}
