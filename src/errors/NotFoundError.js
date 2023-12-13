// Constructs a child class 'NotFoundError' of parent class 'Error'. 
class NotFoundError extends Error {
    constructor(resourceType, id) {
        super(`${resourceType} with id ${id} not found.`);
        this.name = "NotFoundError";
    }
};

export default NotFoundError;