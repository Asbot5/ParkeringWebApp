// use https (http secure).
// http (non secure) will make the app complain about mixed content when running the app from Azure
const baseUrl = "https://parkeringsdataapi.azurewebsites.net/parkingdatums"
  //seperate from vue

  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  var map;
  var directionsManager;

  function GetMap()
  {
      map = new Microsoft.Maps.Map('#myMap', {
          credentials: 'Au62PWvzz40HcbLEKA0BX1gFAkeppzTk6gfLQRKBU9z_-hQG7w-YEzjizb0d_cHX'
      });

      //Load the directions module.
      Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
          //Create an instance of the directions manager.
          directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

          //Specify where to display the route instructions.
          directionsManager.setRenderOptions({ itineraryContainer: '#directionsItinerary' });

          //Specify the where to display the input panel
          directionsManager.showInputPanel('directionsPanel');
      });
  }
  //seperate from vue
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