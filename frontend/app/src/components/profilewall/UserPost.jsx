import React, { Component } from 'react';

class UserPost extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="card-container">
        <div className="card-content">
          <div className="row">
            <div class="card-avatar"></div>
            <div className="profile-info">
              <h3>User</h3>
              <p>2h</p>
            </div>
          </div>
          <div className="row">
            <div className="post">Lorem Fuck it</div>
            <div className="reaction"></div>
            <div className="comments">
              <ul>
                <li>
                  <b>User</b>
                  "Hard Codeed"
                </li>
              </ul>
              <form>
                 <input type="text" class="form-control" placeholder="Add a comment"></input> 
              </form>
            </div>
          </div>
        </div>
        <div className="card-content">TabContent</div>
        <div className="card-content">TabContent</div>
      </div>
    );
  }
}

export default UserPost;
