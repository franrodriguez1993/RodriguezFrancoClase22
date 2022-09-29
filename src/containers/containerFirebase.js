const admin = require("firebase-admin");
const serviceAccount = require("../ctr/entregafinalcoder-8e664-firebase-adminsdk-01rzf-d1e58a1e56.json");

if (process.env.STORAGE === "firebase") {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

class containerFirebase {
  constructor(collection) {
    this.db = admin.firestore();
    this.model = this.db.collection(collection);
  }

  //listar:
  async getAll() {
    try {
      const res = await this.model.get();
      let docs = res.docs;
      const list = docs.map((item) => ({ id: item.id, ...item.data() }));
      return list;
    } catch (e) {
      console.log(e);
    }
  }

  //crear:
  async save(object) {
    try {
      let doc = this.model.doc();
      const resCreate = await doc.create(object);
      return resCreate;
    } catch (error) {
      console.log(e);
    }
  }
}

module.exports = { containerFirebase };
