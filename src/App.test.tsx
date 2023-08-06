import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { matrixSum } from './service/util/number-functions';

test ('sum of matrix', () => {
  expect(matrixSum([[1,2,3], [4,5,6]])).toBe(21)
})


test('')




