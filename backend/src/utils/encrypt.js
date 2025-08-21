const bcrypt = require('bcryptjs');
exports.hash = async (password) => bcrypt.hash(password, 10);
exports.compare = async (password, hash) => bcrypt.compare(password, hash);