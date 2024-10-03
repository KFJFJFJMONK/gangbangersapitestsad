import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { textbox, type, wildcard } = req.query;

  const apiUrl = "https://api.snusbase.com/data/search";
  const apiKey = "sb1yv3fuxmuda07zcux913oat3f0bk";

  const requestBody = {
    terms: [textbox],
    types: [type], // "email", "username", "lastip", "password", "hash", "name", "_domain"
    wildcard: wildcard === "true",
    group_by: "db"
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Auth": apiKey
    },
    body: JSON.stringify(requestBody)
  });

  if (response.ok) {
    const result = await response.json();
    res.status(200).json(result);
  } else {
    res.status(response.status).json({ error: response.statusText });
  }
}
