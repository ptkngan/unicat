const db = require("../utils/db");

const TBL_STUDENTS = "student";

module.exports = {
  async single(id) {
    const rows = await db.load(
      `select * from ${TBL_STUDENTS} where StdID = ${id}`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },

  async singleByAccID(id) {
    const rows = await db.load(
      `select * from ${TBL_STUDENTS} where AccID = ${id}`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },

  all() {
    return db.load(`select * from ${TBL_STUDENTS}`);
  },

  add(entity) {
    return db.add(entity, TBL_STUDENTS);
  },

  patch(entity) {
    const condition = { StdID: entity.StdID };
    if (entity.StdAvatar === null) {
      delete entity.StdAvatar;
    }
    delete entity.StdID;
    return db.patch(entity, condition, TBL_STUDENTS);
  },
};