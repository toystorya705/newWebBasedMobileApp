<template>
<div>
    <div v-for="(product, index) in getproduct" :key="index" class="card" style="width: 18rem">
        <img class="card-img-top" v-bind:src="product.image" alt="Card image cap" />
        <div class="card-body">
            <p class="card-title">Subject: {{ product.subject }}</p>
            <!-- Get data from object using v-text-->
            <p>Location: {{ product.location }}</p>
            <!-- Get data from object-->
            <p>Price: {{ product.price }}</p>
            <!-- Get data from object-->
            <p>Stock: {{ product.stock }}</p>
            <!-- Get data from object-->
            <div>
                <!-- <span v-for='n in product.rating'>★</span>
                                        <span v-for='n in 5-product.rating'>☆</span> -->
            </div>

            <button type="button" v-on:click="addItem(product)" class="btn btn-primary" :disabled="product.stock == 0 ? true : false">
                Add To Cart
            </button>
            <span v-if="product.stock === 0">All out!</span>
            <span v-else-if="product.stock < 5">
                Only {{ product.stock }} left!
            </span>

            <span v-else>Buy now!</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "ProductList",
    props:["product","getproduct"],
    data() {
        return {
         
           
            filterName: "",
        };
    },
    methods: {
      
        addItem(product) {
            console.log(this.$parent.cartCount(4))
            if (product.stock > 0) {
                console.log(product);
                 
                this.$emit("addItem", product);
            }
        }
    },
   
   
};
</script>
