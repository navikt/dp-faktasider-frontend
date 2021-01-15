import { createSessionDb } from "../../lib/userDb";

const session = createSessionDb();

export default async (req, res) => {
  if (!(await session.isReady())) {
    res.statusCode = 503;
  } else {
    res.statusCode = 200;
  }
  res.end();
};
