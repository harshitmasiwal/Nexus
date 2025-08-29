import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function Github() {
  const { name } = useParams();
  const [profile, setProfile] = useState([]);

  async function fetchData() {
    const response = await fetch(`https://api.github.com/users/${name}`);
    const data = await response.json();
    console.log(data);
    setProfile(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    
        <div className="card">
          <img src={profile?.avatar_url} className="img" />

          <h2>Name : {profile?.login}</h2>
          <a href={profile?.html_url} target="_blank">
            Visit Github
          </a>
        </div>

      
      
    </>
  );
}
