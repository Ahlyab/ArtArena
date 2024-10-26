// function for getting the list of all the designs
exports.getDesigns = function (req, res) {
  Design.find({}, function (err, designs) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(designs);
  });
};

// function for creating a new Art
exports.createDesign = function (req, res) {
  const design = new Design(req.body);
  design.save(function (err, design) {
    if (err) {
      res.status(400).send(err);
    }
    res.status(201).json(design);
  });
};

// function for getting a single design
exports.getDesign = function (req, res) {
  Design.findById(req.params.id, function (err, design) {
    if (err) {
      res
        .status(400)
        .send("Design with the given ID is not found in the database");
    }
    res.status(200).json(design);
  });
};
