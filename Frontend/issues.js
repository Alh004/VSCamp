const issuesUri = "http://localhost:5005/api/issues";

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
                .then(response => {
                    this.issues = response.data;
                })
                .catch(err => {
                    this.error = err.message;
                });
        }
    }
}).mount("#app");
