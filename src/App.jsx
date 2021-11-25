import React from 'react';
import { useQuery } from 'react-query'
import './App.css';
// components
import JobsTable from './Components/JobsTable/index';
import Loader from './Components/Loader/index';

function App() {
  const endpoint = "https://api.graphql.jobs/";
  const JOBS_QUERY = `
  {
    jobs {
      id,
      title,
      company {name}
      cities {name}
      countries {name}
      remotes {type}
    }
  }
  `
  const { isLoading, isError, data, error } = useQuery('jobs', () => {
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: JOBS_QUERY })
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Error fetching data");
        } else {
          return response.json();
        }
      })
      .then((data) => data.data);
  })

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div className="app">
      <h1 className="page-header">GraphQL jobs</h1>
      <JobsTable data={data.jobs} />
    </div>
  );
}

export default App;
