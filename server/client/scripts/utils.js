async function getHighscore(playerName) {
  const url = "/api/player";

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'username' : playerName
    }
  });

  if (response.ok) {
    return response.json();
  }
  const error = await response.text();
  return error;
}


async function setScore(ScoreResult){

  const response = await fetch('/api/score', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
			// Add any required authentication headers if needed
		},
		body: JSON.stringify(ScoreResult),
	})

  if (response.ok) {
    return response.json();
  }
  const error = await response.text();
  return error;

}

export { getHighscore, setScore }