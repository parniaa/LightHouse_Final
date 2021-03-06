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
  const getCategories = () => {
    const query = {
      text: "SELECT * FROM categories",
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

  const addService = (title, category, description, fee, user_id) => {
    const query = {
      text: `INSERT INTO services (title, category, description, fee, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      values: [title, category, description, fee, user_id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };
  // title,
  // rating,
  // isConfirmed,
  // st_date,
  // end_date,
  // services_id,
  // availabilities_id,
  // users_id,

  const addAppointment = (
    title,
    rating,
    isconfirmed,
    st_date,
    end_date,
    services_id,
    availabilities_id,
    users_id
  ) => {
    const query = {
      text: `INSERT INTO appointments (title, rating, isconfirmed, st_date, end_date, services_id, availabilities_id, users_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      values: [
        title,
        rating,
        isconfirmed,
        st_date,
        end_date,
        services_id,
        availabilities_id,
        users_id,
      ],
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
      text: `SELECT * FROM appointments WHERE users_id = ${id} and isconfirmed = true`,
    };
    return db
      .query(query)
      .then((result) => result.rows)
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
  const getServicesByUserId = (id) => {
    const query = {
      text: `SELECT * FROM services WHERE user_id = $1`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getAppForProvider = (id) => {
    const query = {
      text: `
      SELECT appointments.title,
      appointments.isconfirmed as isconfirmed,
      appointments.id as appointment_id,
      appointments.services_id as service_id,
      appointments.created_at as create_time,
      appointments.users_id as client_id,
      appointments.st_date as start_time,
      appointments.end_date as end_time
      FROM appointments
      JOIN services ON services.id = services_id
      WHERE services.user_id = $1
      ORDER BY appointments.created_at DESC`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => console.log(err));
  };

  const updateUserPhoto = (photo, id) => {
    const query = {
      text: `UPDATE users
      SET photo = $1
      WHERE users.id = $2`,
      values: [photo, id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };
  const setIsConfirm = (status, id) => {
    const query = {
      text: `UPDATE appointments
      SET isConfirmed = $1
      WHERE id = $2`,
      values: [status, id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };
  const updateUserProviderStatus = (status, id) => {
    const query = {
      text: `UPDATE users
      SET isServiceProvider = $1
      WHERE users.id = $2`,
      values: [status, id],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getUsers,
    getLocations,
    getCategories,
    getUserLocation,
    getServices,
    getServicesByValue,
    getServicesByUserId,
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
    updateUserPhoto,
    updateUserProviderStatus,
    getAppForProvider,
    setIsConfirm,
  };
};
