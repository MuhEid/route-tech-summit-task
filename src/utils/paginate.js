export const pagination = ({ page = 1, size = 10 }) => {
    if (page < 1) page = 1;
    if (size < 1) size = 1;

    const limit = +size;
    const skip = (+page - 1) * limit;

    return { limit, skip };
};
