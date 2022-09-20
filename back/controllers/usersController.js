module.exports = {
  getUsers: (req, res) => {
    return res
      .status(200)
      .json([
        { name: "mohsin" },
        { name: "Imran" },
        { name: "azim" },
        { name: "salman" },
      ]);
  },
};
