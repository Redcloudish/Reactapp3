// src/components/ContactManager.js (for Twitter replacement app)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactManager() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [error, setError] = useState('');

  const loggedInUser = localStorage.getItem('loggedInUser'); // Assuming it's stored after login

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    } else {
      // Fetch followers/friends from the PHP backend
      const fetchContacts = async () => {
        try {
          const response = await axios.get(`http://localhost/api/contacts.php?user=${loggedInUser}`);
          setContacts(response.data.contacts); // Assuming 'contacts' contains an array of followers/friends
        } catch (error) {
          setError('Error fetching contacts.');
        }
      };
      fetchContacts();
    }
  }, [loggedInUser, navigate]);

  const handleAddContact = async () => {
    if (!newContactName || !newContactEmail) {
      setError('Please provide both name and email for the contact.');
      return;
    }

    try {
      // Add a new follower/friend via the backend
      const response = await axios.post('http://localhost/api/add_contact.php', { 
        user: loggedInUser, 
        name: newContactName, 
        email: newContactEmail 
      });

      if (response.data.success) {
        // Refresh the contact list (followers/friends)
        setContacts(prevContacts => [...prevContacts, { name: newContactName, email: newContactEmail }]);
        setNewContactName('');
        setNewContactEmail('');
        setError('');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error adding contact.');
    }
  };

  return (
    <div className="container">
      <h2>Manage Contacts (Followers/Friends)</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="contactName" className="form-label">Contact Name</label>
        <input 
          type="text" 
          className="form-control" 
          id="contactName" 
          placeholder="Enter contact's name" 
          value={newContactName}
          onChange={(e) => setNewContactName(e.target.value)} 
        />
      </div>

      <div className="mb-3">
        <label htmlFor="contactEmail" className="form-label">Contact Email</label>
        <input 
          type="email" 
          className="form-control" 
          id="contactEmail" 
          placeholder="Enter contact's email"
          value={newContactEmail}
          onChange={(e) => setNewContactEmail(e.target.value)} 
        />
      </div>

      <button onClick={handleAddContact} className="btn btn-primary">Add Contact</button>

      <h3 className="mt-4">My Contacts (Followers/Friends)</h3>
      <ul className="list-group mt-3">
        {contacts.map((contact, index) => (
          <li key={index} className="list-group-item">
            <strong>{contact.name}</strong> - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContactManager;
