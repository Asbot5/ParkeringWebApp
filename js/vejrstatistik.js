Vue.createApp({
    data() {
        return {
            tempData1: [],
            tempData2: [],
            regnData1: [],
            regnData2: [],
            vindData1: [],
            vindData2: [],
            selectDate: null,
            selectDate2: null,
            dayDate: null,
            beforeDate: null,
            monthDate: null,
            beforeMonth:null,
            selectArea1: null,
            selectArea2: null,
            statData1: [],
            statData2: [],
            statLength1: null,
            statLength2: null,
        }
    },
    
    async created() {
        try {
            
        } catch (ex) {
            alert(ex.message)
        }
    },
    methods: {
        async getTempData() {
            const current = new Date(this.selectDate);
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${this.selectDate1}`+"T00:00:00Z/"+`${this.selectDate1}`+"T23:59:59Z&"+"parameterId=temp_mean_past1h"
            const url2 = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${this.selectDate2}`+"T00:00:00Z/"+`${this.selectDate2}`+"T23:59:59Z&"+"parameterId=temp_mean_past1h"
            try {
                const response = await axios.get(url)
                this.tempData1 = await response.data
                const response2 = await axios.get(url2)
                this.tempData2 = await response2.data
                console.log(this.tempData1, this.tempData2)
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getRegnData() {
            const current = new Date();
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${this.selectDate1}`+"T00:00:00Z/"+`${this.selectDate1}`+"T23:59:59Z&"+"parameterId=precip_past1h"
            const url2 = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${this.selectDate2}`+"T00:00:00Z/"+`${this.selectDate2}`+"T23:59:59Z&"+"parameterId=precip_past1h"
            try {
                const response = await axios.get(url)
                this.regnData1 = await response.data
                const response2 = await axios.get(url2)
                this.regnData2 = await response2.data
                console.log(this.regnData1, this.regnData2)
            } catch (ex) {
                alert(ex.message)
            }
        },
        async getVindData() {
            var input = document.getElementById( 'id' ).value;
            var d = new Date( input );
                year = d.getFullYear();
                month = d.getMonth()+1;
                    if(month < 10){
                        month = 0+month
                    }
                day = d.getDate();
                    if (day <10){
                        day = "0"+day
                    }
            const url = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${year}-${month-1}-${day}`+"T00:00:00Z/"+`${this.selectDate1}`+"T23:59:59Z&"+"parameterId=wind_speed"
            const url2 = "https://dmigw.govcloud.dk/v2/metObs/collections/observation/items?api-key=9c03456a-00ce-48db-a13b-907255c2eb73&stationId=06184&" + `datetime=${year}-${month-1}-${day}`+"T00:00:00Z/"+`${this.selectDate2}`+"T23:59:59Z&"+"parameterId=wind_speed"
            try {
                const response = await axios.get(url)
                this.vindData1 = await response.data
                const response2 = await axios.get(url2)
                this.vindData2 = await response2.data
                console.log(this.vindData1, this.vindData2)
            } catch (ex) {
                alert(ex.message)
            }
        },
        //getStatistic() tager de 2 dato og områdeid input som brugeren giver, og viser derefter mængden af bilen og hvad regnmængden, temperaturen og vindhastigheden har været den dag.
        async getStatistik(){
            //Tager date og område input for den ene af datoerne der skal sammenlignes. Da Rest API vil have datoen i MM-dd-yyyy bliver dato input splittet op i dag, måned og år for at de kan manuelt sættes op, da browserne tager OS systemets tidszone og inputtet ikke kan ændres fra HTML siden.
            var input = document.getElementById( 'id' ).value;
            var d = new Date( input );
                year = d.getFullYear();
                month = d.getMonth()+1;
                    if(month < 10){
                        month = 0+month
                    }
                day = d.getDate();
                    if (day <10){
                        day = 0+day
                    }
                const url1 = "https://parkeringsdataapi.azurewebsites.net/Log/statistic/"+`${this.selectArea1}`+"/"+`${month}`+"-"+`${day}`+"-"+`${year}`

                var input = document.getElementById( 'id2' ).value;
                var d2 = new Date( input );
                    year = d2.getFullYear();
                    month = d2.getMonth()+1;
                        if(month < 10){
                            month = 0+month
                        }
                    day = d2.getDate();
                        if (day <10){
                            day = 0+day
                        }
                    const url2 = "https://parkeringsdataapi.azurewebsites.net/Log/statistic/"+`${this.selectArea2}`+"/"+`${month}`+"-"+`${day}`+"-"+`${year}`
            try {
                const response = await axios.get(url1)
                this.statData1 = await response.data
                const response2 = await axios.get(url2)
                this.statData2 = await response2.data
                this.statLength1 =  this.statData1.length;
                this.statLength2 =  this.statData2.length;
                console.log(this.statData1, this.statData2)
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")