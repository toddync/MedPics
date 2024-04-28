/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yyx1hhaubmpad4l")

  collection.name = "quizzes"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yyx1hhaubmpad4l")

  collection.name = "quizes"

  return dao.saveCollection(collection)
})
