import React from "react";

function RepoList({ repos, filter, onFilterChange, onSelect }) {
  return (
    <section className="repos">
      <input
        type="text"
        className="filter-repos"
        placeholder="Search by name"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
      <ul className="repo-list">
        {repos
          .filter((repo) => repo.name.toLowerCase().includes(filter.toLowerCase()))
          .map((repo) => (
            <li key={repo.id} className="repo">
              <h3 onClick={() => onSelect(repo.name)}>{repo.name}</h3>
            </li>
          ))}
      </ul>
    </section>
  );
}

export default RepoList;
