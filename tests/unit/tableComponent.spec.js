import { expect } from 'chai';
import tableComponent from '@/components/tableComponent.vue';
import { shallowMount } from '@vue/test-utils';

const items = [
  { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
  { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
  { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
  { age: 38, first_name: 'Jami', last_name: 'Carney' },
];

const fields = [
  'age',
  'first_name',
  'last_name',
];

describe('tableComponent', () => {
  it('renders props.data when passed', () => {
    const wrapper = shallowMount(tableComponent, {
      propsData: {
        data: items,
        fields,
        perPage: 5,
      },
    });
    expect(wrapper.props().data).to.equal(items);
    expect(wrapper.props().fields).to.equal(fields);
    expect(wrapper.props().perPage).to.equal(5);
  });
  it('sets the correct default data', () => {
    expect(typeof tableComponent.data).to.equal('function');
    const defaultData = tableComponent.data();
    expect(defaultData.currentPage).to.equal(1);
    expect(defaultData.totalRows).to.equal(1);
    expect(defaultData.filter).to.equal('');
  });
});
