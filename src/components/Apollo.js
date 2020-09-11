import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      likeMovie: (_, { id }, { cache }) => {
        const {
          data: {
            data: {
              [`Movie:${id}`]: { isLiked },
            },
          },
        } = cache;

        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: isLiked ? false : true,
          },
        });
      },
    },
  },
});

export default client;
