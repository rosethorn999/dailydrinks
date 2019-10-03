<template>
  <div class="hello">
    <div class="header-bar">
      <button @click="pushTempOrder" v-show="tempOrder.length===0">Create an order</button>
    </div>
    <div class="list">
      <div class="order" v-for="(item,index) in tempOrder" :key="item.id">
        <template v-if="item.state===1">
          <h1>SAVED!</h1>
        </template>
        <template v-else-if="item.state===2">
          <h1>DELETED!</h1>
        </template>
        <template v-else>
          <div class="form-group">
            <input type="text" v-model="item.name" placeholder="Name" />
          </div>
          <div class="form-group">
            <input type="number" v-model.number="item.price" placeholder="Price" />
          </div>
          <div class="form-group">
            <textarea rows="3" v-model="item.notes" placeholder="Notes"></textarea>
          </div>
          <div class="form-group">
            <button @click="cancelTempOrder(index)">Cancal</button>
            <button @click="createTempOrder(index)" :disabled="!couldSendOrder">Add</button>
          </div>
        </template>
      </div>
    </div>
    <div class="list">
      <div class="order" v-for="(item,index) in list" :key="item.id">
        <template v-if="item.state===1">
          <h1>SAVED!</h1>
        </template>
        <template v-else-if="item.state===2">
          <h1>DELETED!</h1>
        </template>
        <template v-else-if="item.state===3">
          <div class="form-group">
            <input
              type="text"
              :class="{'in-valid':!vaildName(item.name)}"
              v-model="item.name"
              placeholder="Name"
            />
          </div>
          <div class="form-group">
            <input
              type="number"
              :class="{'in-valid':!vaildPrice(item.price)}"
              v-model.number="item.price"
              placeholder="Price"
            />
          </div>
          <div class="form-group">
            <textarea rows="3" v-model="item.notes" placeholder="Notes"></textarea>
          </div>
          <div class="form-group">
            <!-- <button @click="cancelTempOrder(index)">Cancal</button> -->
            <button @click="updateOrderConfirm(index)">Save</button>
          </div>
        </template>
        <template v-else>
          <div class="title">{{ item.name }}</div>
          <div>
            <span>${{ item.price | commaFormat }}</span>
            - {{ item.notes }}
          </div>
          <div class="form-group">
            <button @click="updateOrder(index)">Update</button>
            <button @click="deleteOrder(index)">Delete</button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// state 0 normal 1 saved 2 deleted 3 updating
export default {
  name: "HelloWorld",
  data() {
    return {
      list: [
        {
          state: 0,
          id: "IWannaBeYourCoworker",
          name: "高山烏龍茶",
          price: 35,
          notes: "無糖少冰加寒天"
        }
      ],
      tempOrder: []
    };
  },
  computed: {
    couldSendOrder() {
      const pkg = this.tempOrder[0];
      return this.vaildOrder(pkg);
    }
  },
  filters: {
    commaFormat: function(value) {
      // 加上千分位符號
      return value
        .toString()
        .replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function(
          all,
          pre,
          groupOf3Digital
        ) {
          return pre + groupOf3Digital.replace(/\d{3}/g, ",$&");
        });
    }
  },
  methods: {
    createTempOrder(i) {
      this.tempOrder[i].id = this.getGuid();
      this.createOrder(this.tempOrder[i]);
      this.tempOrder.splice(i, 1);
    },
    cancelTempOrder(i) {
      this.tempOrder.splice(i, 1);
    },
    pushTempOrder() {
      let tempOrder = {
        state: 0,
        id: null,
        name: "",
        price: null,
        notes: ""
      };
      this.tempOrder.push(tempOrder);
    },
    createOrder(pkg) {
      pkg.state = 1;
      this.list.push(pkg);
      setTimeout(() => {
        const lastIndex = this.list.length - 1;
        this.list[lastIndex].state = 0;
      }, 1200);
    },
    deleteOrder(i) {
      this.list[i].state = 2;
      let id = this.list[i].id;
      setTimeout(() => {
        const deletingIndex = this.getIndxById(id);
        console.log(deletingIndex);
        this.list.splice(deletingIndex, 1);
      }, 1200);
    },
    updateOrderConfirm(i) {
      const pkg = this.list[i];
      if (this.vaildOrder(pkg)) {
        this.list[i].state = 0;
      }
    },
    updateOrder(i) {
      this.list[i].state = 3;
    },
    getGuid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    },
    getIndxById(id) {
      return this.list.findIndex(item => item.id === id);
    },
    vaildOrder(pkg) {
      const validName = this.vaildName(pkg.name);
      const validPrice = this.vaildPrice(pkg.price);
      return validName && validPrice;
    },
    vaildName(v) {
      return /.+/.exec(v.trim());
    },
    vaildPrice(v) {
      return /\d+/.exec(v) && v >= 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header-bar {
  margin: 5px;
}
h1 {
  text-align: center;
}
.list {
  opacity: 0.9;
  text-align: left;
  > div {
    line-height: 2rem;
  }
  .order {
    margin-bottom: 5px;
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    .title {
      font-size: 1.3rem;
    }
    &:hover {
      opacity: 1;
    }
  }
}
.form-group {
  width: 100%;
  margin-bottom: 5px;
  width: 100%;
  display: flex;
}
textarea,
input {
  min-height: 20px;
  padding: 2px;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #eee;
}
button {
  padding: 10px 15px;
  min-width: 50%;
  flex: 1;
  border: 1px solid #eee;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  &:disabled {
    cursor: not-allowed;
  }
}
.in-valid {
  border-color: red;
}
</style>
