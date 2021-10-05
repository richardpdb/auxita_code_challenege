import {mount} from '@vue/test-utils';
import App from '@/src/App.vue';

describe('App unit tests: ', () => {

    test('Is a vue instance', () => {
        const wrapper = mount (App, {
            propsData: {
                app: {
                    name: "app1",
                    completed: false,
                }
            }
        });
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
});