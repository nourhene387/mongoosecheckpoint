let mongoose = require('mongoose');
let validator = require('validator');

const server = 'localhost:27017';
const database = 'myDB';

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error', err);
      });
  }
}
const databaseCon = new Database()
databaseCon.connect()
// Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

/************ Create and Save a Record of a Model ************** */
// Create a new Person instance
let NEWPerson = new Person({
  name: 'John ',
  age: 30,
  favoriteFoods: ['Pizza', 'Pasta']
});

// Save the new person to the database
NEWPerson.save()
  .then(doc => {
    console.log('Document saved:', doc);
  })
  .catch(err => {
    console.error('Error saving document:', err);
  });

/********Create Many Records with model.create()************ */


// Array of new people (Ensure this name matches exactly)
const arrayOfPeople = [
  { name: 'Ali', age: 25, favoriteFoods: ['Salad', 'Sushi'] },
  { name: 'Sallah', age: 40, favoriteFoods: ['Burrito', 'Tacos'] },
  { name: 'Mohamed', age: 50, favoriteFoods: ['Salad', 'Spaghetti'] },
  { name: 'Adem', age: 12, favoriteFoods: ['Couscous', 'Salad'] }
];


/*Person.create(arrayOfNewPeople, function (err, data) {
  if (err) return console.error(err);
  console.log('Multiple people created:', data);

});*/

const createManyPeople = async () => {
  try {
    // Ensure you reference the correct variable name
    const data = await Person.create(arrayOfPeople);
    console.log('Multiple people created:', data);
  } catch (err) {
    console.error('Error creating multiple documents:', err);
  }
};

createManyPeople();

/****************Search Your Database by name ************** */
/*Person.find({ name: 'Ali' }, function(err, data) {
  if (err) return console.error(err);
  console.log('Found people:', data);
});*/

Person.find({ name: 'Sallah' })
  .then(people => {
    console.log('person found:', people);
  })
  .catch(err => {
    console.error('Error retrieving documents:', err);
  });
/*********************Search Your Database by favoriteFoods***************** */
Person.find({ favoriteFoods: ['Couscous', 'Salad'] })
  .then(people => {
    console.log('person found by favoriteFoods:', people);
  })
  .catch(err => {
    console.error('Error retrieving documents:', err);
  });
/******************************Search Your Database By _id************************** */


personId = '670cfee39cffc94a504afc5c';
Person.findById(personId)
  .then(person => {
    if (!person) {
      console.log('No person found with that ID');
    } else {
      console.log('Person found:', person);
    }
  })
  .catch(err => {
    console.error('Error retrieving person:', err);
  });
/********************Perform Classic Updates by Running Find, Edit, then Save******************* */
Person.findById(personId)
  .then(person => {
    if (!person) {
      console.log('No person found with that ID');
    } else {
      person.favoriteFoods.push('hamburger');
      person.save()
      console.log('Person updata:', person);
    }
  })
  .catch(err => {
    console.error('Error retrieving person:', err);
  });

/***********************New Updates on a Document Using model.findOneAndUpdate()***************** */
Person.findOneAndUpdate(

  {

    name: 'Sallah'

  },

  {

    age: 20
  },

  {

    new: true,                       // return updated doc

    runValidators: true              // validate before update

  })

  .then(doc => {

    console.log(doc)

  })

  .catch(err => {

    console.error(err)

  })
/*************Delete One Document Using model.findByIdAndRemove********* */

const id = '670d001daa5f1def151a556f';

Person
  .findOneAndDelete({ _id: id }) // Pass the ID as part of an object
  
  .then(response => {
    console.log('Removed person:', response);
  })
  .catch(err => {
    console.error('Error removing person:', err);
  });
  
  /*************************** */
  let newPerson = new Person({
    name: 'Mary ',
    age: 30,
    favoriteFoods: ['Pizza', 'Pasta']
  });
  
  // Save the new person to the database
  newPerson.save()
    .then(doc => {
      console.log('Document saved:', doc);
    })
    .catch(err => {
      console.error('Error saving document:', err);
    });
    /*********************************************** */
    const deleteManyByName = async (name) => {
      try {
        const result = await Person.remove({ name });
        console.log('Delete result:', result);
      } catch (err) {
        console.error('Error deleting documents:', err);
      }
    };
    
    deleteManyByName('Mary');