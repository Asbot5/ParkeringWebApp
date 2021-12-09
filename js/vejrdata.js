// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl2 = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&datetime=2021-11-23T00:00:00Z/2021-11-24T00:00:00Z&parameterId=temp_mean_past1h"

Vue.createApp({
    data() {
        return {
            vejrDataer: [],
            regnData: null,
            vindData: [],
            specifikVejrDato: null,
            singleVejr: null,
            updateMessage: "",
            dayDate: null,
            beforeDate: null,
            monthDate: null,
            beforeMonth:null,
        }
    },
    async created() {
        try {
            //const response = await axios.get(baseUrl)
            await this.getDayDate()
            await this.getMonthDate()
            await this.getBeforeDate()
            await this.getTempData()
            await this.getRegnData()
            await this.getVindData()
            console.log(this.vejrDataer, this.regnData, this.vindData)
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
        //getAllVejrDataer() {
        //    this.helperGetAndShow(baseUrl2)
        //},
        calculateParkingSpots() {

        },
        async getTempData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${current.getFullYear()}`+"-"+`${this.monthDate-1}`+"-"+`${this.beforeDate}`+"T00:00:00Z/"+`${current.getFullYear()}`+"-"+`${this.monthDate}`+"-"+`${this.dayDate}`+"T00:00:00Z&"+"parameterId=temp_mean_past1h"
            try {
                const response = await axios.get(url)
                this.vejrDataer = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getRegnData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${current.getFullYear()}`+"-"+`${this.monthDate-1}`+"-"+`${this.beforeDate}`+"T00:00:00Z/"+`${current.getFullYear()}`+"-"+`${this.monthDate}`+"-"+`${this.dayDate}`+"T00:00:00Z&"+"parameterId=precip_past1h"
            try {
                const response = await axios.get(url)
                this.regnData = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getVindData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${current.getFullYear()}`+"-"+`${this.monthDate-1}`+"-"+`${this.beforeDate}`+"T00:00:00Z/"+`${current.getFullYear()}`+"-"+`${this.monthDate}`+"-"+`${this.dayDate}`+"T00:00:00Z&"+"parameterId=wind_speed"
            try {
                const response = await axios.get(url)
                this.vindData = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getDayDate() {
            const current = new Date();
            if(current.getDate()<10){
                this.dayDate = "0"+current.getDate()
            }
            else {
                this.dayDate = current.getDate()
              }
        },
        async getMonthDate() {
            const current = new Date();
            if((current.getMonth()+1)<10){
                this.monthDate = "0"+current.getMonth()+1
            }
            else {
                this.monthDate = current.getMonth()+1
              }
        },
        async getBeforeDate() {
            const current = new Date();
            if(current.getDate()<10){
                if(current.getDate()==1){
                    this.beforeMonth = current.getMonth()-1
                    this.beforeDate = "0"+current.getDate()
                    if(this.beforeMonth<10){
                        this.beforeMonth = "0"+(current.getMonth()-1)
                    }
                }
                else{
                    this.beforeMonth = current.getMonth()
                    this.beforeDate = "0"+(current.getDate()-1)
                }
            }
            else {
                this.beforeMonth = current.getMonth()
                this.beforeDate = current.getDate()
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
}).mount("#vejrApp")
