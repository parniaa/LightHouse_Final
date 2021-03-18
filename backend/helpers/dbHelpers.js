module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: "SELECT * FROM users",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getLocations = () => {
    const query = {
      text: "SELECT * FROM locations",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getServices = () => {
    const query = {
      text: "SELECT * FROM services",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getServicesByValue = (value) => {
    const query = {
      text: `SELECT * FROM services where title LIKE '%${value}%' `,
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getavailabilities = () => {
    const query = {
      text: "SELECT * FROM availabilities",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getAppointments = () => {
    const query = {
      text: "SELECT * FROM appointments",
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getUserByEmail = (email) => {
    const query = {
      text: `SELECT * FROM users WHERE email = $1`,
      values: [email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };
  const getUserById = (id) => {
    const query = {
      text: `SELECT * FROM users WHERE id = $1`,
      values: [id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (full_name, email) => {
    const query = {
      text: `INSERT INTO users (full_name, email) VALUES ($1, $2) RETURNING *`,
      values: [full_name, email],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addService = (title, category, description, fee) => {
    const query = {
      text: `INSERT INTO services (title, category, description, fee) VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [title, category, description, fee],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addAppointment = (
    title,
    rating,
    isConfirmed,
    users_id,
    start_date,
    end_date
  ) => {
    const query = {
      text: `INSERT INTO appointments (title, rating, isConfirmed, users_id, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $5) RETURNING *`,
      values: [title, rating, isConfirmed, users_id, start_date, end_date],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addAvailability = (users_id, start_time, end_time) => {
    const query = {
      text: `INSERT INTO availabilities (users_id, start_time, end_time) VALUES ($1, $2, $3) RETURNING *`,
      values: [users_id, start_time, end_time],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getUserLocation = (id) => {
    const query = {
      text: `SELECT * FROM locations WHERE user_id = ${id}`,
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getAvailabilitiesByUserId = (id) => {
    const query = {
      text: `SELECT * FROM availabilities WHERE users_id = ${id}`,
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getAppointmentsByUserId = (id) => {
    const query = {
      text: `SELECT * FROM appointments WHERE users_id = ${id}`,
    };
    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const addLocation = (
    full_address,
    city,
    postal_code,
    country,
    lat,
    long,
    user_id
  ) => {
    const query = {
      text: `INSERT INTO locations (full_address, city, postal_code, country, lat, long, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      values: [full_address, city, postal_code, country, lat, long, user_id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getUsersPosts = () => {
    const query = {
      text: `SELECT users.id as user_id, first_name, last_name, email, posts.id as post_id, title, content
      FROM users
      INNER JOIN posts
      ON users.id = posts.user_id`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  return {
    getUsers,
    getLocations,
    getUserLocation,
    getServices,
    getServicesByValue,
    getavailabilities,
    getAvailabilitiesByUserId,
    getAppointmentsByUserId,
    getAppointments,
    getUserByEmail,
    getUserById,
    addUser,
    addService,
    addAvailability,
    getUsersPosts,
    addAppointment,
    addLocation,
  };
};
