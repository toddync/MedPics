/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yyx1hhaubmpad4l")

  collection.updateRule = "@request.auth.id = creator.id"
  collection.deleteRule = "@request.auth.id = creator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yyx1hhaubmpad4l")

  collection.updateRule = "@request.auth.creator.id = creator.id"
  collection.deleteRule = "@request.auth.creator.id = creator.id"

  return dao.saveCollection(collection)
})
