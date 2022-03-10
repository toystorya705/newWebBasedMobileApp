<template>

<div id="app">

    <div class="navBar">

    <input class="searcBar" placeholder="Search Lesson" icon="search" @keyup="productsFetch" v-model="filter">
    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
    </div>
    <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span>

</div>
    <p>
        <input v-on:click="defaultClick" type="radio" id="default" value="default" v-model="filterName">
        <label for="default">Default</label>
        <input v-on:click="filterClick" type="radio" id="price" value="price" v-model="filterName">
        <label for="price">Price</label>
        <input v-on:click="filterClick" type="radio" id="location" value="location" v-model="filterName">
        <label for="location">location</label>
        <input v-on:click="filterClick" type="radio" id="stock" value="stock" v-model="filterName">
        <label for="stock">Stock</label>
        <input v-on:click="filterClick" type="radio" id="subject" value="subject" v-model="filterName">
        <label for="subject">Subject</label>
    </p>

    <p><input type="radio" id="asec" value="asec" v-model="sort">
        <label for="asec">Aescending</label>
        <input type="radio" id="dsec" value="dsec" v-model="sort">
        <label for="dsec">Descending</label>
    </p>
    <button @click="showCart" :disabled="cartCheckDisable">{{cartItemCount}}
        <span class="glyphicon glyphicon-shopping-cart"></span>Cart
    </button>
    <component :cart="cart" @removeButton="removeButton" :cartCount="cartCount" :getproduct=getproduct :is=showProduct :product="product" @addItem="addItem"></component>
    <!-- <form-list :cart="cart" @cartCount="cartCount"></form-list> -->
</div>
</template>

<script>
import productsListVue from './components/productsList.vue';
// import ProductList from "./components/productsList.vue";
import formList from "./components/form.vue";

export default {
    name: "App",
    components: {
        "products-list": productsListVue,
        "form-list": formList
    },
    data() {
        return {
            sitename: "Book Store",
            cart: [],
            showProduct: productsListVue,
            product: [{}],
            filter: "",
            filterName: '',
            sort: ''

        };
    },
    methods: {
        async productsFetch() {
            let response;
            if (this.filter != "") {
                this.product = null;
                response = await fetch(
                    "https://vueproject99.herokuapp.com/collection/products/" +
                    this.filter
                );
                console.log("yoyoy");
            } else {
                response = await fetch(
                    "https://vueproject99.herokuapp.com/collection/products"
                );
            }

            const data = await response.json();

            this.product = data;
            console.log(this.product);
        },

        addItem(product) {

            // console.log(productsListVue.data)

            //  --this.productsListVue.product.stock;
            //   console.log(product.stock);
            --this.product[product.id].stock;
            this.cart.push(product.id);
            console.log(this.cart)

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
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }
            return count;
        },
        showCart() {
            this.showProduct = this.showProduct == productsListVue ? formList : productsListVue

        },
        filterClick() {

            this.sort = "asec"

        },
        defaultClick() {

            this.sort = ""

        },
       
    },
    computed: {

        cartCheckDisable: function () {
            if (this.showProduct == formList) {
                // this.filter = "";// This will clear the search term once the user goes back to lesson page
                // this.messageCheckout = "";
                return false;

            } else
                return this.cart.length === 0;
        },
        cartItemCount: function () {
            return this.cart.length || '';

        },
        getproduct() {
            var product = this.product;
            console.log("33")
            if (this.filterName == "subject") {
                if (this.sort == "dsec") {
                    return product.sort((a, b) => (b.subject > a.subject ? 1 : -1));
                } else if (this.sort == "asec") {
                    return product.sort((a, b) => (b.subject < a.subject ? 1 : -1));
                }
            } else if (this.filterName == "price") {
                if (this.sort == "dsec") {
                    return product.sort(function (a, b) {
                        return b.price - a.price;
                    });
                } else if (this.sort == "asec") {
                    return product.sort(function (a, b) {
                        return a.price - b.price;
                    });
                }
            }
            //  let x = list.sort((a, b) => (a.name > b.name ? 1 : -1));
            else if (this.filterName == "location") {
                if (this.sort == "dsec") {
                    return product.sort((a, b) => (b.location > a.location ? 1 : -1));
                } else if (this.sort == "asec") {
                    return product.sort((a, b) => (b.location < a.location ? 1 : -1));
                }
            } else if (this.filterName == "stock") {
                if (this.sort == "dsec") {
                    return product.sort(function (a, b) {
                        return b.stock - a.stock;
                    });
                } else if (this.sort == "asec") {
                    return product.sort(function (a, b) {
                        return a.stock - b.stock;
                    });
                }
            } else {
                return product;
            }
            return product;
        },
    },
    created() {
        this.productsFetch();
    },
    mounted: function () {
        this.productsFetch();
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

#body {
    background-color: rgb(255, 255, 255);

    font-family: verdana;

}

#app {

    padding: 15px;

}

#app img {
    width: 200%;
}

#app h1 {
    color: red;
}

#app button {
    margin: 10px;
    margin-left: 20px;
    padding: 10px;
    width: 80%;
}

#app > div.navBar {
    background-color: greenyellow;
    margin-top: -16px;
    width: 1000px;
    height: 150px;
    margin-left: -20px;
}


.searcBar {
    display: flex;
    justify-content: center;
    align-items: center;
    /*margin-top: 20px;*/
    transform: translate(20%, 30%);
    height: 90px;
    width: 700px;
    font-size: large;

}

.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: -100px;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}

.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}

#main {
    transition: margin-left .5s;
    padding: 16px;
}

@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }

    .sidenav a {
        font-size: 18px;
    }
}

/* #app>div.navBar>span {
    map
} */
</style>
