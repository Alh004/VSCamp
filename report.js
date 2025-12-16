const api = "http://localhost:5005/api";

Vue.createApp({
    data() {
        return {
            roomId: new URLSearchParams(window.location.search).get("room"),
            title: "",
            description: "",
            categoryId: "",
            email: "",
            uploadedImageUrl: null,
            success: false
        };
    },

    methods: {
        uploadImage(event) {
            const file = event.target.files[0];
            const fd = new FormData();
            fd.append("file", file);
            fd.append("upload_preset", "camp_preset");

            axios.post("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", fd)
                .then(r => {
                    this.uploadedImageUrl = r.data.secure_url;
                });
        },

        async submitIssue() {
            if (!this.email.endsWith("@edu.zealand.dk")) {
                alert("Brug venligst din skolemail.");
                return;
            }

            // 1) Check if user exists
            let userId;
            const res = await axios.post(`${api}/auth/check`, { email: this.email });
            userId = res.data.userId;

            // 2) Create issue
            await axios.post(`${api}/issue`, {
                title: this.title,
                description: this.description,
                roomId: Number(this.roomId),
                categoryId: Number(this.categoryId),
                reporterUserId: userId,
                imageUrl: this.uploadedImageUrl
            });

            this.success = true;
        }
    }
}).mount("#app");
