const api = "http://localhost:5005";

Vue.createApp({
  data() {
    return {
      issues: []
    };
  },

  async mounted() {
    const r = await fetch(`${api}/api/issue`);
    const allIssues = await r.json();

    // 🔽 FILTRERING: KUN UDSTYR
    this.issues = allIssues.filter(i => i.categoryId === 2);
  }
}).mount("#app");