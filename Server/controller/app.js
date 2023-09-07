/*
    Class: DIT/FT/1B/10
    Admission Number: P2243605
    Name: Tan Yong Kit, Eden
*/

const cors = require("cors");
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("../config");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

//Controllers
const ActorsController = require("../models/actors.js");
const CustomerController = require("../models/customer.js");
const AddressController = require("../models/address.js");
const FilmController = require("../models/film.js");
const FilmCategoriesController = require("../models/film_Categories.js");
const StaffController = require("../models/staff.js");

//Login
const auth = require("../auth/verifyFunc.js");

//Get Film Actors
app.get("/film/actors/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid Film ID" });
    return;
  }
  ActorsController.getActorsFromFilm({ film_id: id }, (err, actorsData) => {
    if (err) {
      res.status(500).json(err.statusCode);
      return;
    } else {
      res.status(200).json(actorsData);
      return;
    }
  });
});

//Get Film Category Names
app.get("/film/categories", (req, res) => {
  FilmController.getAllFilmCategoryName((err, categories) => {
    if (err) {
      console.log("Error while fetching categories");
      res.status(500).json(err);
      return;
    } else {
      res.status(200).json(categories);
      return;
    }
  });
});

//Get Film Details By Film ID
app.get("/film/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid Film ID" });
    return;
  }
  FilmController.getFilmByID({ id }, (err, film) => {
    if (err) {
      res.status(500).json(err.statusCode);
      return;
    } else {
      res.status(200).json(film);
      return;
    }
  });
});

//Get Film Languages
app.get("/filmLanguage", (req, res) => {
  FilmController.getFilmLanguage((err, languages) => {
    if (err) {
      res.status(500).json(err.statusCode);
      return;
    } else {
      res.status(200).json(languages);
      return;
    }
  });
});

//Get FIlm By Name and Filter By Price
app.get("/film", (req, res) => {
  let title = req.query.title;
  let max_price = req.query.max_price || 1000000;

  if (title == undefined) {
    res.status(400).json({ error: "Invalid Film Title" });
    return;
  }

  FilmController.getFilmByNameFilterPrice(
    { title, max_price },
    (err, films) => {
      if (err) {
        res.status(500).json(err.statusCode);
        return;
      } else {
        res.status(200).json(films);
        return;
      }
    }
  );
});

//Get All Cities
app.get("/cities", (req, res) => {
  AddressController.getCities((err, cities) => {
    if (err) {
      res.status(500).json(err.statusCode);
      return;
    } else {
      res.status(200).json(cities);
      return;
    }
  });
});

//Get customer by email
app.get("/customerList", (req, res) => {
  let email = req.query.email;
  CustomerController.getCustomerByEmail({ email }, (err, customer) => {
    if (err) {
      res.status(500).json(err.statusCode);
      return;
    } else {
      res.status(200).json(customer);
      return;
    }
  });
});

//Get customer address by customer id
app.get("/customerAddress/:id", (req, res) => {
  let customer_id = req.params.id;

  if (isNaN(customer_id)) {
    res.status(400).json({ error: "Invalid Customer ID" });
    return;
  }

  AddressController.getAddress({ customer_id }, (err, address) => {
    if (err) {
      res.status(500).json(err.statusCode);
      return;
    } else {
      res.status(200).json(address);
      return;
    }
  });
});

//Get Store Address
app.get("/storeAddress", (req, res) => {
  AddressController.getStoreAddress((err, address) => {
    if (err) {
      res.status(500).json(err.statusCode);
      return;
    } else {
      res.status(200).json(address);
      return;
    }
  });
});

//Add New Film
app.post("/film", auth.verifyToken, auth.verifyAdmin, (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let release_year = req.body.release_year;
  let language_id = req.body.language_id;
  let rental_duration = req.body.rental_duration;
  let rental_rate = req.body.rental_rate;
  let length = req.body.length;
  let replacement_cost = req.body.replacement_cost;
  let rating = req.body.rating;
  let special_features = req.body.special_features;

  if (
    title == undefined ||
    description == undefined ||
    release_year == undefined ||
    language_id == undefined ||
    rental_duration == undefined ||
    rental_rate == undefined ||
    length == undefined ||
    replacement_cost == undefined ||
    rating == undefined ||
    special_features == undefined
  ) {
    res.status(400).json({ error: "Invalid Film Data" });
    return;
  }

  FilmController.addNewFilm(
    {
      title,
      description,
      release_year,
      language_id,
      rental_duration,
      rental_rate,
      length,
      replacement_cost,
      rating,
      special_features,
    },
    (err, film) => {
      if (err) {
        res.status(500).json(err.statusCode);
        return;
      } else {
        res.status(200).json(film.insertId);
        return;
      }
    }
  );
});

//Add Film Image
app.post(
  "/filmImage/:id",
  auth.verifyToken,
  auth.verifyAdmin,
  upload.single("filmImage"),
  (req, res) => {
    let film_id = req.params.id;
    let image = req.body.image;

    if (isNaN(film_id)) {
      res.status(400).json({ error: "Invalid Film ID" });
      return;
    }

    FilmController.addFilmImage({ film_id, image }, (err, film) => {
      if (err) {
        res.status(500).json(err.statusCode);
        return;
      } else {
        res.status(200).json(film);
        return;
      }
    });
  }
);

//Login Endpoint
app.post("/staff/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username == undefined || password == undefined) {
    res.status(400).json({ error: "Invalid Username or Password" });
    return;
  }

  StaffController.staffLogin({ username, password }, (err, staff) => {
    if (err) {
      res.status(500).json(err.statusCode);
      return;
    } else {
      // if Theres a staff (or if a record is found)
      if (staff.length > 0) {
        if (staff[0].role == "Admin") {
          // Generate token
          const token = jwt.sign(
            { id: staff[0].staff_id, role: staff[0].role },
            config.key,
            {
              expiresIn: 86400, // expires in 24 hours
            }
          );

          // Return staff details + token
          return res.status(200).json({
            ...staff[0],
            token,
          });
        } else {
          return res.status(403).json({ message: "You are not an Admin!" });
        }
      } else {
        return res
          .status(403)
          .json({ message: "Username or Password is Incorrect" });
      }
    }
  });
});

//Endpoint 1: Get /actors/{actor_id}
app.get("/actors/:actor_id", (req, res) => {
  const actor_id = req.params.actor_id;
  ActorsController.getActor({ actor_id }, (err, actors) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error_msg: "Internal server error" });
      return;
    } else {
      if (actors.length === 0) {
        res.status(204).end();
        return;
      } else {
        res.status(200).json(actors);
        return;
      }
    }
  });
});

//Endpoint 2: Get /actors
app.get("/actors", (req, res) => {
  let limit = parseInt(req.query.limit || 20);
  let offset = parseInt(req.query.offset || 0);
  ActorsController.getAllActors({ limit, offset }, (err, actors) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error_msg: "Internal server error" });
      return;
    } else {
      res.status(200).json(actors);
      return;
    }
  });
});

//Endpoint 3: Post /actors (admin)
app.post("/actors", auth.verifyToken, auth.verifyAdmin, (req, res) => {
  let first_name = req.body.first_name || null;
  let last_name = req.body.last_name || null;
  if (first_name == null || last_name == null) {
    res.status(400).json({ error_msg: "missing data" });
    return;
  }
  ActorsController.addActor({ first_name, last_name }, (err, actors) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error_msg: "Internal server error" });
      return;
    } else {
      res.status(201).json({ actor_id: actors.insertId + "" });
      return;
    }
  });
});

//Endpoint 4: Put /actors/{actor_id}
app.put("/actors/:actor_id", (req, res) => {
  const actor_id = req.params.actor_id;
  let first_name = req.body.first_name || null;
  let last_name = req.body.last_name || null;
  if (first_name == null && last_name == null) {
    res.status(400).json({ error_msg: "missing data" });
    return;
  } else {
    ActorsController.getActor({ actor_id }, (err, actors) => {
      if (err) {
        res.status(500).json({ error_msg: "Internal server error" });
        return;
      } else {
        if (!actors || actors.length === 0) {
          res.status(204).end();
          return;
        } else {
          let f_name = first_name || actors[0].first_name;
          let l_name = last_name || actors[0].last_name;
          ActorsController.updateActor(
            { actor_id, first_name: f_name, last_name: l_name },
            (err) => {
              if (err) {
                res.status(500).json({ error_msg: "Internal server error" });
                return;
              } else {
                res.status(200).json({ success_msg: "record updated" });
                return;
              }
            }
          );
        }
      }
    });
  }
});

//Endpoint 5: Delete /actors/{actor_id}
app.delete("/actors/:actor_id", (req, res) => {
  const actor_id = req.params.actor_id;
  ActorsController.deleteActor({ actor_id }, (err, actors) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error_msg: "Internal server error" });
      return;
    } else {
      if (actors.affectedRows == 0) {
        res.status(204).end();
        return;
      } else {
        res.status(200).json({ success_msg: "actor deleted" });
        return;
      }
    }
  });
});

//Endpoint 6: Get /film_categories/{category_id}/films (public)
app.get("/film_categories/:category_id/films", (req, res) => {
  const category_id = req.params.category_id;
  FilmCategoriesController.getAllFilmCategories(
    { category_id },
    (err, films) => {
      if (err) {
        res.status(500).json({ error_msg: "Internal server error" });
        return;
      } else {
        res.status(200).json(films);
        return;
      }
    }
  );
});

//Endpoint 7: Get /customer/{customer_id}/payment
app.get("/customer/:customer_id/payment", (req, res) => {
  const customer_id = req.params.customer_id;
  let start_date = req.query.start_date || null;
  let end_date = req.query.end_date || null;
  let total = 0;

  if (start_date == null || end_date == null) {
    res.status(400).json({ error_msg: "missing data" });
    return;
  }

  CustomerController.getCustomerPayment(
    { customer_id, start_date, end_date },
    (err, rental) => {
      if (err) {
        res.status(500).json({ error_msg: "Internal server error" });
        return;
      } else {
        if (rental.length === 0) {
          res.status(200).json({
            rental: rental,
            total: total + "",
          });
          return;
        } else {
          for (let i = 0; i < rental.length; i++) {
            total += parseFloat(rental[i].amount);
          }
          total = total.toFixed(2).toString();
          res.status(200).json({
            rental: rental,
            total: total,
          });
          return;
        }
      }
    }
  );
});

//Endpoint 8: Post /customers (admin)
app.post("/customers", auth.verifyToken, auth.verifyAdmin, (req, res) => {
  const {
    store_id,
    first_name,
    last_name,
    email,
    address: {
      address_line1,
      address_line2,
      district,
      city_id,
      postal_code,
      phone,
    },
  } = req.body;

  let storeID = req.body.store_id || null;
  let firstName = req.body.first_name || null;
  let lastName = req.body.last_name || null;
  let emailAddr = req.body.email || null;
  let addressLine1 = req.body.address.address_line1 || null;
  let districtNum = req.body.address.district || null;
  let cityID = req.body.address.city_id || null;
  let postalCode = req.body.address.postal_code || null;
  let phoneNum = req.body.address.phone || null;

  if (
    storeID == null ||
    firstName == null ||
    lastName == null ||
    emailAddr == null ||
    addressLine1 == null ||
    districtNum == null ||
    cityID == null ||
    postalCode == null ||
    phoneNum == null
  ) {
    res.status(400).json({ error_msg: "missing data" });
    return;
  }

  AddressController.addAddress(
    { address_line1, address_line2, district, city_id, postal_code, phone },
    (err, address) => {
      if (err) {
        res.status(500).json({ error_msg: "Internal server error" });
        return;
      } else {
        const address_id = address.insertId;

        CustomerController.addCustomer(
          { store_id, first_name, last_name, email, address_id },
          (err, customer) => {
            if (err) {
              AddressController.deleteAddress({ address_id }, (err) => {
                if (err) {
                  console.log(err);
                  return;
                }
              });
              const errNum = err.errno;
              if (errNum == 1062) {
                res.status(409).json({ error_msg: "email already exist" });
                return;
              } else {
                console.log(err);
                res.status(500).json({ error_msg: "Internal server error" });
                return;
              }
            } else {
              res.status(201).json({ customer_id: customer.insertId + "" });
              return;
            }
          }
        );
      }
    }
  );
});

//Endpoint 9: Put /customer/{customer_id}/address
app.put(
  "/customers/:customer_id/address",
  auth.verifyToken,
  auth.verifyAdmin,
  (req, res) => {
    const customer_id = req.params.customer_id;

    let address_line1 = req.body.address_line1 || null;
    let address_line2 = req.body.address_line2 || null;
    let district = req.body.district || null;
    let city_id = req.body.city_id || null;
    let postal_code = req.body.postal_code || null;
    let phone = req.body.phone || null;

    if (
      address_line1 == null &&
      district == null &&
      city_id == null &&
      postal_code == null &&
      phone == null
    ) {
      res.status(400).json({ error_msg: "missing data" });
      return;
    }

    AddressController.getAddress({ customer_id }, (err, address) => {
      if (err) {
        res.status(500).json({ error_msg: "Internal server error" });
        return;
      } else {
        if (!address || address.length === 0) {
          res.status(204).end();
          return;
        } else {
          let addr_line1 = address_line1 || address[0].address;
          let addr_line2 = address_line2 || address[0].address2;
          let district_num = district || address[0].district;
          let city_id_num = city_id || address[0].city_id;
          let postal_code_num = postal_code || address[0].postal_code;
          let phone_num = phone || address[0].phone;

          AddressController.updateAddress(
            {
              address_line1: addr_line1,
              address_line2: addr_line2,
              district: district_num,
              city_id: city_id_num,
              postal_code: postal_code_num,
              phone: phone_num,
              customer_id,
            },
            (err, address) => {
              if (err) {
                console.log(err);
                res.status(500).json({ error_msg: "Internal server error" });
                return;
              } else {
                if (address.affectedRows === 0) {
                  res.status(204).end();
                  return;
                } else {
                  res
                    .status(200)
                    .json({
                      success_msg: address.affectedRows + " record updated",
                    });
                  return;
                }
              }
            }
          );
        }
      }
    });
  }
);

//Endpoint 10: Post /staff
app.post("/staffs", (req, res) => {
  const {
    first_name,
    last_name,
    picture,
    email,
    store_id,
    username,
    password,
    address: {
      address_line1,
      address_line2,
      district,
      city_id,
      postal_code,
      phone,
    },
  } = req.body;

  let firstName = req.body.first_name || null;
  let lastName = req.body.last_name || null;
  let staffEmail = req.body.email || null;
  let storeID = req.body.store_id || null;
  let staffUsername = req.body.username || null;
  let staffPassword = req.body.password || null;

  let addressLine1 = req.body.address.address_line1 || null;
  let districtNum = req.body.address.district || null;
  let cityID = req.body.address.city_id || null;
  let postalCode = req.body.address.postal_code || null;
  let phoneNum = req.body.address.phone || null;

  if (
    firstName == null ||
    lastName == null ||
    staffEmail == null ||
    storeID == null ||
    staffUsername == null ||
    staffPassword == null ||
    addressLine1 == null ||
    districtNum == null ||
    cityID == null ||
    postalCode == null ||
    phoneNum == null
  ) {
    res.status(400).json({ error_msg: "missing data" });
    return;
  }

  AddressController.addAddress(
    { address_line1, address_line2, district, city_id, postal_code, phone },
    (err, address) => {
      if (err) {
        res.status(500).json({ error_msg: "Internal server error" });
        return;
      } else {
        const address_id = address.insertId;

        StaffController.addStaff(
          {
            first_name,
            last_name,
            address_id,
            picture,
            email,
            store_id,
            username,
            password,
          },
          (err, staff) => {
            if (err) {
              AddressController.deleteAddress({ address_id }, (err) => {
                if (err) {
                  console.log(err);
                  return;
                }
              });
              res.status(500).json({ error_msg: "Internal server error" });
              return;
            } else {
              res.status(201).json({ staff_id: staff.insertId + "" });
              return;
            }
          }
        );
      }
    }
  );
});

module.exports = app;
