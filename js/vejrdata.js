// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&datetime=2021-11-23T00:00:00Z/2021-11-24T00:00:00Z&parameterId=temp_mean_past1h"

Vue.createApp({
    data() {
        return {
            vejrDataer: [],
            regnData: [],
            vindData: [],
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
            //const response = await axios.get(baseUrl)
            await this.getTempData()
            await this.getRegnData()
            await this.getVindData()
            console.log(this.vejrDataer, this.regnData)
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
        async getTempData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${current.getFullYear()}`+"-"+`${current.getMonth()+1}`+"-"+`${current.getDate()-1}`+"T00:00:00Z/"+`${current.getFullYear()}`+"-"+`${current.getMonth()+1}`+"-"+`${current.getDate()}`+"T00:00:00Z&"+"parameterId=temp_mean_past1h"
            try {
                const response = await axios.get(url)
                this.vejrDataer = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getRegnData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${current.getFullYear()}`+"-"+`${current.getMonth()+1}`+"-"+`${current.getDate()-1}`+"T00:00:00Z/"+`${current.getFullYear()}`+"-"+`${current.getMonth()+1}`+"-"+`${current.getDate()}`+"T00:00:00Z&"+"parameterId=precip_past1h"
            try {
                const response = await axios.get(url)
                this.regnData = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getVindData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${current.getFullYear()}`+"-"+`${current.getMonth()+1}`+"-"+`${current.getDate()-1}`+"T00:00:00Z/"+`${current.getFullYear()}`+"-"+`${current.getMonth()+1}`+"-"+`${current.getDate()}`+"T00:00:00Z&"+"parameterId=wind_speed"
            try {
                const response = await axios.get(url)
                this.vindData = await response.data
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
