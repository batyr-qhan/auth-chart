import React, {useState, useEffect} from 'react';

function Home(props) {

  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetch('http://ideadeploy.space/test/info.json',
      {
        method: "GET"
      }
    ).then(result => result.json())
      .then(data => setUserData(data))
      .catch(error => console.log(error))
  }, [])


  return (
    <div>
      <h3>Username: {userData.login}</h3>


    </div>
  );
}

export default Home;