// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://parkeringsdataapi.azurewebsites.net/parkingdatums"

Vue.createApp({
    data() {
        return {
            parkings: [],
            parkingId: null,
            singleParking: null,
            addData: { title: "", price: 0 },
            addMessage: "",
            idToDelete: null,
            deleteMessage: "",
            idToUpdate: null,
            updateData: { title: "", price: 0 },
            updateMessage: ""
        }
    },
    async created() {
        try {
            const response = await axios.get(baseUrl)
            this.parkings = await response.data
            console.log(this.parkings)
        } catch (ex) {
            alert(ex.message)
        }
    },
    methods: {
        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url)
                this.parkings = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        getAllParkings() {
            this.helperGetAndShow(baseUrl)
        },
        calculateParkingSpots() {

        },
        async getParkingById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleParking = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addParking() {
            console.log(this.addData)
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllParkings()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteParkingById(idToDelete) {
            const url = baseUrl + "/" + idToDelete
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllParkings()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateParking() {
            console.log(this.updateData)
            const url = baseUrl + "/" + this.idToUpdate
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "response " + response.status + " " + response.statusText
                this.getAllParkings()
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")