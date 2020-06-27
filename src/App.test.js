import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {Login} from './components/Login';
/*test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/
import { shallow, mount } from 'enzyme';
describe('Test case for testing Password',() =>{
test('Valid password',() =>{
    const wrapper=shallow(<Login/>)
    expect(wrapper.instance().Password_verification('jaimatadi@123')).toBe(true);

})
it('Invalid password length less than 8',() =>{
    const wrapper=shallow(<Login/>)
    expect(wrapper.instance().Password_verification('AbcA12')).toBe(false);

})
it('Invalid password with only numericals' , () =>{
    const wrapper = shallow(<Login/>)
    expect(wrapper.instance().Password_verification(201701085)).toBe(false);
})
it('Invalid password with empty string',() =>{
    const wrapper=mount(<Login/>)
    expect(wrapper.instance().Password_verification('')).toBe(false);

})
});
