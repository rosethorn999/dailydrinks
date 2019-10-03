import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("Order item should be empty", () => {
    const wrapper = shallowMount(HelloWorld, {
      data() {
        return {
          list: [],
          tempOrder: []
        };
      }
    });
    expect(wrapper.contains("div.order")).toBe(false);
  });
  it("Create order with negative price", () => {
    const wrapper = shallowMount(HelloWorld, {
      data() {
        return {
          list: [],
          tempOrder: [
            {
              state: 0,
              id: "wrong",
              name: "高山烏龍茶",
              price: -1,
              notes: "無糖少冰加寒天"
            }
          ]
        };
      }
    });
    expect(wrapper.contains("button:disabled")).toBe(true);
  });
  it("Order can be update and delete", () => {
    const wrapper = shallowMount(HelloWorld, {
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
      }
    });
    expect(wrapper.findAll("button").length).toEqual(3);
  });
});
