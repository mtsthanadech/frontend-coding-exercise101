import { expect } from 'chai';
import Countries from '@/views/Countries';
import { shallowMount } from '@vue/test-utils';

describe('Countries', () => {
  it('sets the correct default data', () => {
    expect(typeof Countries.data).to.equal('function');
    const defaultData = Countries.data();
    expect(defaultData.allCountries).to.equal([]);
    expect(defaultData.countryFields).to.equal([]);
  });
  it('has a mounted hook', () => {
    expect(typeof Countries.mounted).to.equal('function');
  });
});
