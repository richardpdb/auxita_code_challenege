import App from '@/App.vue';
import { shallowMount, createLocalVue } from "@vue/test-utils";
//import { mount } from "@vue/test-utils";
//import Swal from 'sweetalert2';


describe('Disease Classifier App unit tests: ', () => {
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
  });
    
  test("When the app should exist", () => {
      const wrapper = shallowMount(App, {localVue});

      //Then the instance should exist.
      expect(wrapper.isVisible()).toBe(true);
  });

  test("Given when the user wants to calculate Hypertension: Stage 3", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        sysBP: 185,
        diaBP: 125,
        dateHypertension: '04/12/2021',
      }
    });

    wrapper.find('hypertension_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "calculateHypertension");

    //Then the calculateHypertension function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given when the user wants to calculate Hypertension: Stage 2", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        sysBP: 170,
        diaBP: 105,
        dateHypertension: '04/12/2021',
      }
    });

    wrapper.find('hypertension_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "calculateHypertension");

    //Then the calculateHypertension function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given when the user wants to calculate Hypertension: Stage 1", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        sysBP: 150,
        diaBP: 95,
        dateHypertension: '04/12/2021',
      }
    });

    wrapper.find('hypertension_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "calculateHypertension");

    //Then the calculateHypertension function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given the user wants to calculate Hypertension with no data", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        sysBP: 0,
        diaBP: 0,
        dateHypertension: '',
      }
    });

    wrapper.find('hypertension_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "calculateHypertension");

    //Then the calculateHypertension function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given the user wants to calculate Kidney Disease, Classification: Normal", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        eGRF: 90,
        dateKidney: '04/12/2021',
      }
    });

    wrapper.find('kidney_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "evaluateKidney");
      

    //Then the evaluateKidney function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given the user wants to calculate Kidney Disease, Classification: Mildly Decreased", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        eGRF: 70,
        dateKidney: '04/12/2021',
      }
    });

    wrapper.find('kidney_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "evaluateKidney");
      

    //Then the evaluateKidney function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given the user wants to calculate Kidney Disease, Classification: Mild to moderate", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        eGRF: 50,
        dateKidney: '04/12/2021',
      }
    });

    wrapper.find('kidney_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "evaluateKidney");
      

    //Then the evaluateKidney function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given the user wants to calculate Kidney Disease, Classification: Moderate to Severe", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        eGRF: 35,
        dateKidney: '04/12/2021',
      }
    });

    wrapper.find('kidney_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "evaluateKidney");
      

    //Then the evaluateKidney function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given the user wants to calculate Kidney Disease, Classification: Severely Decreased", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        eGRF: 20,
        dateKidney: '04/12/2021',
      }
    });

    wrapper.find('kidney_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "evaluateKidney");
      

    //Then the evaluateKidney function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given the user wants to calculate Kidney Disease, Classification: Kidney Failure", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        eGRF: 10,
        dateKidney: '04/12/2021',
      }
    });

    wrapper.find('kidney_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "evaluateKidney");
      

    //Then the evaluateKidney function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Given the user wants to calculate Kidney Disease with no data", () => {
    const wrapper = shallowMount(App, {
      localVue,

      propsData: {
        eGRF: 10,
        dateKidney: '',
      }
    });

    wrapper.find('kidney_btn').trigger('click');

    const spy = jest.spyOn(wrapper.vm, "evaluateKidney");

    //Then the evaluateKidney function should been called.
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});