
// {id:"",
// image:"",
// location: "",
// price: "",
// rating: "",
// stock: "",
// subject:"",
// _id: ""}
let app = new Vue({
    el: "#app",
    data: {

        product:null,
        showProduct: true,
        filterName: '',
        filter:"",
        sort: '',
        messageCheckout: "",
        order: {
            name: "",
            phone: ""

        },


        cart: []
    },components: {
        Keypress: () => import('vue-keypress')
      },
    methods: {
        //  This function decrease the value of stock by 1 every time user click Button


        productsFetch: async function (query) {  
           let response ;
            if(this.filter!="") {
                this.product=null;
           response =  await fetch("https://vueproject99.herokuapp.com/collection/products/"+this.filter);
           console.log("yoyoy")
            }
            else{
            response = await fetch("https://vueproject99.herokuapp.com/collection/products");
            }

            const data = await response.json();
            console.log(data);
            app.product = data;
        },
        addItem(itemId) {
            if (this.product[itemId].stock > 0) {
           
                this.stock = --this.product[itemId].stock;
                console.log(this.product[itemId].stock);
                this.cart.push(itemId);
            }
        },

      

        showCart() {
            this.showProduct = this.showProduct ? false : true

        },

        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        removeButton(index) {
            this.product[index].stock++;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] == index) {
                    this.cart.splice(i, 1);
                    break;
                }
            }


        },
        placeOrder: async function () {


            console.log("hdjdjdjdj")
            let orderCheck = []
            let updateStock=[]
            for (let i = 0; i < this.product.length; i++) {
                if (this.cartCount(this.product[i].id) != 0) {
                    orderCheck.push(Object.assign({}, this.order, {
                        productID: this.product[i]._id,
                        stock: this.cartCount(this.product[i].id)

                    }));
                    updateStock.push(Object.assign({}, this.product[i], {
                        stock: this.product[i].stock

                    }));
                   
                    console.log("hjueheufjeferf");

                }
            }
            console.log(orderCheck,updateStock,updateStock[0]._id);

            let data = await this.fetchFunction(orderCheck, "POST","https://vueproject99.herokuapp.com/collection/users");
            if(data=="OK"){
                for (let i = 0; i < updateStock.length; i++) {
                    let id=updateStock[i]._id;
                    delete updateStock[i]._id;
                    let check=await this.fetchFunction(updateStock[i], "PUT","https://vueproject99.herokuapp.com/collection/products/"+id);
                    console.log(check);
                }
            }

            console.log("yoyoy")
            console.log(data);


            this.messageCheckout = "Order Placed";

        },
        fetchFunction: async function (data, type,api) {
            const response = await fetch(api, {
                method: type, //JSON
                headers: {
                    'Content-Type': 'application/json'
                },
                body: (JSON.stringify(data))//Sending object for if statement
            });
            return await response.text();//Receiving response
        },

        filterClick() {


            this.sort = "asec"


        },
        defaultClick() {

            this.sort = ""

        },
        // filterSearch : async function (){
        //     // this.productsFetch().then()
        //     // this.product =[];
        //     const response = await fetch("/collection/products/"+this.filter);
        //     let data = await response.json();
        //     console.log(data);
        //     this.product = data;
           
        //     // this.product = data;
        // }

    },
    computed: {// This disables the button at 0 stock
        cartCheckDisable: function () {
            if (this.showProduct == false) {
                this.filter = "";// This will clear the search term once the user goes back to lesson page
                this.messageCheckout = "";
                return false;

            }
            else
                return this.cart.length === 0;
        },
        cartItemCount: function () {
            return this.cart.length || '';

        },



        getproduct() {

            var product = this.product;

            if (this.filterName == "subject") {

                if (this.sort == 'dsec') {

                    return product.sort((a, b) => (b.subject > a.subject ? 1 : -1));

                }
                else if (this.sort == 'asec') {

                    return product.sort((a, b) => (b.subject < a.subject ? 1 : -1));
                }
            }
            else if (this.filterName == "price") {
                if (this.sort == "dsec") {
                    return product.sort(function (a, b) {
                        return b.price - a.price
                    });

                }
                else if (this.sort == 'asec') {
                    return product.sort(function (a, b) {
                        return a.price - b.price
                    });

                }
            }
            //  let x = list.sort((a, b) => (a.name > b.name ? 1 : -1));
            else if (this.filterName == "location") {

                if (this.sort == 'dsec') {
                    return product.sort((a, b) => (b.location > a.location ? 1 : -1));

                }
                else if (this.sort == 'asec') {
                    return product.sort((a, b) => (b.location < a.location ? 1 : -1));


                }
            }
            else if (this.filterName == "stock") {
                if (this.sort == 'dsec') {
                    return product.sort(function (a, b) {
                        return b.stock - a.stock;
                    });

                }
                else if (this.sort == 'asec') {
                    return product.sort(function (a, b) {
                        return a.stock - b.stock;
                    });

                }
            }



            else {
                return product;
            }

        },
        submitForm() {

            if (this.order.name.match(/[A-Za-z]/) && this.order.phone.match(/[0-9]/) && this.order.phone.length >= 10) {

                return false;
            }
            else
                return true;

        },
    },
    mounted: function () {
        this.productsFetch();
    }
});

// var layout = {
//     title: "Plot Title",
//     xaxis: {
//       title: "x Axis",
//       titlefont: {
//         family: "Courier New, monospace",
//         size: 18,
//         color: "#7f7f7f"
//       }
//     },
//     yaxis: {
//       title: "y Axis",
//       titlefont: {
//         family: "Courier New, monospace",
//         size: 18,
//         color: "#7f7f7f"
//       }
//     }
//   };
//   var graphOptions = {layout: layout, filename: "styling-names", fileopt: "overwrite"};

// var plotDiv = document.getElementById('plot');
// var traces = [
// 	{x: [1,2,3], y: [2,8,7], stackgroup: 'one', groupnorm:'percent',name:"Positive"},
// 	{x: [7,2,3], y: [5,1,2], stackgroup: 'one',name:"Negative"},
// 	{x: [1,2,3], y: [3,6,1], stackgroup: 'one',name:"Neutralt"},
// ];
// traces[0].title="rr";
// Plotly.newPlot('myDiv', traces, {title: 'Gridcoin Sentiment Chart',xaxis:{title:"Time"},yaxis:{title:"Price"}});


