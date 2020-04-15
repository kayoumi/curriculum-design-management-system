'use strict'

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    TEXT
  } = app.Sequelize
  const UserInfo = app.model.define(
    'UserInfo', {
      id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: STRING(12),
        allowNull: false,
        references: {
          model: 'User'
        }
      },
      grade: {
        type: INTEGER(4),
        validate: {
          isNumeric: true,
          min: 0,
          max: 100
        }
      },
      class_id: {
        type: INTEGER(10),
        allowNull: false
      },
      phone: STRING(11),
      evaluation: TEXT,
      status: {
        type: INTEGER(1),
        defaultValue: 1,
        allowNull: false
      },
      created_at: DATE,
      updated_at: DATE
    }, {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
      tableName: 'userInfo'
    }
  )
  UserInfo.associate = function () {
    app.model.UserInfo.belongsTo(app.model.User, {
      foreignKey: 'user_id',
      targetKey: 'id'
    })
    app.model.UserInfo.hasMany(app.model.Class, {
      foreignKey: 'class_id',
      targetKey: 'id'
    })
  }
  return UserInfo
}