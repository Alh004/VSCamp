const apiBase = "http://localhost:5005";

Vue.createApp({
    data() {
        return {
            roomId: null,

            title: "",
            description: "",
            categoryId: "",
            email: "",

            imageUrl: "",       // Cloudinary URL
            successMessage: null
        };
    },

    mounted() {
        this.roomId = new URLSearchParams(window.location.search).get("room");

        if (!this.roomId) {
            alert("Room mangler i URL (?room=1)");
        }
    },

    methods: {
        // 🔹 Upload billede direkte til Cloudinary
        async uploadImage(e) {
            const file = e.target.files[0];
            if (!file) return;

            const fd = new FormData();
            fd.append("file", file);
            fd.append("upload_preset", "campfeed");

            try {
                const res = await fetch(
                    "https://api.cloudinary.com/v1_1/dzppdbkte/image/upload",
                    {
                        method: "POST",
                        body: fd
                    }
                );

                const data = await res.json();

                if (!data.secure_url) {
                    throw new Error("Upload fejlede");
                }

                this.imageUrl = data.secure_url; // 🔥 VIGTIG
            } catch (err) {
                console.error(err);
                alert("Billed-upload fejlede");
            }
        },

        // 🔹 Opret sag
        async submitReport() {
            if (!this.email.endsWith("@edu.zealand.dk")) {
                alert("Brug din skolemail (@edu.zealand.dk)");
                return;
            }

            if (!this.title || !this.description || !this.categoryId) {
                alert("Udfyld alle felter");
                return;
            }

            const payload = {
                email: this.email,
                title: this.title,
                description: this.description,
                roomId: Number(this.roomId),
                categoryId: Number(this.categoryId),
                imageUrl: this.imageUrl || null
            };

            try {
                const res = await fetch(`${apiBase}/api/report`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) throw new Error("API fejl");

                const data = await res.json();

                this.successMessage =
                    "Tak! Din indberetning er sendt. Sagsnummer: " + data.issueId;

                // reset
                this.title = "";
                this.description = "";
                this.categoryId = "";
                this.email = "";
                this.imageUrl = "";
            } catch (err) {
                console.error(err);
                alert("Kunne ikke oprette sag");
            }
        }
    }
}).mount("#app");
