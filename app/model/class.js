'use strict'

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE
  } = app.Sequelize
  const Class = app.model.define(
    'Class', {
      id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING(128),
        allowNull: false
      },
      teacher_id: {
        type: STRING(12),
        allowNull: false
      },
      status: {
        type: INTEGER(1),
        allowNull: false,
        defaultValue: 1
      },
      created_at: DATE,
      Updated_at: DATE
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'class'
    }
  )
  Class.associate = function () {
    app.model.Class.belongsTo(app.model.User, {
      foreignKey: 'teacher_id',
      targetKey: 'id'
    })
    app.model.Class.hasMany(app.model.Group, {
      foreignKey: 'id'
    })
  }
  return Class
}