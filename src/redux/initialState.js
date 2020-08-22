export const initialState = {
  posts: {
    data: [
      // {
      //   id: 1,
      //   title: 'parasol ogrodowy',
      //   content: 'sprzedam parasol ogrodowy',
      //   dateOfPublication: '10.08.2020',
      //   updateDate: '18.08.2020',
      //   email: 'john@gmail.com',
      //   status: 'published',
      //   photo: '',
      //   price: 600,
      //   userId: 'user1',
      // },
      // {
      //   id: 2,
      //   title: 'pralka frania',
      //   content: 'sprzedam prehistoryczna pralke franie',
      //   dateOfPublication: '01.08.2020',
      //   updateDate: '18.08.2020',
      //   email: 'adam@gmail.com',
      //   status: 'published',
      //   photo: '',
      //   price: 500,
      //   userId: 'user2',
      // },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  users: [
    {
      id: 'user1',
      logged: true,
      admin: false,
    },
    {
      id: 'user3',
      logged: true,
      admin: true,
    },
  ],
  currentUser: 
    {
      id: 'user1',
    },
};
