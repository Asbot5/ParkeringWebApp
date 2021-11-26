// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&datetime=2021-11-23T00:00:00Z/2021-11-24T00:00:00Z&parameterId=temp_mean_past1h"
class vejrData{
    constructor (regnData,tempData,vindData){
        this.regnData =regnData
        this.tempData =tempData
        this.vindData =vindData
    }
}
Vue.createApp({
    data() {
        return {
            vejrData: null,
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
            this.vejrData = new vejrData(null, null, null)
            await this.getRegnData()
            await this.getTempData()
            //await this.getVindData()
            console.log(this.vejrData)
        } catch (ex) {
            alert(ex.message)
        }
    },
    methods: {
        
        async getRegnData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${current.getFullYear()}`+"-"+`${current.getMonth()}`+"-"+`${current.getDate()-1}`+"T00:00:00Z/"+`${current.getFullYear()}`+"-"+`${current.getMonth()}`+"-"+`${current.getDate()}`+"T00:00:00Z&"+"parameterId=precip_past1h"
            try {
                const response = await axios.get(url)
                regnDataer = await response.data
                this.vejrData.regnData = regnDataer.features[0]
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getTempData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${current.getFullYear()}`+"-"+`${current.getMonth()}`+"-"+`${current.getDate()-1}`+"T00:00:00Z/"+`${current.getFullYear()}`+"-"+`${current.getMonth()}`+"-"+`${current.getDate()}`+"T00:00:00Z&"+"parameterId=temp_mean_past1h"
            try {
                const response = await axios.get(url)
                tempDataer = await response.data
                this.vejrData.tempData = tempDataer.features[0]
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getVindData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${current.getFullYear()}`+"-"+`${current.getMonth()}`+"-"+`${current.getDate()-1}`+"T00:00:00Z/"+`${current.getFullYear()}`+"-"+`${current.getMonth()}`+"-"+`${current.getDate()}`+"T00:00:00Z&"+"parameterId=wind_speed"
            try {
                const response = await axios.get(url)
                vindDataer = await response.data
                this.vejrData.vindData = vindDataer.features[0].properties.value
            } catch (ex) {
                alert(ex.message)
            }
        },}
}).mount("#app")
