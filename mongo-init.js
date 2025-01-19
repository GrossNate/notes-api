db.createUser({
  user: 'notes',
  pwd: 'P4ssw0rd',
  roles: [
    {
      role: 'dbOwner',
      db: 'notes',
    },
  ],
});

db.createCollection('notes');
