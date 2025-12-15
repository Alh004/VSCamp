const issuesUri = "http://localhost:5005/api/issue";

Vue.createApp({
    data() {
        return {
            issues: [],
            error: null
        };
    },
    methods: {
        getAllIssues() {
            axios.get(issuesUri)
                .then(res => this.issues = res.data)
                .catch(err => this.error = err.message);
        }
    }
}).mount("#app");
