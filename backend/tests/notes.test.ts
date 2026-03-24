import { before, after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";

import app from "../src/app";
import Note from "../src/models/note";

let mongo: MongoMemoryServer;

before(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

after(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

beforeEach(async () => {
  await Note.deleteMany({});
});

test("GET /api/notes returns empty array by default", async () => {
  const res = await request(app).get("/api/notes");

  assert.equal(res.status, 200);
  assert.equal(res.body.success, true);
  assert.deepEqual(res.body.data.notes, []);
});

test("POST /api/notes creates a note", async () => {
  const payload = {
    date: "2026-03-23",
    content: "Test note",
    tags: [{ key: "t1", label: "tag" }],
  };

  const res = await request(app).post("/api/notes").send(payload);

  assert.equal(res.status, 201);
  assert.equal(res.body.success, true);
  assert.equal(res.body.data.note.content, payload.content);
});

test("POST /api/notes rejects invalid body", async () => {
  const res = await request(app).post("/api/notes").send({});

  assert.equal(res.status, 400);
  assert.equal(res.body.success, false);
  assert.ok(typeof res.body.message === "string");
});

test("DELETE /api/notes/:id returns 404 for unknown id", async () => {
  const id = new mongoose.Types.ObjectId().toString();
  const res = await request(app).delete(`/api/notes/${id}`);

  assert.equal(res.status, 404);
  assert.equal(res.body.success, false);
});
