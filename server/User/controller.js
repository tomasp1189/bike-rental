import axios from 'axios';

import { httpStatusCodes } from '../errors/httpStatusCodes';
import services from './services';

// errors are handled in errorHandler middleware. No need for try/catch blocks
const ROLES = ['rol_3df3Oew6DebXJgTK', 'rol_hEW39wdBWRpaxw0u'];
const contentType = 'application/json';

const create = async (req, res) => {
  const config = {
    method: 'POST',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`,
    headers: {
      Authorization: `Bearer ${process.env.AUTH0_ACCESS_TOKEN}`,
      'content-type': contentType,
    },
    data: {
      given_name: req.body.name,
      family_name: req.body.lastName,
      email: req.body.email,
      password: 'Manager1234',
      connection: 'Username-Password-Authentication',
    },
  };

  const response = await axios(config);

  const role = ROLES.includes(req.body.role)
    ? req.body.role
    : 'rol_3df3Oew6DebXJgTK';
  const configRoles = {
    method: 'POST',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${response.data.user_id}/roles`,
    headers: { Authorization: `Bearer ${process.env.AUTH0_ACCESS_TOKEN}` },
    data: {
      // if no role is provided or it isn't in the list of admited roles I default to User
      roles: [role],
    },
  };

  await axios(configRoles);

  res
    .status(httpStatusCodes.CREATED)
    .json({ success: true, data: response.data });
};
const update = async (req, res) => {
  const data = {};
  if (req.body.name) data.given_name = req.body.name;
  if (req.body.lastName) data.family_name = req.body.lastName;
  if (req.body.email) data.email = req.body.email;

  const config = {
    method: 'PATCH',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${req.query.id}`,
    headers: {
      Authorization: `Bearer ${process.env.AUTH0_ACCESS_TOKEN}`,
      'content-type': contentType,
    },
    data,
  };

  const response = await axios(config);

  // TODO: Add role update. For now, I will assume roles can not be modified.
  // const role = ROLE.includes(req.body.role) && req.body.role;
  // if (role) {
  //   const configRoles = {
  //     method: 'POST',
  //     url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${req.query.id}/roles`,
  //     headers: { Authorization: `Bearer ${process.env.AUTH0_ACCESS_TOKEN}` },
  //     data: {
  //       // if no role is provided or it isn't in the list of admited roles I default to User
  //       roles: [role],
  //     },
  //   };

  //   await axios(configRoles);
  // }
  res.status(httpStatusCodes.OK).json({ success: true, data: response.data });
};
const deleteUser = async (req, res) => {
  const config = {
    method: 'DELETE',
    url: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${req.query.id}`,
    headers: {
      Authorization: `Bearer ${process.env.AUTH0_ACCESS_TOKEN}`,
      'content-type': contentType,
    },
  };
  // TODO: instead of permanent deletion, use a flag.
  // Alternative would be to cancel all reservations associated with user.
  await axios(config);

  res.status(httpStatusCodes.OK).json({ success: true });
};
const all = async (req, res) => {
  const response = await services.getAllUsers();

  return res
    .status(httpStatusCodes.OK)
    .json({ success: true, data: response.data });
};

export default {
  create,
  all,
  update,
  deleteUser,
};
