const { User, Thought } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('saveBooks');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },

        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('saveBooks');
        }
    },

    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
            const book = await Book.create({ ...args, bookId, authors: authors, description: description, title: title, image: image, link: link });

            await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { saveBook: book } },
                { new: true }
            );
            return book;
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const book = await Book.deleteOne(
                    { bookId: bookId },
                    { new: true }
                )
                return book;
            }
            throw new AuthenticationError('Book has been removed');
        }
    }
};

module.exports = resolvers;