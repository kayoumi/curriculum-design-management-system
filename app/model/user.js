'use strict'

module.exports = app => {
  const {
    INTEGER,
    DATE,
    STRING
  } = app.Sequelize
  const User = app.model.define(
    'User', {
      id: {
        type: STRING(12),
        primaryKey: true
      },
      username: {
        type: STRING(16),
        allowNull: false
      },
      password: {
        type: STRING(32),
        allowNull: false
      },
      role: {
        type: INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
      status: {
        type: INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
      created_at: DATE,
      updated_at: DATE
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'user'
    }

  )
  User.associate = function () {
    app.model.User.hasMany(app.model.UserInfo, {
      foreignKey: 'user_id',
      targetKey: 'id'
    });
  };
  return User
}