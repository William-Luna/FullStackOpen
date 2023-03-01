import { useState, useEffect } from 'react'
import DisplayPersons from './components/DisplayPersons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterInput, setFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageStatus, setMessageStatus] = useState(true); //success : error

  useEffect(() => {
    personService.getAll()
      .then(allPersons => {
        console.log('Promise Resolved All Numbers');
        setPersons(allPersons);
      }).catch(error => {
        setMessageStatus(false);
        setMessage(`Error retrieving all numbers. (${error})`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
  }, [])

  const addPerson = (e) => {
    e.preventDefault();

    for (const p of persons) {
      if (newName === p.name) {
        //alert(`${newName} is already added to phonebook.`);
        if (window.confirm(`${newName} already exists in the phonebook. Would you like to replace the old phone number with this new one?`)) {
          const editPersonObj = { name: newName, number: newNum };
          personService.update(p.id, editPersonObj)
            .then(updatedPerson => {
              console.log('Promise resolved. Updated person')
              setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson));
              setNewName('');
              setNewNum('');
              setMessageStatus(true);
              setMessage(`Updated number of ${updatedPerson.name}`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            }).catch(error => {
              setPersons(persons.filter(p => p.name !== editPersonObj.name));
              setMessageStatus(false);
              setMessage(`This number has already been deleted from the server. (${error})`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            });
          return;
        }
      }
    }

    const newPersonObj = { name: newName, number: newNum };
    personService.create(newPersonObj)
      .then(newPerson => {
        console.log('Promise resolved. Added person')
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNum('');
        setMessageStatus(true);
        setMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }).catch(error => {
        setMessageStatus(false);
        setMessage(`Error adding number. (${error})`);
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      });
  }


  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id);
    if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
      personService.del(personToDelete.id)
        .then(deletedPerson => {
          console.log('Promise resolved. Person removed');
          setPersons(persons.filter(p => p.id !== id));
        }).catch(error => console.log(`failure: ${error} `));
    }
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value !== '') setShowAll(false);
    else setShowAll(true);
  }

  //filter function
  const personsFilter = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filterInput.toLowerCase()));

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <Notification message={message} status={messageStatus} />
      <Filter filterInput={filterInput} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} name={newName} num={newNum} handleName={handleNameChange} handleNum={handleNumChange} />
      <h2>Numbers</h2>
      <DisplayPersons Persons={personsFilter} delOnClick={deletePerson} />
    </div>
  )
}

export default App