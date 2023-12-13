// Takes an error as its first argument, checks if it's the NotFoundError class.
const notFoundErrorHandler = (err, req, res, next) => {
    if (err.name === "NotFoundError") {
        return res.status(404).json({ message: err.message });
    }

    // Passes the NotFoundError to the next middleware in the chain.
    next(err);
};

export default notFoundErrorHandler;