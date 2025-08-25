import React from "react";

function UserInfo({ user }) {
  if (!user) return null;
  return (
    <section className="intro">
      <div className="overview">
        <div className="user-info">
          <figure>
            <img src={user.avatar_url} alt="user avatar" />
          </figure>
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Bio:</strong> {user.bio}
            </p>
            <p>
              <strong>Location:</strong> {user.location}
            </p>
            <p>
              <strong>Number of public repos:</strong> {user.public_repos}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default UserInfo;
