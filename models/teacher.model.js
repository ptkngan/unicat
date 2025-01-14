const db = require("../utils/db");
const TBL_COURSES = "course";
const TBL_FIELDS = "field";
const TBL_STUDENT_COURSES = "studentcourse";
const TBL_TEACHERS = "teacher";
const TBL_CATEGORIES = "category";
const TBL_ACCOUNTS = "account";

module.exports = {
  async single(id) {
    const rows = await db.load(
      `select * from ${TBL_TEACHERS} where TeachID = ${id}`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },

  async singleByAccID(id) {
    const rows = await db.load(
      `select * from ${TBL_TEACHERS} where AccID = ${id}`
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  },

  async singleWithDetails(id) {
    const rows = await db.load(
      ` select t.*, count( c1.CourID) as TeachCourses , sum(re.CourStudent1) as TeachStudents, 
                sum(re.CourRates1) as TeachRates, avg(re.CourPoint1) as TeachPoints
        from ${TBL_COURSES} c1 
        left join(
					          select sc1.CourID, count(sc1.CourID) as CourStudent1, 
					          count(case when sc1.Point!= 0 then 1 end) as CourRates1,
					          avg(case when sc1.Point!=0 then sc1.Point end) as CourPoint1
					          from ${TBL_STUDENT_COURSES} sc1
					          group by sc1.CourID
        ) as re on re.CourID = c1.CourID
        join ${TBL_TEACHERS} t on t.TeachID = c1.TeachID
        where t.TeachID = ${id}
        group by c1.TeachID`
    );

    if (rows.length === 0) return null;
    return rows[0];
  },
  all() {
    return db.load(
      `select t.*, ac.* from ${TBL_TEACHERS} t inner join ${TBL_ACCOUNTS} ac on ac.AccID = t.AccID`
    );
  },
  add(entity) {
    return db.add(entity, TBL_TEACHERS);
  },
  patch(entity) {
    const condition = { TeachID: entity.TeachID };
    delete entity.TeachID;
    return db.patch(entity, condition, TBL_TEACHERS);
  },
};
