import { useState, useEffect } from "react";
import "./App.css";

import UserInfo from "./components/UserInfo";
import RepoList from "./components/RepoList";
import RepoDetails from "./components/RepoDetails";

const USERNAME = "Nasirkhan294";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [loading, setLoading] = useState({
    user: false,
    repos: false,
    details: false,
  });
  const [error, setError] = useState(null);

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading((loading) => ({ ...loading, user: true }));
        const res = await fetch(`https://api.github.com/users/${USERNAME}`);
        if (!res.ok) throw new Error("Failed to fetch user profile");
        const data = await res.json();
        setUser(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading((loading) => ({ ...loading, user: false }));
      }
    };
    fetchUser();
  }, []);

  // fetch repos
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading((loading) => ({ ...loading, repos: true }));
        const res = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?sort=update&per_page=100`
        );
        if (!res.ok) throw new Error("Failed to fetch repositories");
        const data = await res.json();
        setRepos(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading((loading) => ({ ...loading, repos: false }));
      }
    };
    fetchRepos();
  }, []);

  const getRepoInfo = async (repoName) => {
    try {
      setLoading((loading) => ({ ...loading, details: true }));
      setError(null);
      const res = await fetch(
        `https://api.github.com/repos/${USERNAME}/${repoName}`
      );
      if (!res.ok) throw new Error("Failed to fetch repository details");
      const repoInfo = await res.json();

      const langRes = await fetch(repoInfo.languages_url);
      if (!langRes.ok) throw new Error("Failed to fetch languages");
      const langData = await langRes.json();
      const languages = Object.keys(langData);

      setSelectedRepo({ ...repoInfo, languages });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading((loading) => ({ ...loading, details: false }));
    }
  };

  return (
    <main className="container">
      <div className="badge">
        <div className="circle"></div>
      </div>
      <h1>
        <i className="fab fa-github-alt"></i> Github Repo Gallery
      </h1>

      {error && (
        <p
          style={{
            color: "#c0392b",
            background: "#fdecea",
            padding: "0.75rem 1rem",
            borderRadius: 8,
          }}
        >
          {error}
        </p>
      )}

      {loading.user && <p>Loading profile</p>}
      <UserInfo user={user} />

      {!selectedRepo && (
        <>
          {loading.repos && <p>Loading repositories...</p>}
          <RepoList
            repos={repos}
            filter={filter}
            onFilterChange={setFilter}
            onSelect={getRepoInfo}
          />
        </>
      )}

      {selectedRepo && (
        <RepoDetails repo={selectedRepo} onBack={() => setSelectedRepo(null)} />
      )}
    </main>
  );
}

export default App;
