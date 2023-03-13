const userData = [
    {
      username: 'alice',
      email: 'alice@example.com',
      thoughts: []
    },
    {
      username: 'bob',
      email: 'bob@example.com',
      thoughts: []
    },
    {
      username: 'charlie',
      email: 'charlie@example.com',
      thoughts: []
    }
  ];
  
  const thoughtData = [
    {
      thoughtText: "This is Alice's first thought",
      username: 'alice',
      reactions: [
        {
          reactionBody: '😂',
          username: 'bob'
        },
        {
          reactionBody: '😍',
          username: 'charlie'
        }
      ]
    },
    {
      thoughtText: "This is Bob's first thought",
      username: 'bob',
      reactions: [
        {
          reactionBody: '👍',
          username: 'alice'
        }
      ]
    },
    {
      thoughtText: "This is Charlie\'s first thought",
      username: 'charlie',
      reactions: []
    }
  ];
  

  module.exports = {
    userData,
    thoughtData
  };