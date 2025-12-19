const apiBase = "http://localhost:5005";

Vue.createApp({
    data() {
        return {
            issues: []
        };
    },

    mounted() {
        this.fetchIssues();
    },

    methods: {
        async fetchIssues() {
            try {
                const res = await fetch(`${apiBase}/api/issue`);
                this.issues = await res.json();
            } catch (err) {
                console.error(err);
                alert("Kunne ikke hente sager");
            }
        },

        formatDate(dateStr) {
            if (!dateStr) return "";
            return new Date(dateStr).toLocaleString("da-DK");
        }
    }
}).mount("#app");
