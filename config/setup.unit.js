// Node Module Mocks
jest.mock("uuid", () => () => "1d6aae05-9458-4341-a4aa-46783e7c5ca5");

// Mongoose Mocks
jest.mock("mongoose", () => {
    // This looks weird, but there's a mix of both static and public methods
    // on mongoose. Creating a mock class doesn't work well with jest.fn()
    const mockMongoose = {
        save: jest.fn(() => mockMongoose),
        findOneAndUpdate: jest.fn(() => mockMongoose),
    };

    const mockModel = function mockModel() {
        return mockMongoose;
    };

    mockModel.save = mockMongoose.save;
    mockModel.findOneAndUpdate = mockMongoose.findOneAndUpdate;

    return {
        Schema: jest.fn(() => ({
            pre: jest.fn(),
        })),

        model: jest.fn(() => mockModel),
    };
});

export const expressApp = {
    delete: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    use: jest.fn(),
};

export const response = {
    send: jest.fn(),
    sendStatus: jest.fn(),
};
