// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&datetime=2021-11-23T00:00:00Z/2021-11-24T00:00:00Z&parameterId=temp_mean_past1h"

Vue.createApp({
    data() {
        return {
            vejrDataer: [],
            specifikVejrDato: null,
            singleVejr: null,
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
            this.vejrDataer = await response.data
            console.log(this.vejrDataer)
        } catch (ex) {
            alert(ex.message)
        }
    },
    methods: {
        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url)
                this.vejrDataer = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        getAllVejrDataer() {
            this.helperGetAndShow(baseUrl)
        },
        calculateParkingSpots() {

        },
        async getVejrByDato(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleVejr = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async addVejr() {
            console.log(this.addData)
            try {
                response = await axios.post(baseUrl, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllVejrDater()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteVejrByDato(idToDelete) {
            const url = baseUrl + "/" + idToDelete
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllVejrDataer()
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
                this.getAllVejrDataer()
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")
