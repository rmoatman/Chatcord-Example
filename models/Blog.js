const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = require('../config/connection');

class Blog extends Model {

}



Blog.init(

  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },

    date: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    
    username_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:'user',
            key:'id',
        }
    },

  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);

module.exports = Blog;
