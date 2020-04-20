import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      const resp = await api.get("/repositories");

      setRepositories([...resp.data]);
    }

    getRepositories();
  }, []);

  async function handleAddRepository() {
    const newRepository = await api.post("/repositories", {
      title: `Repository Added: ${Date.now()}`,
      url: "www.google.com.br",
      techs: ["React, NodeJS"],
    });

    setRepositories([...repositories, newRepository.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);

      const updatedList = repositories.filter((repo) => repo.id !== id);

      setRepositories([...updatedList]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={String(repository.id)}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
