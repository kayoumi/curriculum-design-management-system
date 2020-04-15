'use strict'

module.exports = app => {
  const {
    INTEGER,
    STRING,
    TEXT,
    DATE
  } = app.Sequelize
  const Topic = app.model.define(
    'Topic', {
      id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING(128),
        allowNull: false
      },
      description: {
        type: TEXT
      },
      teacher_id: {
        type: STRING(12),
        allowNull: false
      },
      status: {
        type: INTEGER(1),
        default: 1,
        allowNull: false
      },
      created_at: DATE,
      updated_at: DATE
    }, {
      freezeTableName: true,
      timestamps: false,
      tableName: 'topic'
    }
  )
  Topic.associate = function () {
    app.model.Topic.belongsTo(app.model.User, {
      foreignKey: 'teacher_id',
      targetKey: 'id'
    })
  }
  return Topic
}