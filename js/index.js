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
            specialParkings: [],
        }
    },
    async created() {
        try {
            const response = await axios.get(baseUrl)
            this.parkings = await response.data
            await this.getSpecialParkings()
            console.log(this.parkings, this.specialParkings)
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
        async getSpecialParkings(){
            const response1 = await axios.get("https://parkeringsdataapi.azurewebsites.net/parkingdatums/special")
            this.specialParkings = await response1.data
        }
    }
    
}).mount("#app")