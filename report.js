const apiBase = "http://localhost:5005";

Vue.createApp({
    data() {
        return {
            roomId: null,
            categories: [],

            title: "",
            description: "",
            categoryId: "",
            email: "",
            imageUrl: "",

            successMessage: null
        };
    },

    mounted() {
        this.roomId = new URLSearchParams(window.location.search).get("room");

        if (!this.roomId) {
            alert("Room mangler i URL (?room=1)");
            return;
        }

        this.fetchCategories();
    },

    methods: {
        async fetchCategories() {
            try {
                const res = await axios.get(`${apiBase}/api/category`);
                this.categories = res.data;
            } catch (err) {
                alert("Kunne ikke hente kategorier");
            }
        },

        async uploadImage(e) {
            const file = e.target.files[0];
            if (!file) return;

            const fd = new FormData();
            fd.append("file", file);
            fd.append("upload_preset", "campfeed");

            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dkopspgw3/image/upload",
                fd
            );

            this.imageUrl = res.data.secure_url;
        },

        async submitReport() {
            if (!this.email.endsWith("@edu.zealand.dk")) {
                alert("Brug din skolemail");
                return;
            }

            if (!this.categoryId) {
                alert("Vælg en kategori");
                return;
            }

            const payload = {
                email: this.email,
                title: this.title,
                description: this.description,
                roomId: Number(this.roomId),
                categoryId: Number(this.categoryId),
                imageUrl: this.imageUrl
            };

            try {
                const res = await axios.post(`${apiBase}/api/report`, payload);

                this.successMessage =
                    "Tak! Din indberetning er sendt. Sagsnummer: " + res.data.issueId;

                // reset
                this.title = "";
                this.description = "";
                this.categoryId = "";
                this.email = "";
                this.imageUrl = "";

            } catch (err) {
                alert("Kunne ikke oprette sag");
            }
        }
    }
}).mount("#app");
