import { authenticate } from "./auth.controller";

let mockRequest = {
    body: {
        emailAddress: "alex-charlton@live.co.uk",
        password: "Password123#"
    }
};

let mockResponse = {};

describe("Auth Controller", () => {
    describe("Authenticate", () => {
        it("Should be called with the correct request", () => {
            const jwt = authenticate(mockRequest, mockResponse);
            // authenticate.prototype.findOne = jest.fn();

            // console.log("jwt", jwt);

            expect(authenticate).toBeCalledWith(mockRequest, mockResponse);

            // expect(jwt).toEqual(true);
        });
    });

    // TODO: Other endpoints
});
