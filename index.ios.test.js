import renderer from 'react-test-renderer';
import React from 'react'
import IndexIos from './index.ios'
import Camera from 'react-native-camera';
jest.mock('react-native-camera', () => 'Camera');

test('test', () => {
  const tree = renderer.create(
    <IndexIos />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
