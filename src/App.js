import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {

      try{
        const response = await api.get('repositories');
        setRepositories(response.data);
      } catch(err){
        console.log('Error to get repositories');
      }
    }

    loadRepositories();
  } , []);

  async function handleAddRepository() {
    try{
      const response = await api.post('repositories', {
        title: 'Leandro2',
        url: 'https://github.com/LeandroGioria',
        techs: 'nodejs'
      });

      const repository = response.data;
      setRepositories([...repositories, repository]);
    } catch(err){
      console.log('Error to get repositories');
    }
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter(r => r.id !== id));
    } catch(err){
      console.log('Error to get repositories');
    }
  }

  return (
    <div>
      
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
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
