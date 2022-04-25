const CustomError = require('../errors');

const checkPermissions = (requestUser, resorceUserId) => {
  // console.log(requestUser);
  // console.log(resorceUserId);
  // console.log(typeof resorceUserId);
  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resorceUserId.toString()) return;
  throw new CustomError.UnauthorizedError('Not authorized to access this route');
};

module.exports = checkPermissions;
