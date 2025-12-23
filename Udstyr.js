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

    // 🔽 Kun Udstyr (CategoryId = 2)
    this.issues = allIssues.filter(i => Number(i.categoryId) === 2); 
    
    console.log(this.issues);

    
  }
}).mount("#app");