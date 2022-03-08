<template>
<div>
    <div class="checkoutBody">
        <!-- <button @click="showCart" :disabled="cartCheckDisable">{{cartItemCount}}
            <span class="glyphicon glyphicon-shopping-cart"></span>Cart
        </button> -->

        <div class="card" style="width: 18rem;" v-for="(product,index) in product" :key="index">
   
            <div v-if="cartCount(index)>0">
                <img class="card-img-top" v-bind:src="product.image" alt="Card image cap">
                <div class="card-body">
                    <p class="card-title">Subject: {{product.subject}}</p>
                    <!-- Get data from object using v-text-->
                    <p>Location: {{product.id}}</p><!-- Get data from object-->
                    <p>Price: {{product.price}}</p><!-- Get data from object-->
                    <p>Stock Added to Cart: {{cartCount(index)}}</p><!-- Get data from object-->
                    <div>
                        <!-- <span v-for='n in product.rating'>★</span>
                                        <span v-for='n in 5-product.rating'>☆</span> -->
                    </div>

                    <button class="btn btn-primary" type="button" v-on:click="removeButton(index)">Remove</button>
                </div>
            </div>
        </div>
        <h2>Checkout</h2>
        <p>
            <strong>Name:</strong>
            <!-- This input field is bound to 'firstName' in the 'order' object -->
            <input v-model="order.name" />
        </p>
        <p>
            <strong>Phone:</strong>
            <!-- This input field is bound to 'lastName' in the 'order' object -->
            <input  v-model="order.phone" />
        </p>

        <h2>Order Information</h2>
        <p>Name: {{order.name}}</p>
        <p>Phone: {{order.phone}}</p>

        <button @click="placeOrder" :disabled="submitForm">Place
            Order</button>
        <p> {{messageCheckout}}</p>

    </div>
</div>
</template>

<script>
export default {
    name: "formList",
    props: ["cart","product","cartCount"],
    data() {
        return {
            messageCheckout: "",
            order: {
                name: "",
                phone: ""
            },

        }
    },
    methods: {

        removeButton(index) {
            // this.product[index].stock++;
            // for (let i = 0; i < this.cart.length; i++) {
            //     if (this.cart[i] == index) {
            //         this.cart.splice(i, 1);
            //         break;
            //     }
            // }

               this.$emit("removeButton", index);

        },

        // cartCount(id) {
        //     this.$emit("cartCount", id);
        //     console.log("its working")
        //     // console.log(this.product)
        // },
        placeOrder: async function () {

            console.log(this.cartCount(1)+" ttttttt");
            let orderCheck = []
            let updateStock = []
            for (let i = 0; i < this.product.length; i++) {
                if (this.$parent.cartCount(this.product[i].id) != 0) {
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
            console.log(orderCheck, updateStock, updateStock[0]._id);

            let data = await this.fetchFunction(orderCheck, "POST", "https://vueproject99.herokuapp.com/collection/users");
            if (data == "OK") {
                for (let i = 0; i < updateStock.length; i++) {
                    let id = updateStock[i]._id;
                    delete updateStock[i]._id;
                    let check = await this.fetchFunction(updateStock[i], "PUT", "https://vueproject99.herokuapp.com/collection/products/" + id);
                    console.log(check);
                }
            }

            console.log("yoyoy")
            console.log(data);

            this.messageCheckout = "Order Placed";

        },
        fetchFunction: async function (data, type, api) {
            const response = await fetch(api, {
                method: type, //JSON
                headers: {
                    'Content-Type': 'application/json'
                },
                body: (JSON.stringify(data)) //Sending object for if statement
            });
            return await response.text(); //Receiving response
        },
        
    },
    computed:{
        submitForm() {

            if (this.order.name.match(/[A-Za-z]/) && this.order.phone.match(/[0-9]/) && this.order.phone.length >= 10) {

                return false;
            } else
                return true;

        },
    }
}
</script>
