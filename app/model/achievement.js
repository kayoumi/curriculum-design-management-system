'use strict'

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE
  } = app.Sequelize
  const Achievement = app.model.define(
    'Achievement', {
      id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING(128),
        allowNull: false
      },
      user_id: {
        type: STRING(12),
        allowNull: false
      },
      group_id: {
        type: INTEGER(10),
        allowNull: false
      },
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
      tableName: 'achievement'
    }
  )
  // Achievement.associate = function () {
  //   app.model.Achievement.belongsTo(app.model.User, {
  //     foreignKey: 'user_id',
  //     targetKey: 'id'
  //   })
  //   app.model.Achievement.belongsTo(app.model.Group, {
  //     foreignKey: 'group_id',
  //     targetKey: 'id'
  //   })
  // }
  return Achievement
}