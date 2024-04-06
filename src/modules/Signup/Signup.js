import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import "./Signup.css"
function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    // For now, just log the formData to the console
    console.log(formData);

    // Here you might send formData to a backend server, etc.
    // Reset the form if needed
    // setFormData({
    //   username: '',
    //   phone: '',
    //   email: '',
    //   password: '',
    // });
  };

  return (
    <div>
      <Navbar />
      <div className='signuppage'>
        <div className='pluspts'>
          <div className='ptsbox'>
            <div className='box-head'>
              <h1>Benefits of being a member</h1>
            </div>
            <div className='pts'> 
            <ul>
              <li>
              Find something to watch on your subscribed streaming services
              </li>
              <li>Log the movies and TV shows you have watched</li>
              <li>Keep track of your favourite movies and TV shows and get recommendations from them</li>
              <li>Build and maintain a personal watchlist</li>
              <li>Build custom mixed lists (movies and TV)</li>
              <li>Take part in movie and TV discussions</li>
              <li>Contribute to, and improve the information in our database</li>
            </ul>
            </div>
          </div>

        </div>

      <div className="signup-container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Signup;
