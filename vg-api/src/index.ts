import { Elysia, t } from "elysia";
import { parkModel } from "./lib/models/park.model";
import swagger from "@elysiajs/swagger";
import { connectToDatabase } from "./lib/db/mongo_db";
import { ObjectId } from "mongodb";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(swagger())
  .use(
    cors({
      origin: "*",
    })
  )
  .decorate("dbService", await connectToDatabase())
  .group("/parks", (app) =>
    app
      .get("/", ({ dbService }) => {
        return dbService.collection("parks").find().toArray();
      })
      .get("/:id", ({ dbService, params }) => {
        return dbService
          .collection("parks")
          .findOne({ _id: new ObjectId(params.id) });
      })
      .get(
        "/query",
        async ({ query, dbService }) => {
          const { text } = query;

          return dbService
            .collection("parks")
            .find({
              name: { $regex: text, $options: "i" },
              description: { $regex: text, $options: "i" },
            })
            .toArray();
        },
        {
          query: t.Object({
            text: t.String(),
          }),
        }
      )
      .post(
        "/",
        ({ body, dbService }) => {
          const newPark = body;
          return dbService.collection("parks").insertOne(newPark);
        },
        {
          body: parkModel,
        }
      )
      .delete("/:id", ({ dbService, params }) => {
        return dbService
          .collection("parks")
          .deleteOne({ _id: new ObjectId(params.id) });
      })
      .put(
        "/:id",
        ({ dbService, params, body }) => {
          return dbService
            .collection("parks")
            .updateOne({ _id: new ObjectId(params.id) }, { $set: body });
        },
        {
          body: parkModel,
        }
      )
  )
  .get("/map", async ({ dbService }) => {
    return dbService
      .collection("parks")
      .find({}, { projection: { geojson: 1, _id: 0 } })
      .toArray()
      .then((parks) => {
        return parks.map((park) => park.geojson.features);
      })
      .then((features) => {
        return {
          type: "FeatureCollection",
          features: features.flat()
        };
      });
  })
  .listen(Bun.env.PORT || 3000);

console.log(`http://${app.server?.hostname}:${app.server?.port}`);
