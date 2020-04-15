'use strict'

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE
  } = app.Sequelize
  const Group = app.model.define(
    'Group', {
      id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING(128),
        allowNUll: false
      },
      class_id: {
        type: INTEGER(10),
        allowNull: false
      },
      leader_id: STRING(12),
      topic_id: INTEGER(10),
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
      tableName: 'group'
    }
  )
  Group.associate = function () {
    app.model.Group.hasOne(app.model.User, {
      foreignKey: 'id',
      targetKey: 'leader_id'
    })
    app.model.Group.hasOne(app.model.Topic, {
      foreignKey: 'topic_id',
      targetKey: 'id'
    })
    app.model.Group.belongsTo(app.model.Class, {
      foreignKey: 'class_id',
      targetKey: 'id'
    })
  }
  return Group
}