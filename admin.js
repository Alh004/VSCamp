const api = "http://localhost:5005";

Vue.createApp({
  data() {
    return {
      issues: []
    };
  },

  mounted() {
    this.load();
  },

  methods: {
    async load() {
      const r = await fetch(`${api}/api/issue`);
      this.issues = await r.json();
    },

    async save(issue) {
      await axios.put(`${api}/api/issue/${issue.idissue}`, {
        status: issue.status,
        severity: issue.severity,
        categoryId: issue.categoryId
      });

      alert("Gemt i databasen");

      this.load();
    }
  }
}).mount("#app");
