module.exports = (sequelize, type) => {
  return sequelize.define("tutorials", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: type.STRING,
      allowNull: false
    },
    tags: {
      type: type.STRING,
      allowNull: false
    },
  });
};