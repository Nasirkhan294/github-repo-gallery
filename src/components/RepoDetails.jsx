import React from "react";

function RepoDetails({ repo, onBack }) {
  if (!repo) return null;
  return (
    <>
      <section className="repo-data">
        <div>
          <h3>Name: {repo.name}</h3>
          <p>Description: {repo.description}</p>
          <p>Default Branch: {repo.default_branch}</p>
          <p>Languages: {(repo.languages || []).join(", ")}</p>
          <a
            className="visit"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer noopener"
          >
            View Repo on GitHub!
          </a>
        </div>
      </section>
      <div className="button-container">
        <button className="view-repos" onClick={onBack}>
          Back to Repo Gallery
        </button>
      </div>
    </>
  );
}

export default RepoDetails;
